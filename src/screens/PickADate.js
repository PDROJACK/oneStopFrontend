import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { NormalText, ThickHeading } from "../components/TextComponents";
import { TouchableOpacity } from "react-native-gesture-handler";
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from "@react-native-community/async-storage";
import Backend from "../api/Backend";


Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export const PickADate = (props) => {

  const {source, destination} = props.route.params;
  const [fromDate, setfromDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toDate, settoDate] = useState();

  const onChange = (event, selectedDate) => {
    
    let d = new Date(selectedDate);
    d = new Date(d.getTime() + 3600000)

    
    const currentDate = d || fromDate ;

    setShow(Platform.OS === "ios");
    setfromDate(currentDate);
    settoDate(fromDate.addDays(3));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const findRoutes = async () => {
    
    // Date done now send souce and destination
    const t = await AsyncStorage.getItem("token");

    setLoading(true);

    const data = {
      source, 
      destination,
      from_date: `${fromDate.getDate()}/${fromDate.getMonth()}/${fromDate.getFullYear()}`,
      to_date: `${toDate.getDate()}/${toDate.getMonth()}/${toDate.getFullYear()}`
    }

    // fetch End to End trip options here
    const trip = await Backend.post('/app/search/trip', 
        data, {
          headers: {
            Authorization: t
          }
        }
    );

    setLoading(false);

    // Call backend api for routes
    props.navigation.navigate("Travel Options",{
        source,
        destination,
        trip: trip.data.data.search
    });

  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <ThickHeading text={"Pick Date"} />
      </View>

      <View style={styles.content}>
        <View style={{ justifyContent: "center", marginBottom: 5 }}>
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "bold",
              fontSize: 50,
              color: "#1152FD",
            }}
          >
            {fromDate.getUTCDate()}/{fromDate.getUTCMonth()}/{fromDate.getFullYear()}
          </Text>
        </View>
        <View style={{ alignItems: "center", marginBottom: 15 }}>
          <NormalText text={"Pick the date on which you want to travel."} />
        </View>
        <View>
          <TouchableOpacity style={styles.pickDate} onPress={showDatepicker}>
            <Text style={{ color: "white", alignSelf: "center", fontSize: 18 }}>
              Pick Date
            </Text>
          </TouchableOpacity>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={fromDate}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={onChange}
          />
        )}

        <View>
          <TouchableOpacity style={styles.pickDate} onPress={findRoutes}>
            <Text style={{ color: "white", alignSelf: "center", fontSize: 18 }}>
              Search Options
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <AnimatedLoader
        visible={loading}
        overlayColor="rgba(0, 0, 0,0.99)"
        source={require("../assets/loader3.json")}
        animationStyle={styles.lottie}
        speed={1}
      >
        <Text style={{ color: "white" }}>Finding Routes...</Text>
      </AnimatedLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 400,
    height: 400,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 30,
  },
  titleBar: {
    flex: 1,
    marginTop: 16,
    maxHeight: 40,
    alignSelf: "center",
  },
  content: {
    flex: 8,
    width: 300,
    marginHorizontal: 50,
    justifyContent: "center",
  },
  pickDate: {
    backgroundColor: "#1152FD",
    justifyContent: "center",
    margin: 10,
    borderRadius: 10,
    height: 40,
  },
});
