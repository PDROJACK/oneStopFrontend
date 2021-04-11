import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
import Backend from "../api/Backend";
import AsyncStorage from "@react-native-community/async-storage";
import { 
  useFonts,
  Poppins_500Medium
} from "@expo-google-fonts/inter"
// import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("singh@gmail.com");
  const [password, setPassword] = useState("12345");
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
  });

  useEffect(() => {
    (async () => {
      try {
        let isLoggedIn = await AsyncStorage.getItem("token");

        if (isLoggedIn) {
          navigation.navigate("home");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function onLogin() {
    const data = {
      email: email,
      password: password,
    };

    try {
      const res = await Backend.post("/login", data);

      await AsyncStorage.setItem(
        "token",
        "Bearer " + res.data.data.token.token
      );

      navigation.navigate("home");
      // console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {/* Main container */}
      {/* <View style={{flex: 1 }}> */}

      {/* Text inputs  */}
      <View style={styles.form}>
        {/* ONE Stop LOGO */}
        <Image
          style={styles.logo}
          source={require("../assets/logo_2.png")}
        />
        <Text style={styles.title}>Onestop</Text>
        <Text style={styles.subtitle}>Sign in to explore the world</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
        ></TextInput>

        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
        ></TextInput>

        {/* Login Button */}
        <View style={styles.loginButton}>
          <TouchableOpacity onPress={onLogin}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
          
        {/* <Text style={{marginBottom: 10}}>or</Text> */}
        {/* Signup Button */}
        <TouchableOpacity onPress={() => console.log("go to signup")}>
          <Text style={styles.link}>
            or create a new account
          </Text>
        </TouchableOpacity>
      </View>

      {/* </View> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainArea: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "white",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainArea: {
    top: 10,
    alignItems: "center",
  },
  input: {
    borderColor: "#D5DDE0",
    borderWidth: 0.5,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#F7F8F9",
    width: 300,
    marginBottom: 20,
    padding: 10,
  },
  logo: {
    width: 50,
    height: 130,
    marginBottom: 10,
    marginLeft: -15,
  },
  title: {
    marginBottom: 5,
    fontSize: 24,
    fontWeight: "600",
    // fontFamily: 'Poppins_500Medium',
  },
  subtitle: {
    marginBottom: 30,
    fontSize: 14,
    fontWeight: "600",
    color: "#3E4958",
  },
  loginButton: {
    backgroundColor: "#1152FD",
    borderRadius: 15,
    width: 300,
    height: 50,
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  link: {
    color: "#3E4958",
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    // backgroundColor:"red",
    // height: 800,
    // borderColor: "black",
    // borderWidth: 2,

    // width: 500,
  },
});
