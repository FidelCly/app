import React, { useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView, Text, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "../store/reducers/user.reducer";
import { cardsActions } from "../store/reducers/card.reducer";
import { logout } from "../services/auth-service";

const ProfilScreen = (props) => {
  const user = useSelector((state) => state.users.currentUser);
  const cards = useSelector((state) => state.cards.cards);
  const userLoader = useSelector((state) => state.users.userLoader);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserFromStore();
  }, []);

  const fetchUserFromStore = (userId) => {
    dispatch(getUser(userId));

    if (user) {
      dispatch(cardsActions["cards/setCardsrr"](user.cards));
    }
  };

  const getUserFromStore = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      if (value !== null) {
        fetchUserFromStore(value);
      }
    } catch (err) {
      // Implement visual error handling
      console.log("🚀 ~ ProfilScreen ~ getUserIdFromStorage ~ err:", err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {userLoader ? (
          <View>
            <Text>Chargement ...</Text>
          </View>
        ) : user && user !== null ? (
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                padding: 20,
                marginTop: 30,
              }}
            >
              <Ionicons name="person-sharp" size={24} color="black" />
              {user.username}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.textStyle}>
              Erreur lors de la récuperation des données
            </Text>
          </View>
        )}
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {user && user !== null ? (
            <View style={styles.container}>
              <Text style={styles.textStyle}>
                Présentez votre QR code unique à votre commerçant pour profiter
                du programme de fidélité
              </Text>
              <QRCode
                value={user.uuid}
                size={180}
                color="black"
                backgroundColor="white"
                logoSize={30}
                logoMargin={2}
                logoBorderRadius={15}
              />
            </View>
          ) : (
            <View>
              <Text>Chargement ...</Text>
            </View>
          )}

          {
            <Pressable
              style={{
                backgroundColor: "#f15454",
                padding: 15,
                borderRadius: 10,
                marginBottom: 50,
                display: "flex", // bug sur android, ne pas activer
              }}
              onPress={async () => {
                try {
                  const result = await logout();
                  console.warn("🚀 ~ onPress={ ~ result:", result);
                  if (result) {
                    props.navigation.navigate("Login");
                  }
                } catch (error) {
                  console.log("🚀 ~ onPress={ ~ error:", error);
                }
              }}
            >
              <Text style={{ color: "white" }}>Se déconnecter</Text>
            </Pressable>
          }
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfilScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    padding: 10,
    textAlign: "center",
  },
  textStyle: {
    margin: 10,
    textAlign: "center",
  },
});
