import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, {Marker} from "react-native-maps";
import { Entypo } from '@expo/vector-icons';
import MapViewDirections from 'react-native-maps-directions';

const mapstyle = []

export default function MapComponent({location}) {

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 28.6924649,
        longitude: 77.3420681,    
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      customMapStyle={mapstyle}
    >
      <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}>
      <Text style={{fontWeight:"bold", fontSize: 15}}>You</Text>
      <Entypo name="man" size={35} color="blue" />
      </Marker>
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
