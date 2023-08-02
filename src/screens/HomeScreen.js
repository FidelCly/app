import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

export default function HomeScreen(props) {
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
    } catch (error) {}
  };

  return (
    <View style={styles.container__homescreen}>
      <View>
        <Image
          source={require("../assets/logo-removebg.png")}
          style={[styles.logo]}
        />
      </View>

      <View style={[styles.row__login]}>
        <View style={[styles.row__texte]}>
          <Text style={styles.textStyle}> Se connecter ou s'inscrire </Text>
        </View>
        <View style={[styles.row__button]}>
          <View style={[styles.container__btn]}>
            <Pressable
              title="Se connecter"
              type="solid"
              style={[styles.btn__homeScreen]}
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text style={[styles.btn__texte]}>Se&nbsp;connecter</Text>
            </Pressable>
          </View>
          <View style={[styles.container__btn]}>
            <Pressable
              title="Créer un compte"
              type="solid"
              style={[styles.btn__homeScreen]}
              onPress={() => props.navigation.navigate("Register")}
            >
              <Text style={[styles.btn__texte]}>S'inscrire</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container__homescreen: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    flex: 1,
    padding: 10,
    textAlign: "center",
    width: "100%",
  },
  logo: {
    width: 200,
    height: 150,
    marginTop: height * 0.15,
  },
  row__login: {
    width: "100%",
    position: "absolute",
    bottom: "20%",
  },
  textStyle: {
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  row__texte: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  row__button: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  container__btn: {
    margin: 5,
  },
  btn__homeScreen: {
    width: width * 0.45,
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 1,
  },
  btn__texte: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
