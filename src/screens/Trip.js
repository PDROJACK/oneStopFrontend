import { StyleSheet, View, Text, Image } from "react-native";
import React, {useEffect, useState} from "react";
import { HeaderText } from "../components/TextComponents";
import MapComponent from "../components/MapComponent";
import CardComponent from "../components/CardComponent";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as RootNavigation from "../navigation/rootNavigator";
import Backend from "../api/Backend";
import AsyncStorage from "@react-native-community/async-storage";
import { MaterialIcons } from '@expo/vector-icons';
import FlightDetailsCard from "../components/DetailsCard";

const data = [
  {
    type: "Train",
    estimated_price: 3000,
    Duration: 3100,
  },
  {
    type: "Train",
    estimated_price: 2000,
    Duration: 2900,
  },
];

export default function Trip({ route }) {
  const { trip } = route.params;

  const [tripEvents, setTripEvents] = useState();

  //   function goToOptions(item) {
  //     // navigation.navigate("Flying Options", {
  //     //   source,
  //     //   destination,
  //     //   selected: trip,
  //     // });
  //   }

  useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem("token");
      const res = await Backend.get(`/app/trip/${trip.UUID}`, {
        headers: {
          Authorization: t,
        },
      });
      setTripEvents(res.data.data.segments);
    })();
  }, []);

  const CabTrip = () => {
    return (
      <>
        <View style={styles.map}>
          <MapComponent
            location={{
              coords: { latitude: 23, longitude: 78 },
            }}
            path={true}
            origin = {{latitude: 23, longitude: 78}}
            destination = {{latitude: 24, longitude: 79}}
          />
        </View>

        {/* Travel Options */}
        <View style={styles.driver}>
          <Image
            style={styles.profilePic}
            source={require("../assets/kurt.jpg")}
          />
          <Text>Patrick</Text>

          <Text>CAR NUMBER</Text>

          {/* Three icons below */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Feather name="phone-call" size={24} color="black" />
            <AntDesign name="message1" size={24} color="black" />
            <AntDesign name="closecircleo" size={24} color="black" />
          </View>
        </View>
      </>
    );
  };

  const AirTrip = (section) => {
    return(
      <>
        <View style={{flex:1, alignContent: "center", color: "grey"}}>
         
         {/* Center component */}
         <View
          style={{ flex: 1,borderColor: "red",justifyContent:"center", marginVertical: 200, marginHorizontal: 50, borderWidth: 2, elevation: 4, borderRadius: 10, backgroundColor:"white"}}
         >
           <MaterialIcons style ={{marginHorizontal: 100, marginBottom: 80}} name="flight" size={100} color="black" />
           <FlightDetailsCard section={section} price={trip.estimated_price}/>
         </View>

        </View>
      </>
    )
  };

  return (
    <View style={styles.container}>
      {tripEvents.map(section => {
        <AirTrip/>
      })}
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profilePic: {
    borderRadius: 200,
    height: 100,
    width: 100,
    marginLeft: 10,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    zIndex: 100,
  },

  map: {
    flex: 6,
  },

  driver: {
    flex: 4,
    // marginTop: 10,
    borderRadius: 20,
    justifyContent: "flex-start",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
});
