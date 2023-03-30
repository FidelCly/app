import React, { useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import Swiper from "react-native-swiper";

import Card from "../components/Card";
import { getCards } from "../store/reducers/card.reducer";
import { useSelector, useDispatch } from "react-redux";
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";

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
    <Pressable
      title="Go info"
      type="solid"
      onPress={() => {
        props.navigation.navigate("InfoCard", {
          screen: "CardScreenInfo",
          card,
        });
      }}
    >
      <View style={styles.card}>
        <Text style={styles.cardText}>{card.shopId}</Text>
        <Text style={styles.companyNameText}>{card.shop.companyName}</Text>
      </View>
    </Pressable>
  );
};

const CardScreen = () => {
  const userId = 1;
  const cards = useSelector((state) => state.cards.cards);
  // const currentCard = useSelector((state) => state.cards.currentCard);
  const cardLoader = useSelector((state) => state.cards.cardLoader);
  // const cardError = useSelector((state) => state.cards.cardError);
  const dispatch = useDispatch();

  const soldeTampons = 3;
  const totalTampons = 10;

  useEffect(() => {
    fetchWallet(userId);
  }, []);

  const fetchWallet = (userId) => {
    dispatch(getCards(userId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carouselContainer}>
        {cardLoader ? (
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
              {cards.map((item, index) => (
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

  card: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "#5DB075",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: 300,
  },
  cardText: {
    fontSize: 20,
  },
  empty: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: 400,
    width: 300,
  },
  emptyText: {
    fontSize: 20,
  },
  companyNameText: {
    fontSize: 16,
    color: "gray",
    position: "absolute",
    bottom: 0,
    right: 10,
  },
});

export default CardScreen;
