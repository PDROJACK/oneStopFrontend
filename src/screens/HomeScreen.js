import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  PermissionsAndroid,
  TextInput,
  Platform,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { ListComponent } from "../components/ListComponent";
import MapComponent from "../components/MapComponent";
import * as Location from "expo-location";
// import MapboxAutocomplete from 'react-mapbox-autocomplete';
import MapBox from "../api/MapBox";
import Autocomplete from "react-native-autocomplete-input";
import { render } from "react-dom";
import AsyncStorage from "@react-native-community/async-storage";

const data = [
  {
    location1: "Saket",
    location2: "Delhi",
    id: 1,
  },
  {
    location1: "Noida Sector-130",
    location2: "Uttar Pradesh",
    id: 2,
  }
];

export default function HomeScreen({ navigation }) {

  const [whereTo, setWhereTo] = useState();
  const [location, setLocation] = useState(null);
  const [query, setQuery] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [loading, setLoading] = useState();
  const [searchLocations, setLocations] = useState([]);
  const [hasUserPermission, setUserPermission] = useState();
  const [selectedValue, setSelectedValue] = useState({});
  
  const findLocations = async (query) => {
    // Find the location of typed string
    const res = await MapBox.get(`/${query}.json`, {
      params: {
        autocomplete: "true",
        country: "IN",
      },
    });
    setLocations(res.data.features);
  };

  hasLocationPermission = async () => {
    if (Platform.OS === "android" && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        "Location permission denied by user.",
        ToastAndroid.LONG
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        "Location permission revoked by user.",
        ToastAndroid.LONG
      );
    }

    return false;
  };

  useEffect(() => {
    async function fetchLocation(){

        // GETTING USER LOCATIONS
        let { status } = await Location.requestPermissionsAsync();
        
        if(status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          // return;
          console.log("error")
        }
    
        let res = await Location.getCurrentPositionAsync({});

        let src = await MapBox.get(`/${res.coords.longitude},${res.coords.latitude}.json`, {
          params: {
            autocomplete: "true",
            country: "IN",
          },
        });

        setLocation({
          lat: res.coords.latitude,
          lng: res.coords.longitude,
          city: "delhi",
          place_name: src.data.features[1].place_name
        });
    }

    fetchLocation();

  },[]);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const gotoSearch = (item) => {
    setQuery(item.place_name);
    setLocations([]);
    navigation.navigate("Search", {
      source: location,
      destination: item,
    });
  };

  const MainMapScreen = () => {
    return (
      <>
        {/* Map on Home screen */}
        <View style={styles.map}>
          <MapComponent
            location={{
              coords: { latitude: 28.6924794, longitude: 77.3420494 },
            }}
          />
        </View>

        {/* Bottom menu to search for location */}
        <View style={styles.bottomMenu}>
          {/* The search bar on map/home screen */}
          <View style={styles.searchBar}>
            <TouchableOpacity style={styles.hamburgerMenu} onPress={openDrawer}>
              <Ionicons name="menu-sharp" size={32} color="black" />
            </TouchableOpacity>
            <View style={styles.aContainer}>
              <Autocomplete
                data={searchLocations}
                defaultValue={query}
                value={query}
                onChangeText={(text) => findLocations(text)}
                // onSubmitEditing={findLocations}
                renderItem={({ item, i }) => (
                  <TouchableOpacity onPress={() => gotoSearch(item)}>
                    <Text>{item.place_name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          {/* Render a list here of recent places  */}
          <ListComponent data={data} />
        </View>
      </>
    );
  };

  const GetLocationScreen = () => {
    return (
      <View>
        <Text>Get User Location</Text>
        <TouchableOpacity>
          <Text>GET LOCATION</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      {/* Map on Home screen */}
      <View style={styles.map}>
        {
          location ? <MapComponent
            location={{
              coords: { latitude: location.lat, longitude: location.lng },
            }}
          /> : null
        }
      </View>

      {/* Bottom menu to search for location */}
      <View style={styles.bottomMenu}>

        {/* The search bar on map/home screen */}
        <View style={styles.searchBar}>

          {/* Show drawer */}
          <TouchableOpacity style={styles.hamburgerMenu} onPress={openDrawer}>
            <Ionicons name="menu-sharp" size={26} color="grey" />
          </TouchableOpacity>

          {/* Search Bar */}
          <View style={styles.aContainer}>
            <Autocomplete
              data={searchLocations}
              inputContainerStyle={{
                borderWidth: 0,
                borderRadius: 25,
                width: "90%",
              }}
              listStyle={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderBottomRightRadius: 6,
                borderBottomLeftRadius: 6,
              }}
              listContainerStyle={styles.listContainer}
              defaultValue={query}
              value={query}
              
              placeholder={"Where to ?"}
              onChangeText={(text) => findLocations(text)}
              // onSubmitEditing={findLocations}
              renderItem={({ item, i }) => (
                <TouchableOpacity onPress={() => gotoSearch(item)}>
                  <Text>{item.place_name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

        </View>

        {/* Render a list here of recent places  */}
        {/* <ListComponent data={data} /> */}

      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  hamburgerMenu: {
    alignSelf: "center",
    marginLeft: 14,
    marginTop: 9,
  },
  bottomMenu: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "space-between",
    flex: 4,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    marginTop: -10,
    // marginHorizontal: 5,
  },
  searchBar: {
    flexDirection: "row",
    borderColor: "rgba(0, 0, 0, 0.14)",
    backgroundColor: "white",
    borderRadius: 25,
    elevation: 5,
    marginHorizontal: 5,
    // borderWidth: 1,
    flex: 1,
    marginTop: 25,
    justifyContent: "flex-start",
    minHeight: 50,
    maxHeight: 50,
    marginVertical: 20,
    // overflow: "hidden",
  },
  aContainer: {
    flex: 1,
    left: 0,
    borderWidth: 0,
    position: "absolute",
    marginLeft: 45,
    marginTop: 3,
    right: 0,
    top: 0,
    overflow: "hidden",
    zIndex: 1,
  },
  autocompleteContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    height: 400,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    maxHeight: 50,
    minHeight: 40,
    height: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  map: {
    flex: 6,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  listContainer:{
    backgroundColor: "white",
    marginLeft: -10,
    marginTop: 8,
    marginRight: 10,
    opacity: 100,
    zIndex: 200,
    borderBottomRightRadius: 22,
  }
});
