import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Octicons } from "@expo/vector-icons";

const FlightDetailsCard = (section) => {
const {container, firstRow, secondRow, thirdRow} = styles;
  return (
    <View style={container}>
      {/* First Row */}
      <View style={firstRow}>
        <Text style={{fontWeight:"bold"}}>{section.section.Vendor.cityCodeFrom} to {section.section.Vendor.cityCodeTo}</Text>
        <Text>AE {section.section.Vendor.ID}</Text>
        <Text style={{fontWeight:"bold"}}>INR {(section.price/2).toFixed(2)}</Text>
      </View>

      {/* Second Row */}
      <View style={secondRow}> 
        <Text>{(section.section.Vendor.Duration/60).toFixed(2)} hrs</Text>
        <Octicons name="primitive-dot" size={15} style={{margin: 4}} color="grey" />
        <Text>Non Stop</Text>
      </View>

      {/* Second Row */}
      <View style={thirdRow}>
          <Text>{section.section.Vendor.airline}</Text>
                <Octicons name="primitive-dot" style={{margin: 4}} size={15} color="grey" />
          <Text>Economy</Text>
          <TouchableOpacity style={{borderRadius: 20, borderColor:"blue", marginLeft:100, backgroundColor:"blue"}}>
              <Text style={{color:"white", padding: 5, fontSize: 10}}>
                  Additional Options
              </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default FlightDetailsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
    elevation: 5,
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
