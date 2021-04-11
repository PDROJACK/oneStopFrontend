import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Backend from "../api/Backend";
// import { useState } from "react";

const CollapsibleCardContent = ({ id, start, last, source, destination, startAirport, endAirport }) => {
  const [content, setContent] = useState();

  useEffect(() => {

    const renderContent = async () => {
      try {
        const t = await AsyncStorage.getItem("token");

        // Call uuid for trip
        const res = await Backend.get(`/app/trip/${id}`, {
          headers: {
            Authorization: t,
          },
        });

        setContent(res.data.data.segments);
        // console.log(content)
      } catch (error) {
        console.log(error.message);
      }
    };
    renderContent();
  }, []);

  // console.log(content);
  const CardLine = (item) => {
    if (item) {
      if (item.item.Segment.VendorType === "cabs") {
        var d = new Date(item.item.Vendor.DepartureTime);
        var a = new Date(item.item.Vendor.ArrivalTime);
        var ic = (
          <FontAwesome5
            name="car-side"
            style={{ marginTop: 10 }}
            size={24}
            color="black"
          />
        );

        var add1, add2;
        if(item.item.Segment.ID===start){
          add1 = source.place_name
          add2 = "DEL"
        }

        if(item.item.Segment.ID===last){
          add2 = destination.place_name
          add1 = "GOI"
        }
      } else {
        var a = new Date(item.item.Vendor.local_arrival);
        var d = new Date(item.item.Vendor.local_departure);
        var ic = (
          <MaterialIcons
            name="flight"
            style={{ marginTop: 10 }}
            size={24}
            color="black"
          />
        );
        var add1 = item.item.Vendor.flyFrom;
        var add2 = item.item.Vendor.flyTo;
      }

      return (
        <View style={styles.stops}>
          {/* {item.item.Segment.VendorType === "cabs" ? ( */}
            {/* // For Cab */}
            <>
              {/* Start segment */}
              <View style={styles.stopsRow}>
                <View style={{ marginTop: 3 }}>
                  <Text style={{ fontSize: 12 }}>{a.toLocaleTimeString()}</Text>
                </View>
                <View style={{ marginLeft: 8 }}>
                  <Octicons name="primitive-dot" size={24} color="black" />
                  {ic}
                </View>
                <View style={{ marginLeft: 0, marginTop: 1 }}>
                  <Text>{add1} Airport</Text>
                </View>
              </View>

              {/* End Segment */}
              <View style={styles.stopsRow}>
                <View style={{ marginTop: 3 }}>
                  <Text style={{ fontSize: 12 }}>{d.toLocaleTimeString()}</Text>
                </View>
                <View style={{ marginLeft: 8 }}>
                  <Octicons name="primitive-dot" size={24} color="black" />
                  {item.item.Segment.ID !== last ? (
                    <Text style={{ fontSize: 24, marginLeft: 2 }}>|</Text>
                  ) : null}
                </View>
                <View style={{ marginLeft: 8, marginTop: 1 }}>
                  <Text>{add2} Airport</Text>
                </View>
              </View>
            </>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Stops in a route */}
        {content
          ? content.map((item) => {
              return <CardLine item={item} />;
            })
          : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 14,
  },
  stopsRow: {
    // marginTop: 3,
    flex: 1,
    // borderColor:"black",
    // borderWidth: 1,
    // borderBottomWidth: 1,
    flexDirection: "row",
    // alignContent: "flex-start",
    justifyContent: "flex-start",
    height: 70,
    marginBottom: 4,
  },
  stops: {
    flex: 1,
  },
});

export default CollapsibleCardContent;
