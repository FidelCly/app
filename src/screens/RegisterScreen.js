import React, { useState, useEffect } from "react";
import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import { Input } from "@rneui/themed";
import { login, register } from "../services";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    handleToken();
  }, []);

  /**
   * handleToken
   * @desc check if there's a token in the storage
   */
  const handleToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      if (userId && token) {
        props.navigation.navigate("BottomNavigator", {
          screen: "Profil",
        });
      }
    } catch (error) {
      console.log("🚀 ~ handleToken ~ error:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        style={{ width: 286, height: 199 }}
        source={require("../assets/secure_login.png")}
      />
      <Input
        containerStyle={{ width: "70%" }}
        inputStyle={{
          marginLeft: 10,
        }}
        placeholder="Email"
        leftIcon={<FontAwesome5 name="user-alt" size={24} color="black" />}
        onChangeText={(val) => setEmail(val)}
      />
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Mot de passe"
        type="password"
        secureTextEntry={true}
        onChangeText={(val) => setPassword(val)}
        leftIcon={<FontAwesome5 name="key" size={24} color="black" />}
        errorStyle={{ color: "red" }}
        renderErrorMessage="ENTER A VALID ERROR HERE"
      />
      <Pressable
        title="Creer mon compte"
        type="solid"
        style={styles.buttonConnect}
        onPress={async () => {
          await registerUser(email, password);

          props.navigation.navigate("BottomNavigator", {
            screen: "Profil",
          });
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Creer un compte</Text>
      </Pressable>

      <Text style={{ marginTop: 25 }}>Vous avez déjà un compte ?</Text>
      <Pressable
        title="Se connecter"
        type="solid"
        style={styles.buttonConnect}
        onPress={() => props.navigation.navigate("Login")}
      >
        <Text style={{ margin: 10 }}> Se connecter !</Text>
      </Pressable>
      {/* <Text style={{ margin: 10 }}>Mot de passe oublié?</Text> */}
    </View>
  );
}

/**
 * registerUser
 */
async function registerUser(email, password) {
  try {
    const registerUserData = await register(email, password);

    if (registerUserData) {
      AsyncStorage.setItem("userId", registerUserData.uuid);

      const loginDatas = await login(email, password);
      if (loginDatas && loginDatas.status === 200) {
        AsyncStorage.setItem("token", loginDatas.token);
      }
    }
  } catch (error) {
    console.log("🚀 ~ registerUser ~ error:", error);
  }
}

// Styles

const styles = StyleSheet.create({
  buttonConnect: {
    backgroundColor: "#5DB075",
    borderRadius: 20,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
  },
});
