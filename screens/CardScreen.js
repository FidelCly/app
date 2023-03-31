import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Text, Pressable } from "react-native";
import DeckSwiper from "react-native-deck-swiper";

const API_URL = process.env.API_URL;

const renderCard = (props, card) => {
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

const CardScreen = (props) => {
  const url = `${API_URL}/user/1`;
  const [infoUserWallet, setInfoUserWallet] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setInfoUserWallet(json.cards);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const onSwiped = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const renderEmpty = () => {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No more cards</Text>
      </View>
    );
  };

  const getStackSize = () => {
    return infoUserWallet.length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {isLoading ? (
          <View style={styles.onLoading}>
            <Text>Chargement de vos cartes de fidélité...</Text>
          </View>
        ) : (
          <View>
            <DeckSwiper
              cards={infoUserWallet}
              cardIndex={currentIndex}
              renderCard={(card) => renderCard(props, card)}
              renderEmpty={renderEmpty}
              onSwiped={onSwiped}
              infinite
              stackSize={getStackSize()}
              backgroundColor={"red"}
            />
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
