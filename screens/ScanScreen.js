/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";

import defaultServer from "../config/global.js";

export default function ScanScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [shopIdScan, setShopIdScan] = useState(
    "Scanner le QR code de votre commerçant pour l'ajouter dans votre wallet"
  );
  const idUser = 1;
  const urlShop = "https://betea.fr/";
  const urlPostCard = defaultServer + "/wallet/";
  const currentDate = new Date();
  const endAtDate = new Date();

  const urlGetNameShop = defaultServer + "/shops/" + shopIdScan;
  const [nameShop, setNameShop] = useState("");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setShopIdScan(data);
    console.log(data);
    console.log(currentDate);
    console.log(endAtDate);
  };

  const getNameShop = (data) => {
    fetch(urlGetNameShop)
      .then((response) => response.json())
      .then((json) => setNameShop(json.companyName));
  };
  getNameShop();

  const handleClick = () => {
    fetch(urlPostCard, {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: urlShop,
        shopId: shopIdScan,
        userId: idUser,
        startAt: currentDate,
        endAt: endAtDate,
      }),
    });
  };

  if (hasPermission === null) {
    return <Text>Demande d'autorisation de la caméra</Text>;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorMsg}>
          L'application nécessite une autorisation pour accéder à la caméra
        </Text>
        <Pressable
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        >
          <Text style={styles.buttonAllowCamera}>Autoriser la caméra</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? false : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.maintext}>{nameShop}</Text>
      {scanned && (
        <View>
          <Pressable
            style={styles.buttonTapAgain}
            onPress={() => setScanned(false)}
          >
            <Text style={{ color: "white", fontSize: 18 }}>
              Scanner à nouveau
            </Text>
          </Pressable>
          <Pressable
            style={styles.addWallet}
            onPress={() =>
              props.navigation.navigate(
                "BottomNavigator",
                {
                  screen: "Cartes Fid",
                },
                handleClick()
              )
            }
          >
            <Text style={{ color: "white", fontSize: 18 }}>
              Ajouter aux Cartes
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5DB075",
    alignItems: "center",
    justifyContent: "center",
  },

  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "#5DB075",
  },
  maintext: {
    fontSize: 20,
    textAlign: "center",
    paddingTop: 30,
    margin: 10,
    color: "#fff",
  },
  errorMsg: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    padding: 30,
  },
  buttonTapAgain: {
    backgroundColor: "#E5B824",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 20,
    marginTop: 20,
  },
  addWallet: {
    backgroundColor: "#E5B824",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonAllowCamera: {
    backgroundColor: "#E5B824",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 20,
    marginTop: 20,
    color: "#fff",
    fontSize: 16,
  },
});
