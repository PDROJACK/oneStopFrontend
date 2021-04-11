import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform
} from "react-native";
import Backend from "../api/Backend";
import AsyncStorage from "@react-native-community/async-storage";
// import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export default function SignUp({navigation}) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function onLogin() {
    try {

      const data = {
        email,
        password,
        name
      };
      
      const {access_token} = await Backend.post("/login", {
        data
      });

      await AsyncStorage.setItem("token", access_token);

      navigation.navigate("Home");

    } catch (error) {
      console.log(error);
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
                style={{marginBottom: 10, width: 40, height: 100, }}
                source={require("../assets/Logo.png")}
              />
              
              <TextInput style={styles.input} value={email} onChangeText={(text)=>setEmail(text)} placeholder="Email"></TextInput>
              
              <TextInput style={styles.input} value={password} secureTextEntry={true} onChangeText={(text)=>setPassword(text)} placeholder="Password"></TextInput>

              {/* Login Button */}
              <View style={styles.loginButton}>
                  <TouchableOpacity onPress={onLogin}>
                    <Text style={{color: "white", fontWeight: "bold", alignSelf: "center"}}>Login</Text>
                  </TouchableOpacity>
              </View>

              {/* Signup Button */}
              <TouchableOpacity onPress={()=>console.log("go to signup")}>
                <Text style={{color: "blue", textDecorationLine:"underline"}}>Sign Up ?</Text>
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
    marginTop: 100,
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
    borderColor: "black",
    borderWidth: 1,
    height: 50,
    borderRadius: 15,
    width: 200,
    marginBottom: 20,
    padding: 10
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "blue",
    borderRadius: 15,
    width: 200,
    height: 50,
    alignContent:"center",
    justifyContent: "center",
    marginBottom: 10
  },  
  form: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    // backgroundColor:"red",
    height: 800,
    borderColor: "black", 
    borderWidth: 2
    
    // width: 400,
  },
});
