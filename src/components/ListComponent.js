import React from 'react'
import { TouchableOpacity, View, StyleSheet, FlatList } from 'react-native'
import { FontAwesome5, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
    HeaderText,
    NormalText,
    SubHeader,
  } from "../components/TextComponents";

export const ListComponent = ({data}) => {
    
    const renderItem = ({ item }) => {
        return (
          <View style={styles.locationItems}>
            <Ionicons
              name="location"
              size={30}
              color="#D5DDE0"
              style={{ alignSelf: "center", margin: 3 }}
            />
            <View style={styles.locationItem}>
              <NormalText text={item.location1} />
              <SubHeader text={item.location2} />
            </View>
          </View>
        );
      };

      return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      flexDirection: "column",
    },
    icons: {
      marginLeft: 20,
      marginTop: 28,
    },
    locationList: {
      flex: 1,
      justifyContent: "space-between",
      marginLeft: 10,
    },
    locationItems: {
      flexDirection: "row",
      maxHeight: 80,
      height: 55,
      marginBottom: 5,
    },
    locationItem: {
      marginLeft: 10,
      flex: 1,
      borderBottomColor: "#D5DDE0",
      borderBottomWidth: 1,
      marginRight: 15,
    },
  });
  