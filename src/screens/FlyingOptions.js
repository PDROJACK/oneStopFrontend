import AsyncStorage from "@react-native-community/async-storage";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Backend from "../api/Backend";
import CollapsibleCard from "../components/CollapsibleCard";
import CollapsibleCardContent from "../components/CollapsibleCardContent";

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

const FlyingOptions = ({ navigation, route }) => {
  const { selected, source, destination } = route.params;

  //  GO to Rides page
  const goToRides = (data) => {
    
    navigation.navigate("Ride Options", {
      selected: data,
      source,
      destination,
    });
  };

  return (
    <View style={styles.container}>
      {/* TITLE BAR */}
      <View style={styles.titleBar}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Air Options</Text>
      </View>

      {/* FLIGHT PRICE */}
      <View style={styles.price}>
        <Text style={{ fontSize: 40, alignSelf: "center", fontWeight: "bold" }}>
          INR {selected[0].estimated_price.toFixed(2)}
        </Text>

        {/* TEXT BELOW FLIGHT PRICE */}
        <Text style={{ fontSize: 10 }}>
          Best option for flying based on your past journies.
        </Text>
      </View>

      {/* LIST OF FLIGHT OPTIONS */}
      <View style={styles.listOfOptions}>
        <ScrollView>
          {selected.map((data) => {
            // last={data.search.Segments.lenght + data.search.Segments[0].ID}
            return (
              <CollapsibleCard data={data} goToRides={goToRides} useBezier>
                <CollapsibleCardContent
                  id={data.UUID}
                  source={source}
                  destination={destination}
                  startAirport={data.Segments[1]}
                  endAirport={data.Segments.slice(-2)[0]}
                  last={data.Segments.slice(-1)[0].ID}
                  start={data.Segments[0].ID}
                />
              </CollapsibleCard>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center",
  },
  titleBar: {
    alignSelf: "center",
    // borderColor: "red",
    // borderWidth: 2,
    marginVertical: 30,
    height: 50,
  },
  price: {
    justifyContent: "center",
    alignSelf: "center",
    // borderColor: "red",
    // borderWidth: 2,
    marginBottom: 20,
  },
  listOfOptions: {
    // borderColor: "red",
    // borderWidth: 2,
    // flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
});

export default FlyingOptions;
