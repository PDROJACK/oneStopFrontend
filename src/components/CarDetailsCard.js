import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Octicons } from "@expo/vector-icons";

const CarDetailsCard = ({section}) => {
const {container, firstRow, secondRow, thirdRow} = styles;
  return (
    <View style={container}>
      {/* First Row */}
      <View style={firstRow}>
        <Image width={40}  source={require('../assets/standard.png')}/>
        <Text style={{fontWeight:"bold"}}>INR {(section.Vendor.ExpectedPrice).toFixed(2)}</Text>
      </View>

      {/* Second Row */}
      <View style={secondRow}> 
        <Text>Standard</Text>
        <Octicons name="primitive-dot" size={15} style={{margin: 4}} color="grey" />
        <Text>{(section.Vendor.ExpectedPrice/60).toFixed(1)} hours</Text>
      </View>

    </View>
  );
};

export default CarDetailsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
    height: 80,
    elevation: 5,
    backgroundColor:"white"
},
firstRow: {
      flexDirection: "row",
      height:40,
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
