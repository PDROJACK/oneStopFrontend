import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, TextInput } from "react-native";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { ListComponent } from "../components/ListComponent";
import MapComponent from "../components/MapComponent";
import CollapsibleCard from "../components/CollapsibleCard";
import AsyncStorage from "@react-native-community/async-storage";
import Backend from "../api/Backend";
import PaymentDetailsCard from "../components/PaymentDetailsCard";

const data = {
  type: "Air",
  options: [
    {
      price: "$600",
      time: "7h 4m",
      longStart: "1",
      longEnd: "12",
      tripOneStart: "10",
      tripOneEnd: "12",
      tripTwoStart: "21",
      tripTwoEnd: "22",
      totalDuration: "7h 20m",
      provider: "Jet Airways",
      date: "2/2/2222",
    },
    {
      price: "$600",
      time: "7h 4m",
      longStart: "1",
      longEnd: "12",
      tripOneStart: "10",
      tripOneEnd: "12",
      tripTwoStart: "21",
      tripTwoEnd: "22",
      totalDuration: "7h 20m",
      provider: "Jet Airways",
      date: "2/2/2222",
    },
  ],
};

export default function Payment({ navigation, route }) {
  // const [selectedTrip, selectedTrip] = useState();
  const { source, destination, selected } = route.params;

  const [fetchedTrips, setfetchedTrips] = useState();

  const goToReceipt = async () => {
    const t = await AsyncStorage.getItem("token");
    const res = await Backend.put(
      `/app/trip/${selected.UUID}/book`,
      {
        persist: true,
      },
      {
        headers: {
          Authorization: t,
        },
      }
    );

    // console.log(res);
    navigation.navigate("Receipt", {
      source,
      destination,
      selected,
    });
  };

  return (
    <View style={styles.container}>
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
          <Text
            style={{
              fontSize: 20,
              alignSelf: "flex-start",
              marginLeft: 10,
              fontWeight: "bold",
            }}
          >
            Select Payment
          </Text>

          <TouchableOpacity
            onPress={goToReceipt}
            style={{ paddingBottom: 30, backgroundColor: "white" }}
          >
            <PaymentDetailsCard />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={goToReceipt}
            style={{ paddingBottom: 30, backgroundColor: "white" }}
          >
            <PaymentDetailsCard />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={goToReceipt}
            style={{ paddingBottom: 30, backgroundColor: "white" }}
          >
            <PaymentDetailsCard />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hamburgerMenu: {
    alignSelf: "center",
    marginLeft: 5,
    marginTop: 3,
  },
  bottomMenu: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "space-between",
    flex: 4,
    backgroundColor: "white",
    // marginHorizontal: 5,
  },
  searchBar: {
    flexDirection: "column",
    justifyContent: "space-between",
    // borderColor: "black",
    // marginHorizontal: 0,
    margin: 5,
    // backgroundColor: "white",
    // borderRadius: 6,
    // borderWidth: 5,
    // flex: 1,
    // justifyContent: "space-evenly",
    // alignContent: "stretch",
    // minHeight: 50,
    // maxHeight: 50,
    marginVertical: 20,
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
});
