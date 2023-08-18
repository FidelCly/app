import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getCards } from "../store/reducers/card.reducer";
import { Ionicons } from "@expo/vector-icons";
import { Snackbar, ActivityIndicator, MD2Colors } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { width: screenWidth } = Dimensions.get("window");
const cardWidth = screenWidth * 0.3;
const cardHeight = cardWidth * 0.56;

//Récupérer l'initiale du shop pour l'afficher sur la carte si pas d'image
const getInitials = (companyName) => {
  if (!companyName) return "";
  const words = companyName.split(" ");
  return words
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};

const renderCard = (props, card) => {
  const { pictureUrl, shopId } = card?.shop || {};
  const showImage = pictureUrl && pictureUrl.length > 0;

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
      <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
        {showImage ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: pictureUrl }} style={styles.cardImage} />
          </View>
        ) : (
          <View style={styles.initialsContainer}>
            <Text style={styles.cardText}>
              {getInitials(card?.shop?.companyName)}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const CardScreen = (props) => {
  // Recupère les cartes de l'utilisateur dans le store)
  let [infoUserWalletFiltered, setInfoUserWalletFiltered] = useState([]);
  let infoUserWallet = useSelector((state) => state.cards.cards);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const cardLoader = useSelector((state) => state.cards.cardLoader);
  const [shouldFetchCards, setShouldFetchCards] = useState(true); // New state

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch cards from store when shouldFetchCards is true
    if (shouldFetchCards) {
      dispatch(getCards());
      setShouldFetchCards(false); // Reset shouldFetchCards
    }
  }, [dispatch, shouldFetchCards]);

  const renderEmpty = () => {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No more cards</Text>
      </View>
    );
  };

  const renderCardItem = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        {renderCard(props, item)}
        <Text style={styles.companyNameText}>{item?.shop?.companyName}</Text>
      </View>
    );
  };

  const searchCards = (searchText) => {
    return infoUserWallet.filter((card) => {
      const cardName = card.shop?.companyName.toLowerCase();
      if (!cardName || cardName === null) return false;
      const textData = searchText.toLowerCase();
      return cardName.includes(textData);
    });
  };

  if (searchKeyWord.length > 0) {
    // filter cards based on searchKeyWord and company name
    infoUserWalletFiltered = searchCards(searchKeyWord);
  } else {
    infoUserWalletFiltered = infoUserWallet;
  }

  const keyExtractor = (item, index) => {
    return item.cardId ? item.cardId.toString() : index.toString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titreBloc}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={24}
            color="#5DB075"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une carte"
            onChangeText={(text) => {
              setSearchKeyWord(text);
            }}
            value={searchKeyWord}
          />
        </View>
        <Pressable
          style={styles.refreshIcon}
          onPress={() => {
            dispatch(getCards());
          }}
        >
          <MaterialCommunityIcons
            name="refresh-circle"
            size={24}
            color="#5DB075"
          />
        </Pressable>
      </View>
      <View style={styles.centeredContainer}>
        {cardLoader ? (
          <ActivityIndicator
            size={"large"}
            animating={cardLoader}
            color={MD2Colors.green200}
          />
        ) : (
          <View>
            <FlatList
              data={searchCards(searchKeyWord)}
              renderItem={renderCardItem}
              keyExtractor={keyExtractor}
              numColumns={3}
              contentContainerStyle={styles.listContainer}
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
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderColor: "#E6E6E6",
    margin: 3,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
  },
  cardText: {
    fontSize: 14,
    color: "#fff",
  },
  companyNameText: {
    color: "#666666",
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  cardContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    alignItems: "flex-start",
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    width: 320,
    borderColor: "#E6E6E6",
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#666666",
  },
  imageContainer: {
    width: cardWidth * 0.4,
    height: cardWidth * 0.4,
    borderRadius: (cardWidth * 0.4) / 2,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: cardWidth * 0.4,
    height: cardWidth * 0.4,
    resizeMode: "cover",
  },
  initialsContainer: {
    width: cardWidth * 0.4,
    height: cardWidth * 0.4,
    borderRadius: (cardWidth * 0.4) / 2,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5DB075",
  },

  titreBloc: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardScreen;
