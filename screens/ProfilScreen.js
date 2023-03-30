import React, { useState, useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfilScreen = () => {
  const API_URL = process.env.API_URL;
  const [isLoading, setLoading] = useState(true);
  const [emailUserAPI, setEmailUserAPI] = useState([]);

  const idUser = "1";
  const urlAPIUsers = API_URL + "/user/" + idUser;

  useEffect(() => {
    fetch(urlAPIUsers)
      .then((response) => response.json())
      .then((json) => setEmailUserAPI(json.username))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {isLoading ? (
          <Text>Chargement ...</Text>
        ) : (
          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold", padding: 20 }}>
              <Ionicons name="person-sharp" size={24} color="black" />
              {emailUserAPI}
            </Text>
          </View>
        )}
        <Text style={styles.textStyle}>
          Présentez votre QR code unique à votre commerçant pour profiter du
          programme de fidélité
        </Text>
        <QRCode
          value={idUser}
          size={180}
          color="black"
          backgroundColor="white"
          logoSize={30}
          logoMargin={2}
          logoBorderRadius={15}
        />
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
