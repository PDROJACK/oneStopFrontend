import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const CardComponent = ({data, goToOptions}) => {

  const RenderSingleCard = ({data}) => {
    return (
     
        <View style={styles.travelItem}>
          <View style={styles.travelItemContent}>
            { data.type ?
           <FontAwesome5 name="train" style={{ marginLeft: 15 }} size={70} color="black" />: 
            <MaterialIcons
              style={{ marginLeft: 15 }}
              name="flight-takeoff"
              size={70}
              color="black"
              />
            
            }
            <Text
              style={{
                fontWeight: "bold",
                marginLeft: 35,
                fontSize: 18,
                marginBottom: 10,
              }}
            >
              {data.type? data.type: "Air"}
            </Text>
            <Text
              style={{ fontWeight: "normal", marginLeft: 10, fontSize: 12 }}
            >
              Starting from
            </Text>
            <Text style={{ fontWeight: "bold", marginLeft: 19, fontSize: 15 }}>
              {(data.estimated_price).toFixed(2)}
            </Text>
            <TouchableOpacity
              style={{ backgroundColor: "black", width: 100, borderRadius: 50 }}
              onPress={()=>goToOptions(data)}
            >
              <Text
                style={{
                  color: "white",
                  alignSelf: "center",
                  fontSize: 12,
                  margin: 5,
                }}
              >
                {(data.Duration/3600).toFixed(2)} hours
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  };

  const RenderCardList = () => {
    return  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.map((item)=>{
             return <RenderSingleCard data={item}/>
        })}
    </ScrollView>
  };

  return <RenderCardList/>
};

const styles = StyleSheet.create({
  travelItemContent: {
    alignSelf: "center",
    marginVertical: 10,
    justifyContent: "flex-start",
    flex: 1,
  },

  travelItem: {
    marginRight: 10,
    marginBottom: 20,
    height: 210,
    width: 150,
    flex: 1,
    backgroundColor: "white",
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 6,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 20,
  },
  travelOptionItems: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    height: 220,
    marginLeft: 10,
  },
});

export default CardComponent;
