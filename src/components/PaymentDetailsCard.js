import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Octicons } from "@expo/vector-icons";

const PaymentDetailsCard = (data) => {
const {container, firstRow, secondRow, thirdRow} = styles;
  return (
    <View style={container}>
      {/* First Row */}
      <View style={firstRow}>
        <Image source={require("../assets/ic_mastercard.png")}/>
        <Text style={{fontWeight:"bold"}}>**** 2134</Text>
        <Text style={{fontWeight:"bold"}}>INR 6220</Text>
      </View>
    </View>
  );
};

export default PaymentDetailsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
    elevation: 5,
    minHeight:50,
    backgroundColor:"white"
},
firstRow: {
      flexDirection: "row",
        justifyContent:"space-between"

  },
  secondRow: {
    flexDirection: "row",
    // justifyContent: "space-around"
  },
  thirdRow: {
    flexDirection: "row",

  },
});
