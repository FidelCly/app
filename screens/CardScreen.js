import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import Swiper from "react-native-swiper";

import Card from "../components/Card";

import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";

const API_URL = process.env.API_URL;

const ViewCardCheck = ({ soldeTampons, totalTampons }) => {
  const views = [];
  const viewsPerLine = 5;

  for (let i = 0; i < totalTampons; i++) {
    if (i < soldeTampons) {
      views.push(
        <View
          key={i}
          style={{
            backgroundColor: "#e67e22",
            width: 50,
            height: 50,
            margin: 2,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons
            name="check-decagram"
            size={40}
            color="#424242"
          />
        </View>
      );
    } else {
      views.push(
        <View
          key={i}
          style={{
            backgroundColor: "#e67e22",
            width: 50,
            height: 50,
            margin: 2,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      );
    }

    if ((i + 1) % viewsPerLine === 0 && i !== totalTampons - 1) {
      views.push(
        <View key={`line-${i}`} style={{ width: "100%", height: 2 }} />
      );
    }
  }

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
      }}
    >
      {views}
    </View>
  );
};

const CardScreen = () => {
  const url = `${API_URL}/users/1/wallet/`;
  const [infoUserWallet, setInfoUserWallet] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const soldeTampons = 3;
  const totalTampons = 10;

  const heightCard =
    totalTampons <= 10
      ? 200
      : totalTampons > 10 && totalTampons <= 15
      ? 250
      : 300;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setInfoUserWallet(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carouselContainer}>
        {isLoading ? (
          <View style={styles.onLoading}>
            <Text>Chargement de vos cartes de fidélité...</Text>
          </View>
        ) : (
          <View>
            {/* HEADER  */}
            <View style={styles.header}>
              <Text style={styles.textHeader}>Mes cartes favorites</Text>
            </View>
            {/* FIN HEADER  */}
            <Swiper showsPagination={false} loop={false} autoplay={false}>
              {infoUserWallet.map((item, index) => (
                <Card key={index}>
                  {/* INFORMATIONS SHOP  */}
                  <View style={styles.headerCard}>
                    <Text style={styles.titleNameShop}>
                      {item.shop.companyName}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      {item.shop.activity === "Restauration" ? (
                        <MaterialCommunityIcons
                          name={"food-fork-drink"}
                          size={15}
                          color="black"
                        />
                      ) : item.shop.activity === "Supply" ? (
                        <AntDesign
                          name={"shoppingcart"}
                          size={15}
                          color="black"
                        />
                      ) : item.shop.activity === "Entertainment" ? (
                        <Ionicons
                          name={"game-controller"}
                          size={15}
                          color="black"
                        />
                      ) : item.shop.activity === "Store" ? (
                        <Fontisto
                          name={"shopping-store"}
                          size={15}
                          color="black"
                        />
                      ) : item.shop.activity === "Service" ? (
                        <MaterialIcons
                          name={"miscellaneous-services"}
                          size={15}
                          color="black"
                        />
                      ) : null}
                      <Text style={{ marginLeft: 10 }}>
                        {item.shop.activity === "Restauration" ? (
                          <Text>Restauration</Text>
                        ) : item.shop.activity === "Supply" ? (
                          <Text>Alimentation</Text>
                        ) : item.shop.activity === "Entertainment" ? (
                          <Text>Divertissement</Text>
                        ) : item.shop.activity === "Store" ? (
                          <Text>Magasin</Text>
                        ) : item.shop.activity === "Service" ? (
                          <Text>Service</Text>
                        ) : null}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Ionicons
                        name={"ios-location-sharp"}
                        size={15}
                        color="black"
                      />
                      <Text style={{ marginLeft: 10 }}>
                        {item.shop.address}
                      </Text>
                      <Text style={{ marginLeft: 4 }}>{item.shop.zipCode}</Text>
                      <Text style={{ marginLeft: 4 }}>Paris</Text>
                    </View>
                  </View>
                  {/* FIN INFORMATIONS SHOP  */}
                  {/* CARD   */}

                  <View
                    style={{
                      backgroundColor: "#5DB075",
                      height: heightCard,
                      alignSelf: "center",
                      width: "100%",
                      borderRadius: 10,
                      padding: 20,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 10,
                      elevation: 5,
                      marginBottom: 10,
                      marginTop: 20,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingBottom: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        {item.shop.companyName}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.textCard}>
                          {soldeTampons}/{totalTampons}
                        </Text>
                        <Text style={styles.textCard}> tampons</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexWrap: "wrap",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        maxWidth: "100%",
                      }}
                    >
                      <ViewCardCheck
                        key={index}
                        soldeTampons={soldeTampons}
                        totalTampons={totalTampons}
                        style={{ width: 50 }}
                      />
                    </View>
                  </View>
                  {/* FIN CARD   */}

                  <View style={styles.footerCard}>
                    <View>
                      <Text style={styles.footerText}>
                        Intitulé de la promotion
                      </Text>
                    </View>
                  </View>
                </Card>
              ))}
            </Swiper>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  onLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  carouselContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 60,
  },
  header: {
    width: "90%",
    height: 50,
    alignSelf: "center",
    // backgroundColor: "purple",
  },
  textHeader: {
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#e67e22",
  },
  headerCard: {
    height: 80,
    // backgroundColor: "cyan",
  },
  titleNameShop: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  mainCard: {
    backgroundColor: "#5DB075",
    height: 200,
    alignSelf: "center",
    width: "100%",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 10,
    marginTop: 20,
  },
  textCard: { fontSize: 18, fontWeight: "bold", color: "white" },
  footerCard: {
    maxheight: 200,
    width: "100%",
    padding: 20,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e67e22",
  },
  sectionTitle: {
    fontSize: 20,
  },
  rowTampon: {
    flexDirection: "row",
    alignSelf: "center",
  },
  tampon: {
    backgroundColor: "#e67e22",
    width: 50,
    height: 50,
    margin: 2,
    borderRadius: 50,
  },
});

export default CardScreen;
