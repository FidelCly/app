import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import Carousel from "react-native-snap-carousel";

import { API_URL } from "@env";
import Card from "../components/Card";

const CardScreen = () => {
  const url = `${API_URL}/users/1/wallet/`;
  const [infoUserWallet, setInfoUserWallet] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setInfoUserWallet(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const _renderItem = ({ item, index }) => {
    return (
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>{item.shop.companyName}</Text>
        <Text style={styles.sectionTitle}>{item.shop.activity}</Text>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carouselContainer}>
        {isLoading ? (
          <Text>Chargement de vos cartes de fidélité...</Text>
        ) : (
          <Carousel
            data={infoUserWallet}
            renderItem={_renderItem}
            sliderWidth={300}
            itemWidth={300}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
  },
  carouselContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 80,
    marginLeft: 30,
  },
  card: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 32,
  },
});

export default CardScreen;
