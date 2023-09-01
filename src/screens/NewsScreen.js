/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
  Fontisto,
  FontAwesome,
} from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, ActivityIndicator, MD2Colors } from "react-native-paper";
import { getAllShops, getShopPromotions } from "../services";

const { height } = Dimensions.get("window");
const markerIcons = {
  Restauration: "utensils",
  Supply: "shopping-cart",
  Entertainment: "gamepad",
  Store: "grav",
  Service: "cog",
};

const NewsScreen = (props) => {
  let user = useSelector((state) => state.users.currentUser);
  let userCards = useSelector((state) => state.cards.cards);
  let allShop = useSelector((state) => state.shops.allShops);
  const cardsLoader = useSelector((state) => state.cards.cardLoader);
  const userLoader = useSelector((state) => state.users.userLoader);
  const shopLoader = useSelector((state) => state.shops.shopLoader);
  const [userPromotionsLoader, setUserPromotionsLoader] = useState([true]);
  const [userNotPromotionsLoader, setUserNotPromotionsLoader] = useState([
    true,
  ]);
  const [userPromotions, setUserPromotions] = useState([]);
  const [notUserPromotions, setNotUserPromotions] = useState([]);
  const [notUserCards, setNotUserCards] = useState([]);
  const [snackBarMessage, setSnackbarMessage] = useState("");
  const [snackBarVisible, setSnackbarVisible] = useState(false);
  const [checkOutInfo, setCheckOutInfo] = useState(null);

  const [shuffledUserPromotions, setShuffledUserPromotions] = useState([]);
  const [shuffledNotUserPromotions, setShuffledNotUserPromotions] = useState([]);

  const dispatch = useDispatch();

  // Afficher les promotions en cours de façon aléatoire
  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const regenerateUserPromotions = () => {
  const shuffled = shuffleArray(userPromotions);
  setShuffledUserPromotions(shuffled);
};

const regenerateNotUserPromotions = () => {
  const shuffled = shuffleArray(notUserPromotions);
  setShuffledNotUserPromotions(shuffled);
};

  useEffect(() => {
    setDatas();
  }, [user, userCards, allShop]);

  /**
   * setDatas
   */
  const setDatas = async () => {
    if (user) {
      try {
        const allShop = await getAllShops();
        // if (allShop && userCards && userCards.length > 0 && allShop.length > 0) {
        const notUserCards = allShop.filter(
          (shop) => !userCards.find((card) => card.shop.id === shop.id)
        );
        setNotUserPromotions(notUserCards);
        setNotUserCards(notUserCards);

        const userPromotions = [];
        const notUserPromotions = [];

        for (let i = 0; i < userCards.length; i++) {
          const shopPromotions = await getShopPromotions(userCards[i].shop.id);
          userPromotions.push(...shopPromotions);
        }
        setUserPromotions(userPromotions.filter((promo) => promo.isActive));
        setShuffledUserPromotions(shuffleArray(userPromotions.filter((promo) => promo.isActive)));
        setUserPromotionsLoader(false);
        for (let i = 0; i < notUserCards.length; i++) {
          const shopPromotions = await getShopPromotions(notUserCards[i].id);
          notUserPromotions.push(...shopPromotions);
        }
        setNotUserPromotions(
          notUserPromotions.filter((promo) => promo.isActive)
        );
        setShuffledNotUserPromotions(shuffleArray(notUserPromotions.filter((promo) => promo.isActive)));
        setUserNotPromotionsLoader(false);

        // get user card that has balances counter equal to promotion checkoutLimit
        const checkOutInfo = userCards.find((card) => {
          const promotion = userPromotions.find(
            (promo) => promo.shopId === card.shop.id
          );
          return (
            card.balances.find(
              (balance) => balance.counter === promotion.checkoutLimit
            ) ?? null
          );
        });

        checkOutInfo && setCheckOutInfo(checkOutInfo);
        // }
      } catch (error) {
        setSnackbarMessage("Erreur lors de l'initialisation des données");
        setSnackbarVisible(true);
      }
    }
  };

  /**
   * getShopByPromotionId
   * @param {*} promotionId
   * @returns
   */
  const getShopByPromotionId = (shopId, promotionId) => {
    const shop = allShop.find(
      (shop) =>
        shop.promotions &&
        shop.promotions.find(
          (promotion) =>
            promotion.shopId === shopId && promotion.id === promotionId
        )
    );
    return shop;
  };

  /**
   * getUserCardByShopId
   * @param {*} shopId
   * @returns
   */
  const getUserCardByShopId = (shopId) => {
    const card = userCards.find((card) => card.shop.id === shopId);
    return card;
  };

  /**
   * getInitials
   * @param {*} username
   * @returns
   */
  const getInitials = (username) => {
    if (!username) return "";
    const words = username.split(" ");
    return words
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  const { height } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <View style={styles.infoUser}>
          <View style={styles.leftColumn}>
            {userLoader ? (
              <View>
                {/* <Text>Chargement ...</Text> */}
                <ActivityIndicator
                  size={"large"}
                  animating={userLoader}
                  color={MD2Colors.green200}
                />
              </View>
            ) : user ? (

              <View>
                <View>
                  <Text style={styles.textBonjour}>Bonjour {user.username}</Text>
                </View>
                <View style={styles.rowNotif}>
                  <View style={styles.iconNotif}>
                    <MaterialIcons
                      name="notifications-active"
                      size={24}
                      color="#fff"
                    />
                  </View>
                  {shopLoader ||
                  cardsLoader ||
                  shopLoader ||
                  userPromotionsLoader ||
                  userNotPromotionsLoader ? (
                    <ActivityIndicator
                      style={{ position: "relative", top: 0, left: 80 }}
                      size={"small"}
                      // animating={true}
                      animating={
                        shopLoader ||
                        cardsLoader ||
                        userLoader ||
                        userPromotionsLoader ||
                        userNotPromotionsLoader
                      }
                      color={MD2Colors.green200}
                    />
                  ) : checkOutInfo ? (
                  <View style={styles.colNotif}>
                    <Text style={styles.infoNotif}>Une de vos cartes de fidélité est complète&nbsp;!</Text>
                    <Text style={styles.infoNotif}>
                      Bénéficiez de votre promotion chez{" "}
                      <Text style={styles.boldText}>{checkOutInfo?.shop?.companyName}</Text>
                    </Text>
                  </View>
                   ) : (
                    <View style={styles.columnText}>
                      <Text style={styles.infoText}>
                        Vous n'avez pas de carte compète pour le moment
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.errorTextStyle}>
                  Erreur lors de la récuperation des données
                </Text>
              </View>
            )}
              
          </View>
          <View style={styles.rightColumn}>
            <View style={styles.initialsBubble}>
                <Text style={styles.initialText}>
                  {user ? getInitials(user.username) : ""}
                </Text>
              </View>
          </View>
        </View>
      </View>
      <ScrollView>
      {/* Section Promotion de vos commerçants  */}

        <View style={styles.sectionPromotions}>
          <View style={styles.alignColumn}>
            <Text style={styles.sectionTitle}>Les promotions de vos commerçants</Text>
            <View></View>
            <View>
              <Pressable
                style={styles.refreshIcon}
                onPress={() => {
                  regenerateUserPromotions();
                }}
              >
                <MaterialCommunityIcons
                  name="refresh-circle"
                  size={24}
                  color="#5DB075"
                />
              </Pressable>
            </View>
          </View>
          <View >
          <ScrollView>
            {cardsLoader || userPromotionsLoader ? (
              <ActivityIndicator
                size={"large"}
                animating={cardsLoader || userPromotionsLoader}
                color={MD2Colors.green200}
              />
            ) : shuffledUserPromotions.length > 0 ? (
              shuffledUserPromotions.slice(0, 3).map((promo, index) => (
                <Pressable
                  title="Go info"
                  type="solid"
                  key={index}
                  onPress={() => {
                    const card = getUserCardByShopId(promo.shopId, promo.id);
                    props.navigation.navigate("InfoCard", {
                      screen: "CardScreenInfo",
                      card,
                      props,
                      previousScreen: "NewsScreen",
                    });
                  }}
                >
                  <View key={index} style={ styles.scrollableCard}>
                    <View style={styles.alignColumn}>
                      <View>
                        <View style={styles.firstRow}>
                          <FontAwesome5
                            name={
                              markerIcons[
                                getShopByPromotionId(promo.shopId, promo.id)
                                  ?.activity
                              ]
                            }
                            size={20}
                            color="#5DB075"
                          />
                          <Text style={styles.promoCompany}>
                            {
                              getShopByPromotionId(promo.shopId, promo.id)
                                ?.companyName
                            }
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.promoDescription}>
                            {promo.description}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.secondColumn}>
                        <View >
                          <Text style={styles.promoDate}>
                            Du {new Date(promo.startAt).toLocaleDateString("fr")} {"\n"}au{" "}
                            {new Date(promo.endAt).toLocaleDateString("fr")}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))
            ) : (
              <Text style={styles.promoDescription}>
                Vous n'avez pas de promotion en cours
              </Text>
            )}
          </ScrollView>
        </View>
        </View>

      {/* Section Découvrez aussi  */}
      
        <View style={styles.sectionPromotions}>
          <View style={styles.alignColumn}>
            <View>
              <Text style={styles.sectionTitle}>DÉCOUVREZ AUSSI</Text>
            </View>
            <View>
              <Pressable
                style={styles.refreshIcon}
                onPress={() => {
                  regenerateNotUserPromotions();
                }}
              >
                <MaterialCommunityIcons
                  name="refresh-circle"
                  size={24}
                  color="#5DB075"
                />
              </Pressable>
            </View>
          </View>
          {shopLoader || userNotPromotionsLoader ? (
          <ActivityIndicator
            size={"large"}
            animating={shopLoader || userNotPromotionsLoader}
            color={MD2Colors.green200}
          />
        ) : (
          <View>
            <ScrollView>
              {shuffledNotUserPromotions.length > 0 ? (
                shuffledNotUserPromotions.slice(0, 3).map((promo, index) => (
                  <Pressable
                    title="Go info"
                    type="solid"
                    key={index}
                    onPress={() => {
                      const shop = getShopByPromotionId(promo.shopId, promo.id);
                      props.navigation.navigate("InfoShopToAdd", {
                        screen: "InfoShopToAddScreen",
                        shop,
                        props,
                        previousScreen: "NewsScreen",
                      });
                    }}
                  >
                    <View key={index} style={ styles.scrollableCard}>
                      <View style={styles.alignColumn}>
                        <View>
                          <View style={styles.firstRow}>
                            <FontAwesome5
                              name={
                                markerIcons[
                                  getShopByPromotionId(promo.shopId, promo.id)
                                    ?.activity
                                ]
                              }
                              size={20}
                              color="#5DB075"
                            />
                            <Text style={styles.promoCompany}>
                              {
                                getShopByPromotionId(promo.shopId, promo.id)
                                  ?.companyName
                              }
                            </Text>
                          </View>
                          <View>
                            <Text style={styles.promoDescription}>
                              {promo.description}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.secondColumn}>
                          <View >
                            <Text style={styles.promoDate}>
                              Du {new Date(promo.startAt).toLocaleDateString("fr")} {"\n"}au{" "}
                              {new Date(promo.endAt).toLocaleDateString("fr")}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                ))
              ) : (
                <Text style={styles.promoDescription}>
                  Aucune promotion en cours chez les commerçants autour de votre
                  position
                </Text>
              )}
            </ScrollView>
          </View>
        )}
        </View>
      </ScrollView>
      <Snackbar
        style={{ position: "absolute", bottom: 0, width: "100%" }}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  // HEADER SECTION
  header: {
    paddingTop: 40,
		position: 'sticky',
		top: 0,
		backgroundColor: "#5DB075",
		zIndex: 1,
  },
  infoUser: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
    width: "auto",
	},
  leftColumn: {
		justifyContent: "center",
    paddingRight: 20,
    flex: 1,

	},
  initialsBubble: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  initialText: {
    fontSize: 28,
    color: "#5DB075",
    fontWeight: "bold",
  },
	rightColumn: {
		justifyContent: "flex-start",
	},
  textBonjour: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    paddingBottom: 15,
  },
  rowNotif: {
		flexDirection: 'row',
  },
  iconNotif: {
    padding: 10,
    justifyContent: "center",
  },
  colNotif: {
    width: "80%",
  },
  infoNotif: {
    color: "#fff",
    fontSize: 14,
  },
  boldText: {
    fontWeight: 'bold',
  },

  // SECTION PROMOTIONS DE VOS COMMERCANTS
  sectionPromotions: {
		flex: "auto",
		padding: 15,
		backgroundColor: "#F5F5F5",
	},
  sectionTitle: {
		textTransform: "uppercase",
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "left",
	},
  scrollableCard: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 5,
    margin: 1,
    borderColor: "#CAD3C8",
		borderWidth: 1,
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
    marginLeft: 10,
    marginRight: 10,
    flex: 2,
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
});

export default NewsScreen;
