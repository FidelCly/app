import React, { useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "../store/reducers/user.reducer";

const ProfilScreen = () => {
	let userId = null;
	const user = useSelector((state) => state.users.currentUser);
	const userLoader = useSelector((state) => state.users.userLoader);
	const dispatch = useDispatch();

	useEffect(() => {
		getUserFromStore();
	}, []);

	const fetchUserFromStore = (userId) => {
		dispatch(getUser(userId));
	};

	const getUserFromStore = async () => {
		try {
			const value = await AsyncStorage.getItem("userId");
			if (value !== null) {
				console.log("🚀 ~ getUserIdFromStorage ~ value:", value);
				userId = Number(value);
				fetchUserFromStore(userId);
			}
		} catch (e) {
			console.log("🚀 ~ ProfilScreen ~ getUserIdFromStorage ~ e:", e);
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
            <Text style={{ fontSize: 20, fontWeight: "bold", padding: 20 }}>
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {user && user !== null ? (
            <View style={styles.container}>
              <Text style={styles.textStyle}>
                Présentez votre QR code unique à votre commerçant pour profiter
                du programme de fidélité
              </Text>
              <QRCode
                value={user.id.toString()}
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  textStyle: {
    textAlign: "center",
    margin: 10,
  },
});
