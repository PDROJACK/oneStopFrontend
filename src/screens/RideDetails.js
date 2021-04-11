import AsyncStorage from "@react-native-community/async-storage";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextComponent, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Backend from "../api/Backend";
import CarDetailsCard from "../components/CarDetailsCard";
import CollapsibleCard from "../components/CollapsibleCard";
import CollapsibleCardContent from "../components/CollapsibleCardContent";
import FlightDetailsCard from "../components/DetailsCard";
import MapComponent from "../components/MapComponent";
import PaymentDetailsCard from "../components/PaymentDetailsCard";

const data = {
  type: "Air",
  options: [
    {
      estimated_price: 600,
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
      estimated_price: 600,
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

const RideDetails = ({ navigation, route }) => {
  const { selected, source, destination } = route.params;

  const [details, setdetails] = useState();

  useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem("token");

      const res = await Backend.get(`/app/trip/${selected.UUID}`,{
        headers: {
          Authorization: t
        }
      });
      
      setdetails(res.data.data.segments);
      console.log(details)
    })();
  }, []);

  const goToPayments = () => {
    // Book the trip
    navigation.navigate("Payment", {
      selected,
      source,
      destination
    });
  };
  return (
    <View style={styles.designContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* MAP COMPONENT */}
          {/* <View style={{ flex: 1, height: 400 }}>
        <MapComponent />
      </View> */}

          <View>
           
            {/* TITLE OF RIDE DETAILS PAGE */}
            <View style={styles.title}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Ride Details
                </Text>
              </View>
            </View>

            {/* Total DETAILS */}
            <View style={styles.flightDetails}>
              <View style={{ margin: 5 }}>
                {/* <Text style={styles.subHeading}>Trip Details</Text> */}
                <CollapsibleCard
                  data={selected}
                  goToRides={() => {
                    console.log("pressed");
                  }}
                  defaultCollapsed={false}
                  useBezier
                >
                  <CollapsibleCardContent
                    id={selected.UUID}
                    source={source}
                    destination={destination}
                    startAirport={selected.Segments[1]}
                    endAirport={selected.Segments.slice(-2)[0]}
                    last={selected.Segments.slice(-1)[0].ID}
                    start={selected.Segments[0].ID}
                  />
                </CollapsibleCard>
              </View>
            </View>

            {/* Section Wise Details */}

            {/* RIDE DETAILS */}
            <View style={styles.ride}>
              <View style={{ margin: 5 }}>
                <Text style={styles.subHeading}>Section Details</Text>
                {details ? details.map((section) => {

                  return section.Segment.VendorType === "flights" ? (
                    <FlightDetailsCard section={section} price={selected.estimated_price}/>
                  ) : (
                    <CarDetailsCard section={section}/>
                  );
                }) : null
              }
              </View>
            </View>

            {/* PAYMENT DETAILS  */}
            <View style={styles.payment}>
              <View style={{ margin: 5 }}>
                <Text style={styles.subHeading}>Payment Details</Text>

                {/* SHOW PAYMENT OPTIONS HERE */}
                <PaymentDetailsCard />
                {/* <CollapsibleCard section={data.options[0]} /> */}

                {/* Change Payment options page */}
                <TouchableOpacity>
                  <Text style={{ alignSelf: "flex-end", marginRight: 10 }}>
                    Change Payment Method
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* PAY AND BOOK BUTTON */}
            <View style={styles.payBook}>
              <TouchableOpacity onPress={goToPayments}>
                <Text
                  style={{ fontSize: 20, color: "white", alignSelf: "center" }}
                >
                  PAY AND BOOK
                </Text>
              </TouchableOpacity>
            </View>
         
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center",
    marginHorizontal: 15,
  },
  payBook: {
    // flex: 1,
    backgroundColor: "#1152FD",
    borderRadius: 20,
    height: 60,
    elevation: 5,
    // alignContent: "center",
    justifyContent: "center",
    margin: 10,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    margin: 5,
  },
  designContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    // borderColor: "red",
    alignSelf: "center",
    marginVertical: 20,
  },
  flightDetails: {
    // borderColor: "red",
    // borderWidth: 1,
  },
  ride: {
    // borderColor: "red",
    // borderWidth: 1,
    alignSelf: "stretch",
    // flex: 1
  },
  payment: {
    // borderColor: "red",
    // borderWidth: 1,
  },
});

export default RideDetails;
