import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Backend from "../api/Backend";
import * as RootNavigation from "../navigation/rootNavigator";

// import {withNavigation} from "@react-navigation/native";

const MyTrips = () => {
    const [trips, setTrips] = useState();
    
    function goToTrip(trip) {
        RootNavigation.navigate("Trip",{
            trip
        })
    }

    const TripList = ({ trip, i }) => {
      return (
        <TouchableOpacity onPress={()=>goToTrip(trip)}>
          <View style={styles.tripListItem}>
            {/* <Text style={{fontSize:20, color: "black"}}>{i}</Text> */}
            <Text>Date: {trip.CreatedAt.split("T")[0]}</Text>
            <Text>Duration {trip.Duration.toFixed(2)}</Text>
            <Text>Total Cost: {trip.estimated_price.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      );
    };

  useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem("token");

      // Call my trips api here
      const res = await Backend.get("/app/trips", {
        headers: {
          Authorization: t,
        },
      });
      setTrips(res.data.data.trips);
    })();
  }, []);

  const { container, pageTitle, tripList } = styles;
  return (
    <View style={container}>
      {/* PAGE TITLE */}
      <View style={pageTitle}>
        <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center" }}>
          My Trips
        </Text>
      </View>

      {/* TRIP TITLES */}
      <View style={tripList}>
        <ScrollView>
          {trips
            ? trips.map((trip, i) => {
                return <TripList trip={trip} key={i} />;
              })
            : null}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tripListItem: {
    minHeight: 70,
    elevation: 2,
    borderRadius: 4,
    margin: 6,
    backgroundColor: "white",
    padding: 4,
  },
  container: {
    flex: 1,
  },
  pageTitle: {
    marginTop: 40,
    alignContent: "center",
  },
  tripList: {},
});

export default MyTrips;
