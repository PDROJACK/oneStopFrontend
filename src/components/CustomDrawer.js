import {
  DrawerContent,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerView,
} from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Backend from "../api/Backend";
import AsyncStorage from "@react-native-community/async-storage";

export default function CustomDrawer(props) {

  const [userData, setUserData] = useState();

  
  useEffect( ()=>{

    const fetchData = async () => {

      try {
        const t = await AsyncStorage.getItem("token");

        if(t){
          // Get User Info
          const data = await Backend.get('/app/me', {
            headers: {
              Authorization: t
            }
          });
          // console.log(data);
          setUserData(data.data.data.user);
        }
      } catch (error) {
        console.log(error);
      }


      // Set user data
    }

    fetchData();

  },[]);

  return (
    <DrawerContentScrollView style={{ flex: 1 }}>
      {/* <View style={styles.container}> */}
      {/* Header Part */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image style={styles.profilePic} source={require("../assets/kurt.jpg")} />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              marginLeft: 12,
              color: "white",
            }}
          >
            {userData ? userData.name: "Loading..."}
       
          </Text>
          <Text style={styles.headerText}>{userData ? userData.email : "Loading..."}</Text>
        </View>
      </View>

      {/* List Items */}
      <View style={styles.list}>
        <DrawerItemList {...props} />
        {/* </View> */}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profilePic: {
    borderRadius: 200,
    height: 100,
    width: 100,
    marginLeft: 10
  },
  header: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#1152FD",
    height: 250,
    justifyContent: "center",
  },
  headerContent: {
    marginLeft: 20,
    marginTop: 40
    // color: "white"
  },
  headerText: {
    color: "white",
    marginLeft: 12,
  },
  list: {
    flex: 1,
    height: 600,
  },
});
