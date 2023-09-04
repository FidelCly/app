import { LogBox } from "react-native";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getShopPromotions } from "../services";
import { getCards, setCurrentCard } from "../store/reducers/card.reducer";
import { useSelector, useDispatch } from "react-redux";
import { addCardToWallet } from "../services";
import CustomButton from "../components/Button";
import { Snackbar, ActivityIndicator, MD2Colors } from "react-native-paper";

const { width: screenWidth } = Dimensions.get("window");
const ctaWidth = screenWidth * 0.8;

export default function InfoShopToAddScreen({ route }) {
  const props = route?.params?.props;
  const shop = route.params.shop;
  const pictureUrl = shop.pictureUrl;
  infoUserWallet = useSelector((state) => state.cards.cards);
  const currentCard = useSelector((state) => state.cards.currentCard);
  const [snackBarVisible, setSnackbarVisible] = useState(false);
  const [snackBarMessage, setSnackbarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shopPromotions, setShopPromotions] = useState([]);
  const [existedCard, setExistedCard] = useState(null);

  const dispatch = useDispatch();

  // ignore all log notifications:
  LogBox.ignoreAllLogs(); // Ignore all log notifications
<<<<<<< Updated upstream

  useEffect(() => {
    // get all promotion from shop
    fetchShopPromotions(shop.id);
    checkIfCardIsInWallet(shop.id);
  }, [props]);

  /**
   * Check if the card is already in the wallet
   */
  checkIfCardIsInWallet = (shopId) => {
    const card = infoUserWallet.find((card) => card.shop.id === shopId);
    if (card) {
      dispatch(setCurrentCard(card.id));
      setExistedCard(card);
      return true;
    }
    return false;
  };

  function formatAddress(address) {
		const parts = address.split(', ');
		if (parts.length >= 2) {
		const [street, cityZip] = parts;
		return `${street}\n${cityZip}`;
		}
		return address;
	}

//Récupérer l'initiale du shop pour l'afficher sur la carte si pas d'image
=======

  useEffect(() => {
    // get all promotion from shop
    fetchShopPromotions(shop.id);
    checkIfCardIsInWallet(shop.id);
  }, [props, existedCard]);

  /**
   * Check if the card is already in the wallet
   */
  checkIfCardIsInWallet = (shopId) => {
    const card = infoUserWallet.find((card) => card.shop.id === shopId);
    if (card) {
      dispatch(setCurrentCard(card.id));
      setExistedCard(card);
      return true;
    }
    return false;
  };

  function formatAddress(address) {
    const parts = address.split(", ");
    if (parts.length >= 2) {
      const [street, cityZip] = parts;
      return `${street}\n${cityZip}`;
    }
    return address;
  }

  //Récupérer l'initiale du shop pour l'afficher sur la carte si pas d'image
>>>>>>> Stashed changes
  const getInitials = (companyName) => {
    if (!companyName) return "";
    const words = companyName.split(" ");
    return words
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  /**
   * fetchShopPromotions
   * @param {*} shopId
   */
  const fetchShopPromotions = async (shopId) => {
    try {
      setIsLoading(true);
      const promotionArrays = await getShopPromotions(shopId);
      setShopPromotions(
        promotionArrays.filter((promotion) => promotion.isActive === true)
      );
      setIsLoading(false);
    } catch (err) {
      console.log("🚀 ~ fetchShopPromotions ~ err:", err);
      setIsLoading(false);
      setSnackbarVisible(true);
      setSnackbarMessage("Une erreur est survenue.");
    }
  };

  /**
   * Add card to wallet
   */
  const handleClick = async () => {
    try {
      setIsLoading(true);

      await addCardToWallet(shop.id);
      dispatch(getCards());
<<<<<<< Updated upstream
      const card = infoUserWallet.find((card) => card.shop.id === shop.id);
=======

      const card = infoUserWallet.find((card) => card.shop.id === shop.id);
      checkIfCardIsInWallet(shop.id);

>>>>>>> Stashed changes
      if (card) {
        dispatch(setCurrentCard(card.id));
      }
      setIsLoading(false);
      setSnackbarVisible(true);
      setSnackbarMessage("Carte ajoutée au wallet !");

<<<<<<< Updated upstream
=======
      setTimeout(() => {
        props.navigation.navigate("BottomNavigator", {
          screen: route.params.previousScreen,
        });
      }, 1000);

>>>>>>> Stashed changes
      // props.navigation.navigate("InfoCard", {
      // 	screen: "CardScreenInfo"
      // 	// shop
      // });
    } catch (error) {
      console.log("🚀 ~ handleClick ~ error:", error);
      setIsLoading(false);
      setSnackbarVisible(true);
      setSnackbarMessage("Une erreur est survenue.");
    }
  };

  return (
    <View style={styles.container}>
<<<<<<< Updated upstream



      <View style={styles.header}>
				{/* Section Bouton Retour */}
				<View style={styles.goBackButton}>
					<TouchableOpacity style={styles.goBackButton} onPress={() =>
            props.navigation.navigate("BottomNavigator", {
              screen: route.params.previousScreen,
            })
          }>
						<Text style={styles.backButtonText}>Retour</Text>
					</TouchableOpacity>
				</View>
				{/* Section InfoShop */}
				<View style={styles.infoShop}>
					<View style={styles.leftColumn}>
						<View style={styles.shopImageContainer}>
							{pictureUrl && pictureUrl !== "" ? (
=======
      <View style={styles.header}>
        {/* Section Bouton Retour */}
        <View style={styles.goBackButton}>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() =>
              props.navigation.navigate("BottomNavigator", {
                screen: route.params.previousScreen,
              })
            }
          >
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
        {/* Section InfoShop */}
        <View style={styles.infoShop}>
          <View style={styles.leftColumn}>
            <View style={styles.shopImageContainer}>
              {pictureUrl && pictureUrl !== "" ? (
>>>>>>> Stashed changes
                <Image style={styles.shopImage} source={{ uri: pictureUrl }} />
              ) : (
                <Text style={styles.cardText}>
                  {getInitials(shop.companyName)}
                </Text>
              )}
<<<<<<< Updated upstream
						</View>
					</View>
					<View style={styles.rightColumn}>
							<Text style={styles.companyNameText}>{shop?.companyName}</Text>
						<View style={styles.activityContainer}>
							<Text style={styles.activityText}>{shop?.activity}</Text>
						</View>
						
            <View style={styles.addressContainer}>
              <Ionicons name="location-sharp" size={20} color="red" />
              <Text style={styles.addressText}>{formatAddress(shop?.address)}</Text>
            </View>
						
					</View>
				</View>
			</View>

      <ScrollView>
        {/* Section Description */}
				{shop.description && shop.description !== "" ? (
					<View style={styles.description}>
						<Text style={styles.descriptionTitle}>Un petit mot de votre commerçant</Text>
						<Text style={styles.descriptionText}>{shop.description}</Text>
						<Text style={styles.signature}>{shop.companyName?.toUpperCase()}</Text>
					</View>
				) : null}




        
        {/* Promotions en cours */}
      <View style={styles.promotions}>
        <ScrollView style={styles.promotions}>
          <Text style={styles.promotionsTitle}>Promotions en cours</Text>
          {/* Liste des promotions */}
          {shopPromotions.map((promotion) => (
            <View style={styles.promotionsContainer} key={promotion.id}>


              <View style={styles.alignColumn}>
                <View>
                  <View style={styles.firstRow}>
                    <Text style={styles.promoCompany}>
                      {promotion.name}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.promoDescription}>
                        {promotion.description}
                    </Text>
                  </View>
                </View>
                <View style={styles.secondColumn}>
                  <View >
                    <Text style={styles.promoDate}>
                      Du {new Date(promotion.startAt).toLocaleDateString("fr-FR")} {"\n"}au{" "}
                      {new Date(promotion.endAt).toLocaleDateString("fr-FR")}
                    </Text>
                  </View>
                </View>
              </View>
              
            </View>
          ))}
        </ScrollView>
      </View>
      </ScrollView>



     






      









  

    
=======
            </View>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.companyNameText}>{shop?.companyName}</Text>
            <View style={styles.activityContainer}>
              <Text style={styles.activityText}>{shop?.activity}</Text>
            </View>

            <View style={styles.addressContainer}>
              <Ionicons name="location-sharp" size={20} color="red" />
              <Text style={styles.addressText}>
                {formatAddress(shop?.address)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView>
        {/* Section Description */}
        {shop.description && shop.description !== "" ? (
          <View style={styles.description}>
            <Text style={styles.descriptionTitle}>
              Un petit mot de votre commerçant
            </Text>
            <Text style={styles.descriptionText}>{shop.description}</Text>
            <Text style={styles.signature}>
              {shop.companyName?.toUpperCase()}
            </Text>
          </View>
        ) : null}

        {/* Promotions en cours */}
        <View style={styles.promotions}>
          <ScrollView style={styles.promotions}>
            <Text style={styles.promotionsTitle}>Promotions en cours</Text>
            {/* Liste des promotions */}
            {shopPromotions.map((promotion) => (
              <View style={styles.promotionsContainer} key={promotion.id}>
                <View style={styles.alignColumn}>
                  <View>
                    <View style={styles.firstRow}>
                      <Text style={styles.promoCompany}>{promotion.name}</Text>
                    </View>
                    <View>
                      <Text style={styles.promoDescription}>
                        {promotion.description}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.secondColumn}>
                    <View>
                      <Text style={styles.promoDate}>
                        Du{" "}
                        {new Date(promotion.startAt).toLocaleDateString(
                          "fr-FR"
                        )}{" "}
                        {"\n"}au{" "}
                        {new Date(promotion.endAt).toLocaleDateString("fr-FR")}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

>>>>>>> Stashed changes
      {/* CTA ajouter (10%) */}

      <View style={styles.ctaContainer}>
        {!existedCard ? (
          <TouchableOpacity
            title="Ajouter à mon wallet"
            onPress={() => {
              handleClick();
            }}
          >
            <CustomButton title="Ajouter à mon wallet" />
          </TouchableOpacity>
        ) : (
<<<<<<< Updated upstream
          // : (
          // 	<CustomButton title="Carte déjà dans le wallet" />
          // )
=======
>>>>>>> Stashed changes
          <TouchableOpacity
            title="Voir ma carte"
            onPress={async () => {
              const card = existedCard;

              props.navigation.navigate("InfoCard", {
                screen: "CardScreenInfo",
                card,
              });
            }}
          >
            <CustomButton title="Voir ma carte" />
          </TouchableOpacity>
        )}
      </View>
      <ActivityIndicator
        size={"large"}
        animating={isLoading}
        color={MD2Colors.green200}
      />

      <Snackbar
        visible={snackBarVisible}
        onDismiss={() => {
          setTimeout(() => {
            setSnackbarVisible(false);
          }, 3000);
        }}
        duration={2500}
        action={{
          label: "OK",
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}
      >
        {snackBarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< Updated upstream
    flexDirection: 'column',
    backgroundColor: "#F5F5F5",
  },
  // Section Header
	header: {
		paddingTop: 20,
		paddingHorizontal: 15,
		position: 'sticky',
		top: 0,
		backgroundColor: "#5DB075",
		zIndex: 1,
	},
	goBackButton: {
		left: 10,
		paddingTop: 10,
	},
	backButtonText: {
		color: "#424242",
		fontSize: 16,
		textDecorationLine: "underline"
	},
	// Section Header Infoshop
	infoShop: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
	},
	leftColumn: {
		flex: 0.35,
		backgroundColor: "#5DB075",
		justifyContent: "center",
		alignItems: "center"
	},
	rightColumn: {
		flex: 0.65,
		backgroundColor: "#5DB075",
		justifyContent: "center",
	},
	shopImageContainer: {
		width: 70,
		height: 70,
		borderRadius: 35,
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
		display: "flex"
	},
	shopImage: {
		width: "100%",
		height: "100%"
	},
	companyNameText: {
		fontSize: 20,
		fontWeight: "bold",
		textTransform: "uppercase",
		color: "#FECF33",
		marginBottom: 10
	},
	activityContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10
	},
	activityText: {
		fontSize: 14,
		fontWeight: "bold"
	},
	addressContainer: {
		flexDirection: "row",
		alignItems: "center"
	},
	addressText: {
		fontSize: 12,
		marginLeft: 5
	},
	initialsContainer: {
		width: 70,
		height: 70,
		borderRadius: 35,
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
		display: "flex"
	},
	cardText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#424242",
		textAlign: "center"
	},
=======
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
  },
  // Section Header
  header: {
    paddingTop: 20,
    paddingHorizontal: 15,
    position: "sticky",
    top: 0,
    backgroundColor: "#5DB075",
    zIndex: 1,
  },
  goBackButton: {
    left: 10,
    paddingTop: 10,
  },
  backButtonText: {
    color: "#424242",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  // Section Header Infoshop
  infoShop: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  leftColumn: {
    flex: 0.35,
    backgroundColor: "#5DB075",
    justifyContent: "center",
    alignItems: "center",
  },
  rightColumn: {
    flex: 0.65,
    backgroundColor: "#5DB075",
    justifyContent: "center",
  },
  shopImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    display: "flex",
  },
  shopImage: {
    width: "100%",
    height: "100%",
  },
  companyNameText: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#FECF33",
    marginBottom: 10,
  },
  activityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  activityText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressText: {
    fontSize: 12,
    marginLeft: 5,
  },
  initialsContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    display: "flex",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#424242",
    textAlign: "center",
  },
>>>>>>> Stashed changes
  // Description styles
  description: {
    backgroundColor: "#fff",
    padding: 20,
  },
  descriptionTitle: {
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  descriptionText: {
    fontStyle: "italic",
    textAlign: "left",
    marginBottom: 20,
    fontSize: 12,
  },
  signature: {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 12,
  },
  // Description styles

  // Promotions styles
  promotions: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  promotionsTitle: {
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  promotionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 5,
    marginVertical: 1,
    borderColor: "#CAD3C8",
<<<<<<< Updated upstream
		borderWidth: 1,
=======
    borderWidth: 1,
>>>>>>> Stashed changes
  },
  alignColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  firstRow: {
    flexDirection: "row",
  },
  secondColumn: {
    justifyContent: "center",
  },
  promoCompany: {
    color: "#424242",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  promoDate: {
    fontSize: 9,
    flex: 1,
    textAlign: "right",
  },
  promoDescription: {
    fontSize: 12,
    color: "darkgray",
    marginTop: 5,
  },
  // Promotions styles
  ctaContainer: {
<<<<<<< Updated upstream
    position: 'absolute',
    bottom: 0,
    width: '100%',  
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F5F5F5",  
=======
    position: "absolute",
    bottom: 15,
    width: "100%",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F5F5F5",
>>>>>>> Stashed changes
  },
});
