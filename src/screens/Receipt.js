import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CollapsibleCard from "../components/CollapsibleCard";
import { TouchableOpacity } from "react-native-gesture-handler";

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

const Receipt = ({navigation, route}) => {
  const {source, destination} = route.params;
  const goToHome = () => {
      navigation.navigate("home");
  };

  const {
    container,
    receipt,
    checkIcon,
    destinations,
    payment,
    okButton,
  } = styles;

  return (
    <View style={container}>
      {/* RECEIPT */}
      <View style={receipt}>
        {/* TOP CHECK ICON */}
        <View style={checkIcon}>
          <AntDesign name="checkcircleo" size={80} color="black" />
        </View>
        <Text style={{ alignSelf: "center", fontSize: 15 }}>
          Your trip is booked successfully
        </Text>

        {/* DESTINATIONS */}
        <View style={destinations}>
          <Text style={{margin: 25, alignSelf: "flex-start"}}>Source: {source.place_name}</Text>

          <View></View>

          <Text style={{margin: 25, alignSelf: "flex-start"}}>Destination: {destination.place_name}</Text>
        </View>

        {/* PAYMENT INFO */}
        <View style={payment}>
          {/* <CollapsibleCard data={data.options[0]} /> */}
          <Text style={{marginHorizontal: 20}}>Travel details have been mailed to you</Text>
          <Text style={{marginHorizontal: 20, marginBottom:10, fontSize: 18, fontWeight:"700"}}>Thank you for using Onestop!</Text>
        </View>
      </View>

      {/* OK Button */}
      <View style={okButton}>
        <TouchableOpacity onPress={goToHome}>
          <Text style={{ fontSize: 20, color: "white", alignSelf: "center" }}>
            OK
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  receipt: {
    marginHorizontal: 20,
    marginTop: 100,
    // borderColor: "black",
    // borderWidth: 3,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: "white",
    //   alignContent: "center"
  },
  checkIcon: {
    alignSelf: "center",
    margin: 20,
  },
  destinations: {
    borderColor: "black",
    alignContent: "center",
    // flex: 1,
    borderWidth: 3,
    margin: 20,
    borderRadius: 20,
    height: 200,
  },
  payment: {
    margin: 10,
    alignSelf:"center"
  },
  okButton: {
    // flex: 1,
    backgroundColor: "#1152FD",
    borderRadius: 20,
    height: 60,
    elevation: 5,
    // alignContent: "center",
    justifyContent: "center",
    margin: 20,
  },
});

export default Receipt;
