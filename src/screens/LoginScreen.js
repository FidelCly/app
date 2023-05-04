import React, { useState, useEffect } from "react";
import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import { Input } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../services";
import { FontAwesome5 } from "@expo/vector-icons";
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
      if (token && userId) {
        props.navigation.navigate("BottomNavigator", {
          screen: "Profil",
        });
      }
    } catch (error) {
      console.log("🚀 ~ handleToken ~ error:", error);
    }
  };

  return (
    <View style={styles.loginScreen__container}>
      <View style={styles.loginScreen__header}>
        <Pressable
          title="Retour"
          type="solid"
          style={styles.icon__retour}
          onPress={() => props.navigation.navigate("Register")}
        >
          <FontAwesome5
            name="arrow-left"
            size={24}
            style={styles.iconArrowLeft}
          />
          <Text style={styles.text__retour}>Retour</Text>
        </Pressable>
      </View>
      <View style={styles.loginScreen__body}>
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
        <View style={[styles.width100, styles.mb40]}>
          <Text style={[styles.text__mdp, styles.text__greenUnderline]}>
            Mot de passe oublié?
          </Text>
        </View>

        <View style={[styles.mb40]}>
          <Pressable
            title="Se connecter"
            type="solid"
            onPress={async () => {
              await loginUser(email, password);
              props.navigation.navigate("BottomNavigator", {
                screen: "Profil",
              });
            }}
          >
            <CustomButton title="Se connecter" />
          </Pressable>
        </View>

        <View style={[styles.mb40]}></View>
        <Text>Pas encore inscrit ?</Text>
        <Pressable
          title="Creer un compte"
          type="solid"
          onPress={() => props.navigation.navigate("Register")}
        >
          <Text style={[styles.text__greenUnderline]}>Créer un compte</Text>
        </Pressable>
      </View>
    </View>
  );
}

async function loginUser(email, password) {
  try {
    const loginUserData = await login(email, password);

    if (loginUserData && loginUserData.status === 200) {
      await AsyncStorage.setItem("token", loginUserData.token);
      await AsyncStorage.setItem("userId", loginUserData.userUuid);
    }
  } catch (error) {
    console.log("🚀 ~ loginUser ~ error", error);
  }
}

const styles = StyleSheet.create({
  width100: {
    width: "100%",
    alignItems: "center",
  },
  mb40: {
    marginBottom: 40,
  },
  loginScreen__container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loginScreen__header: {
    top: 50,
  },
  loginScreen__body: {
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

  text__mdp: {
    width: "85%",
    textAlign: "right",
    marginRight: 20,
  },

  text__greenUnderline: {
    color: "#5DB075",
    textDecorationLine: "underline",
    fontSize: 16,
    fontWeight: "bold",
  },
});
