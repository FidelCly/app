import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Text, Pressable } from "react-native";
import DeckSwiper from "react-native-deck-swiper";
import { useSelector } from "react-redux";

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
        <Text style={styles.cardText}>{card?.shopId}</Text>
        <Text style={styles.companyNameText}>{card?.shop?.companyName}</Text>
      </View>
    </Pressable>
  );
};

const CardScreen = (props) => {
  const infoUserWallet = useSelector((state) => state.cards.cards);
  // const user = useSelector((state) => state.users.currentUser);
  const cardLoader = useSelector((state) => state.cards.cardLoader);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.warn("🚀 ~ infoUserWallet (user cards):", infoUserWallet);
  }, [infoUserWallet]);

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
    return 2; // infoUserWallet.length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {cardLoader ? (
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
  card: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    borderColor: "#E8E8E8",
    borderRadius: 10,
    borderWidth: 2,
    height: 200,
    justifyContent: "center",
    width: 300,
  },
  cardText: {
    fontSize: 20,
  },

  companyNameText: {
    bottom: 0,
    color: "gray",
    fontSize: 16,
    position: "absolute",
    right: 10,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  empty: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#E8E8E8",
    borderRadius: 10,
    borderWidth: 2,
    flex: 1,
    height: 400,
    justifyContent: "center",
    width: 300,
  },
  emptyText: {
    fontSize: 20,
  },
  onLoading: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
});

export default CardScreen;
