import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const API_URL = process.env.API_URL;

export default function CardScreenInfo({ route, navigation }) {
  const { card } = route.params;
  const { balances } = card;
  const shopId = card.shop.id;
  const urlGetShopPromotion = `${API_URL}/shop/${shopId}/promotions`;
  const [promotionShop, setPromotionShop] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(urlGetShopPromotion)
      .then((res) => res.json())
      .then((json) => setPromotionShop(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {/* HEADER  */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("ShopID :", shopId);
            console.log("urlGetShopPromotion :", urlGetShopPromotion);
            console.log("promotionShop :", promotionShop);
          }}
        >
          <Text style={styles.optionsButtonText}>Options</Text>
        </TouchableOpacity>
      </View>
      {/* FIN HEADER  */}
      {/* INFO SHOP  */}
      <View style={styles.blocInfoShop}>
        <View>
          <Text style={styles.companyNameText}>{card.shop.companyName}</Text>
        </View>
        <View style={styles.addressContainer}>
          <Ionicons name="location-sharp" size={28} color="black" />
          <Text style={styles.addressText}>{card.shop.address}</Text>
        </View>
        <View style={styles.activityContainer}>
          <Text style={styles.activityText}>{card.shop.activity}</Text>
        </View>
      </View>
      {/* INFO SHOP  */}
      {/* INFO PROMOTIONS  */}
      <View style={styles.blocInfoShop}>
        <View>
          <Text style={styles.titleText}>PROMOTIONS</Text>
        </View>
        {isLoading ? (
          <Text style={styles.textStyle}>Chargement des données...</Text>
        ) : (
          <ScrollView>
            {promotionShop.map((promotion) => {
              if (promotion.isActive) {
                return (
                  <View style={styles.promotionsContainer} key={promotion.id}>
                    <View style={styles.promotionsTextContainer}>
                      <Text
                        style={[
                          styles.promotionsText,
                          styles.promotionsTextLeft,
                        ]}
                      >
                        {promotion.description}
                      </Text>
                      <Text
                        style={[
                          styles.promotionsText,
                          styles.promotionsTextRight,
                        ]}
                      >
                        <Text style={styles.soldeTamponsText}>
                          {balances.find((b) => b.promotionId === promotion.id)
                            ?.counter ?? 0}
                        </Text>
                        / {promotion.checkoutLimit}
                      </Text>
                    </View>
                    <Text style={styles.dateText}>
                      Du{" "}
                      {new Date(promotion.startAt).toLocaleDateString("fr-FR")}{" "}
                      au {new Date(promotion.endAt).toLocaleDateString("fr-FR")}
                    </Text>
                  </View>
                );
              } else {
                return null; // Si la promotion n'est pas active, on ne l'affiche pas
              }
            })}
          </ScrollView>
        )}
      </View>
      {/* INFO SHOP  */}
    </View>
  );
}

const styles = StyleSheet.create({
  activityContainer: {
    marginTop: 10,
  },
  activityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addressContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  addressText: {
    fontSize: 16,
    marginLeft: 10,
    textAlign: "center",
  },
  backButton: {
    alignItems: "center",
    flexDirection: "row",
  },
  backButtonText: {
    color: "green",
    fontSize: 16,
    marginLeft: 5,
  },
  blocInfoShop: {
    marginTop: 100,
  },
  companyNameText: {
    color: "orange",
    fontSize: 32,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 10,
  },
  dateText: {
    color: "#999",
    fontSize: 14,
    marginTop: 5,
    textAlign: "left",
  },

  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: "absolute",
    right: 0,
    top: 40,
  },
  optionsButtonText: {
    color: "green",
    fontSize: 16,
    marginLeft: 5,
  },
  promotionsContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    margin: 10,
    marginTop: 20,
    padding: 10,
  },
  promotionsText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
  promotionsTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  promotionsTextLeft: {
    flex: 0.7,
  },
  promotionsTextRight: {
    color: "#666",
    flex: 0.3,
    textAlign: "right",
  },
  soldeTamponsText: {
    color: "green",
    fontSize: 22,
    fontWeight: "bold",
  },
  textStyle: {
    margin: 10,
    textAlign: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
