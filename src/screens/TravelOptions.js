import { StyleSheet, View, Text } from "react-native";
import React from "react";
import {
  HeaderText,
} from "../components/TextComponents";
import MapComponent from "../components/MapComponent";
import CardComponent from "../components/CardComponent";

const data = [
  {
    type: "Train",
    estimated_price: 3000,
    Duration: 3100
  },
  {
    type: "Train",
    estimated_price: 2000,
    Duration: 2900
  }
]

export default function TravelOptions({navigation, route}) {

    const {source, destination, trip} = route.params;
    console.log(trip[0])

    function goToOptions(item) {

      // Fetch flight details here
      // console.log(item);

      navigation.navigate("Flying Options",{
        source,
        destination,
        selected: trip
      });
    }

    return (
        <View style={styles.container}>
          {/* Map part */}

          <View style={styles.map}>
            <MapComponent location={{
              coords: { latitude: 23, longitude: 78 },
            }} />
          </View>

          {/* Travel Options */}
          <View style={styles.travelOptions}>
              
              {/* TITLE  */}
              <View style={{alignSelf:"center", marginVertical: 10}}>
                <HeaderText text={"Travel Options"}/>
              </View>

              {/* Items in travel options */}
              <View style={styles.travelOptionItems}>
                  <CardComponent data={[trip[0], ...data]} goToOptions={goToOptions}/>
                  {/* <CardComponent data={data} goToOptions={goToOptions}/> */}
              </View>

              {/* Text below */}
              <View style={{ flex:1, alignSelf: "center", marginVertical:10, marginHorizontal: 15}}>
                <Text style={{fontSize: 12, textAlign: "center"}}>Your cab will be waiting for you at your doorstep and airport/railway station.</Text>
              </View>
              
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 6
  },
  
  travelOptions: {
    flex: 4,
    marginTop: -20,
    borderRadius: 20,
    justifyContent: "flex-start",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 10,
    backgroundColor: "white"
  },
})




