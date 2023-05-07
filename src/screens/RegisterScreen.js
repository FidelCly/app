import React, { useState, useEffect } from "react";
import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import { Input } from "@rneui/themed";
import { login, register } from "../services";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/Button";

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
    <View style={styles.registerScreen__container}>
      <View style={styles.registerScreen__header}>
        <FontAwesome5
          name="arrow-left"
          size={24}
          style={styles.iconArrowLeft}
        />
        <Pressable
          title="Retour"
          type="solid"
          onPress={() => props.navigation.navigate("Home")}
        >
          <Text style={[styles.text__retour]}>Retour</Text>
        </Pressable>
      </View>

      <View style={styles.registerScreen__body}>
        <Input
          containerStyle={{ width: "85%" }}
          inputStyle={styles.app__inputStyle}
          placeholder="Adresse email"
          onChangeText={(val) => setEmail(val)}
        />
        <Input
          containerStyle={{ width: "85%" }}
          inputStyle={styles.app__inputStyle}
          placeholder="Mot de passe"
          type="password"
          secureTextEntry={true}
          rightIcon={
            <FontAwesome5 name="eye" size={24} style={styles.iconEye} />
          }
          onChangeText={(val) => setPassword(val)}
          errorStyle={{ color: "red" }}
          renderErrorMessage="Adresse email ou mot de passe incorrect"
        />

        <View style={[styles.mb40]}>
          <Pressable
            title="Créer un compte"
            type="solid"
            onPress={async () => {
              await registerUser(email, password);
              props.navigation.navigate("BottomNavigator", {
                screen: "Profil",
              });
            }}
          >
            <CustomButton title="Créer un compte" />
          </Pressable>
        </View>

        <View style={[styles.mb40]}></View>
        <Text>Déjà inscrit ?</Text>
        <Pressable
          title="Se connecter"
          type="solid"
          onPress={() => props.navigation.navigate("Login")}
        >
          <Text style={[styles.text__greenUnderline]}>Se connecter</Text>
        </Pressable>
      </View>
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
  width100: {
    width: "100%",
    alignItems: "center",
  },
  mb40: {
    marginBottom: 40,
  },
  registerScreen__container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  registerScreen__header: {
    flexDirection: "row",
    marginTop: 50,
  },
  registerScreen__body: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon__retour: {
    flexDirection: "row",
    marginRight: 20,
  },
  text__retour: {
    color: "#424242",
    fontSize: 16,
  },

  app__inputStyle: {
    padding: 10,
    backgroundColor: "white",
    fontSize: 16,
  },
  iconEye: { position: "absolute", right: 20, color: "grey" },
  iconArrowLeft: { marginLeft: 20, marginRight: 20, color: "#5DB075" },

  text__greenUnderline: {
    color: "#5DB075",
    textDecorationLine: "underline",
    fontSize: 16,
    fontWeight: "bold",
  },
});
