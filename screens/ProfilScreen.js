import React, { useState, useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";

const ProfilScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [emailUserAPI, setEmailUserAPI] = useState([]);

  const urlAPI = "http://20.74.119.86:3000/users/1";

  useEffect(() => {
    fetch(urlAPI)
      .then((response) => response.json())
      .then((json) => setEmailUserAPI(json.email))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {isLoading ? (
          <Text>Loading ...</Text>
        ) : (
          <View>
            <Text>{emailUserAPI}</Text>
          </View>
        )}
        <Text style={styles.textStyle}>
          Présentez votre QR code unique à votre commerçant pour profiter du
          programme de fidélité
        </Text>
        <QRCode
          value={emailUserAPI}
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
