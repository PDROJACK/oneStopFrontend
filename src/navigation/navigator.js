import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import Login from "../screens/Login";
import HomeScreen from "../screens/HomeScreen";
import DestinationSearch from "../screens/DestinationSearch";
import { PickADate } from "../screens/PickADate";
import { View, Text } from "react-native";
import TravelOptions from "../screens/TravelOptions";
import FlyingOptions from "../screens/FlyingOptions";
import RideDetails from "../screens/RideDetails";
import Payment from "../screens/Payments";
import Receipt from "../screens/Receipt";
import AsyncStorage from "@react-native-community/async-storage";
import MyTrips from "../screens/MyTrips";
import Chat from "../screens/Chat";
import Trip from "../screens/Trip";
import { navigationRef } from "./rootNavigator";
import * as RootNavigation from "../navigation/rootNavigator";
const Drawer = createDrawerNavigator();
const { Screen, Navigator } = createStackNavigator();

const Home = () => {
  return (
    <Navigator>
      <Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Screen
        name="home"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <Screen
        name="Pick Date"
        options={{ headerShown: false }}
        component={PickADate}
      />
      <Screen
        name="Search"
        options={{ headerShown: false }}
        component={DestinationSearch}
      />
      <Screen
        name="Travel Options"
        options={{ headerShown: false }}
        component={TravelOptions}
      />
      <Screen
        name="Flying Options"
        options={{ headerShown: false }}
        component={FlyingOptions}
      />
      <Screen
        name="Ride Options"
        options={{ headerShown: false }}
        component={RideDetails}
      />
      <Screen
        name="Payment"
        options={{ headerShown: false }}
        component={Payment}
      />
      <Screen
        name="Receipt"
        options={{ headerShown: false }}
        component={Receipt}
      />
      <Screen name="Trip" options={{ headerShown: false }} component={Trip} />
    </Navigator>
  );
};

const DummyComponent = (props) => (
  <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
    <Text style={{ fontWeight: "bold" }}>{props.name}</Text>
  </View>
);

function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: "#ffff",
          itemStyle: { marginVertical: 10, marginLeft: 25 },
          labelStyle: { fontWeight: "bold", color: "black" },
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen name="HOME" component={Home} />

        <Drawer.Screen name="MY TRIPS">{() => <MyTrips />}</Drawer.Screen>

        <Drawer.Screen name="PAYMENT">
          {() => <DummyComponent text={"PAYMENT"} />}
        </Drawer.Screen>

        <Drawer.Screen name="PROMOCODE">
          {() => <DummyComponent text={"PROMOCODE"} />}
        </Drawer.Screen>

        <Drawer.Screen name="SUPPORT">{() => <Chat />}</Drawer.Screen>

        <Drawer.Screen name="LOGOUT">
          {() => {
            try {
              AsyncStorage.removeItem("token");
              RootNavigation.navigate("Login");
            } catch (error) {
              console.log(error);
            }

            return <></>;
          }}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
