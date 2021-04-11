import { StyleSheet, View, Text, Image } from "react-native";
import React from "react";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {
  HeaderText,
  NormalText,
  SubHeader,
} from "../components/TextComponents";
import { ListComponent } from "../components/ListComponent";
import { useState, useEffect } from "react";
import Backend from "../api/Backend";
import AsyncStorage from "@react-native-community/async-storage";

const data = [
  {
    location1: "Leoney Resort, Vagator, Goa",
    location2: "Goa, India",
    id: 1,
  },
  {
    location1: "R Block, Dilshad Garden, Delhi",
    location2: "Delhi, India",
    id: 2,
  },
  {
    location1: "Adobe Systems, Sector 132, Noida",
    location2: "Noida, Uttar pradesh, India",
    id: 3,
  },
  {
    location1: "Tower B, Publicis Sapients, Gurugram",
    location2: "Gurugram, Haryana",
    id: 4,
  },
];

export default function DestinationSearch(props) {
  const { destination, source } = props.route.params;
  const [sdestination, setsDestination] = useState();
  const [startLocation, setStartLocation] = useState();
  const [sairport, setsAirport] = useState();
  const [dairport, setsdAirport] = useState();
  const [token, settoken] = useState();

  useEffect(() => {
    const fetchAirport = async () => {
      let t = await AsyncStorage.getItem("token");
      const airport = await Backend.post(
        "/app/search/airports",
        {
          lat: source.lat,
          lng: source.lng,
          city: "delhi",
        },
        {
          headers: {
            Authorization: t,
          },
        }
      );
      setsAirport(airport.data.data.search[0]);
      // console.log(destination)
      const tdairport = await Backend.post(
        "/app/search/airports",
        {
          lat: destination.center[1],
          lng: destination.center[0],
          city: destination.context.slice(-2)[0].text,
        },
        {
          headers: {
            Authorization: t,
          },
        }
      );

      setsdAirport(tdairport.data.data.search[0]);
    };

    fetchAirport();
    setsDestination(destination.place_name);
    // setStartLocation(startLocation);
  }, []);

  const gotoPickDate = async () => {
    // console.log(destination);
    props.navigation.navigate("Pick Date", {
      source: { ...source, airports: [sairport.ID] },
      destination: {
        lat: destination.center[1],
        lng: destination.center[0],
        city: destination.context.slice(-2)[0].text,
        place_name: destination.place_name,
        airports: [dairport.ID],
      },
    });
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/map.png")}
        />
      </View>
      {/* Search Bars */}
      <View style={styles.searchBars}>
        <View style={styles.icons}>
          <FontAwesome name="circle" size={14} color="black" />
          <Text style={{ fontSize: 30, marginLeft: 2 }}>|</Text>
          <FontAwesome5 name="caret-down" size={25} color="black" />
        </View>
        <View style={styles.searchComponents}>
          {/* Set Start Location Search bar */}
          <View style={styles.topSearchBar}>
            <TouchableOpacity>
              <TextInput
                style={{ fontSize: 16 }}
                placeholder="Current Location"
              ></TextInput>
            </TouchableOpacity>
          </View>

          {/* Set Destination Search Bar */}
          <View style={styles.topSearchBar}>
            <TouchableOpacity>
              <TextInput
                style={{ fontSize: 16 }}
                placeholder="Where to ?"
                value={sdestination}
                onChangeText={(text) => setsDestination(text)}
                onSubmitEditing={gotoPickDate}
                autoFocus={true}
              ></TextInput>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* List View */}
      <View style={styles.locationList}>
        {/* TITLE */}
        <View style={{ marginBottom: 5 }}>
          <HeaderText text={"RECENT"} />
        </View>

        {/* Address items */}
        <ListComponent data={data} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    flexDirection: "column",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    height: 100,
    zIndex: -100,
    overflow: "hidden",
  },
  searchBars: {
    flex: 1,
    flexDirection: "row",
    // alignSelf: "flex-start",
    borderColor: "gray",
    maxHeight: 140,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    // elevation: 0,
    borderWidth: 1,
    borderRadius: 22,
    marginVertical: 30,
    marginHorizontal: 5,
  },
  icons: {
    marginLeft: 20,
    marginTop: 28,
  },
  searchComponents: {
    marginLeft: 5,
    marginTop: 20,
    flex: 1,
    justifyContent: "space-evenly",
  },
  topSearchBar: {
    flex: 1,
    maxHeight: 65,
    justifyContent: "flex-start",
    paddingTop: 1,
    paddingLeft: 6,
    overflow: "hidden",
    marginRight: 15,
  },
  locationList: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 10,
  },
  locationItems: {
    flexDirection: "row",
    maxHeight: 80,
    height: 55,
    marginBottom: 5,
  },
  locationItem: {
    marginLeft: 10,
    flex: 1,
    borderBottomColor: "#D5DDE0",
    borderBottomWidth: 1,
    marginRight: 15,
  },
});
