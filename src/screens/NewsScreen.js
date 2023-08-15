/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Text, View, StyleSheet, Pressable, Dimensions, ScrollView } from "react-native";
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons, Fontisto, FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, ActivityIndicator, MD2Colors } from "react-native-paper";
import { getAllShops, getShopPromotions } from "../services";

const { height } = Dimensions.get("window");
const markerIcons = {
	Restauration: "utensils",
	Supply: "shopping-cart",
	Entertainment: "gamepad",
	Store: "grav",
	Service: "cog"
};

const NewsScreen = (props) => {
	let user = useSelector((state) => state.users.currentUser);
	let userCards = useSelector((state) => state.cards.cards);
	let allShop = useSelector((state) => state.shops.allShops);
	const cardsLoader = useSelector((state) => state.cards.cardLoader);
	const userLoader = useSelector((state) => state.users.userLoader);
	const shopLoader = useSelector((state) => state.shops.shopLoader);
	const [userPromotions, setUserPromotions] = useState([]);
	const [notUserPromotions, setNotUserPromotions] = useState([]);
	const [snackBarMessage, setSnackbarMessage] = useState("");
	const [snackBarVisible, setSnackbarVisible] = useState(false);
	const [checkOutInfo, setCheckOutInfo] = useState(null);

	const dispatch = useDispatch();

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
				if (allShop && userCards && userCards.length > 0 && allShop.length > 0) {
					const notUserCards = allShop.filter((shop) => !userCards.find((card) => card.shop.id === shop.id));
					setNotUserPromotions(notUserCards);

					const userPromotions = [];
					const notUserPromotions = [];

					for (let i = 0; i < userCards.length; i++) {
						const shopPromotions = await getShopPromotions(userCards[i].shop.id);
						userPromotions.push(...shopPromotions);
					}
					setUserPromotions(userPromotions);

					for (let i = 0; i < notUserCards.length; i++) {
						const shopPromotions = await getShopPromotions(notUserCards[i].id);
						notUserPromotions.push(...shopPromotions);
					}
					setNotUserPromotions(notUserPromotions);

					// get user card that has balances counter equal to promotion checkoutLimit
					const checkOutInfo = userCards.find((card) => {
						const promotion = userPromotions.find((promo) => promo.shopId === card.shop.id);
						return card.balances.find((balance) => balance.counter === promotion.checkoutLimit) ?? null;
					});

					checkOutInfo && setCheckOutInfo(checkOutInfo);
				}
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
				shop.promotions.find((promotion) => promotion.shopId === shopId && promotion.id === promotionId)
		);
		return shop;
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
			<View style={styles.header}>
				<View style={styles.userContainer}>
					<View style={styles.userPhoto}>
						<View style={styles.initialsBubble}>
							<Text style={styles.initialText}>{user ? getInitials(user.username) : ""}</Text>
						</View>
					</View>
					<View style={styles.userName}>
						{userLoader ? (
							<View>
								{/* <Text>Chargement ...</Text> */}
								<ActivityIndicator size={"large"} animating={userLoader} color={MD2Colors.red800} />
							</View>
						) : user ? (
							<View style={styles.usernameContainer}>
								<View>
									<Text style={styles.usernameText}>Bonjour {user.username}</Text>
								</View>
								<View style={styles.fullWidth}>
									<View style={styles.columnIcon}>
										<MaterialIcons name="notifications-active" size={24} color="#fff" />
									</View>
									{checkOutInfo ? (
										<View style={styles.columnText}>
											<Text style={styles.infoText}>
												Une de vos cartes de fidélité est complète
											</Text>
											<Text style={styles.infoText}>
												Bénéficiez de votre promotion chez {checkOutInfo?.shop?.companyName}
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
								<Text style={styles.errorTextStyle}>Erreur lors de la récuperation des données</Text>
							</View>
						)}
					</View>
				</View>
			</View>
			<View style={styles.promotionSection}>
				<Text style={styles.sectionTitle}>LES PROMOTIONS DE VOS COMMERÇANTS</Text>
				<View style={styles.scrollableCard}>
					<ScrollView>
						{cardsLoader ? (
							<ActivityIndicator size={"large"} animating={cardsLoader} color={MD2Colors.red800} />
						) : userPromotions.length > 0 ? (
							userPromotions.map((promo, index) => (
								<View key={index} style={styles.promoItem}>
									<View style={styles.promoItemHeader}>
										<FontAwesome5
											name={markerIcons[getShopByPromotionId(promo.shopId, promo.id)?.activity]}
											size={20}
											color="#5DB075"
										/>
										<Text style={styles.promoCompany}>
											{getShopByPromotionId(promo.shopId, promo.id)?.companyName}
										</Text>
										<Text style={styles.promoDate}>
											du {new Date(promo.startAt).toLocaleDateString("fr")} au{" "}
											{new Date(promo.endAt).toLocaleDateString("fr")}
										</Text>
									</View>
									<Text style={styles.promoDescription}>{promo.description}</Text>
								</View>
							))
						) : (
							<Text style={styles.promoDescription}>Vous n'avez pas de promotion en cours</Text>
						)}
					</ScrollView>
				</View>
			</View>

			<View style={styles.decouvrezSection}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						paddingHorizontal: 10
					}}
				>
					<Text style={styles.sectionTitle}>DÉCOUVREZ AUSSI</Text>
					{/* <Pressable onPress={() => {}}>
						<MaterialCommunityIcons name="refresh-circle" size={24} color="#5DB075" />
					</Pressable> */}
				</View>
				{shopLoader ? (
					<ActivityIndicator size={"large"} animating={shopLoader} color={MD2Colors.red800} />
				) : (
					<View style={styles.scrollableCard}>
						<ScrollView>
							{userPromotions.length > 0 ? (
								notUserPromotions.map((promo, index) => (
									<View key={index} style={styles.promoItem}>
										<View style={styles.promoItemHeader}>
											<FontAwesome5
												name={
													markerIcons[getShopByPromotionId(promo.shopId, promo.id)?.activity]
												}
												size={20}
												color="#5DB075"
											/>
											<Text style={styles.promoCompany}>
												{getShopByPromotionId(promo.shopId, promo.id)?.companyName}
											</Text>
											<Text style={styles.promoDate}>
												du {new Date(promo.startAt).toLocaleDateString("fr")} au{" "}
												{new Date(promo.endAt).toLocaleDateString("fr")}
											</Text>
										</View>
										<Text style={styles.promoDescription}>{promo.description}</Text>
									</View>
								))
							) : (
								<Text style={styles.promoDescription}>
									Aucune promotion en cours chez les commerçants autour de votre position
								</Text>
							)}
						</ScrollView>
					</View>
				)}
			</View>
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
					}
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
		backgroundColor: "#F5F5F5"
	},

	// HEADER SECTION

	header: {
		flex: 0.28,
		backgroundColor: "#5DB075",
		flexDirection: "column"
	},

	userContainer: {
		marginTop: 30,

		flex: 1,
		flexDirection: "row"
	},
	userPhoto: {
		flex: 0.3,
		alignItems: "center",
		justifyContent: "center"
	},
	initialsBubble: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	initialText: {
		fontSize: 28,
		color: "#5DB075",
		fontWeight: "bold"
	},
	userName: {
		flex: 0.7
	},
	usernameContainer: {
		flex: 0.9,
		justifyContent: "center"
	},
	usernameText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#fff",
		padding: 10,
		paddingTop: 55
	},
	errorTextStyle: {
		color: "red",
		fontWeight: "bold"
	},
	infoText: {
		color: "#fff",
		fontSize: 12
	},
	fullWidth: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		padding: 10
	},
	columnIcon: {
		flex: 0.15
	},
	columnText: {
		flex: 0.85,
		marginLeft: 5
	},
	// FIN HEADER SECTION

	// PROMOTION SECTION
	promotionSection: {
		flex: 0.36
	},
	// FIN PROMOTION SECTION

	// DECOUVREZ SECTION
	decouvrezSection: {
		flex: 0.36
	},
	// FIN DECOUVREZ SECTION
	sectionTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#666666",
		textTransform: "uppercase",
		padding: 10,
		height: height * 0.06
	},

	scrollableCard: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 5,
		margin: 5
		// maxHeight: height * 0.25
	},

	promoItem: {
		flexDirection: "column",
		borderBottomColor: "darkgray",
		borderBottomWidth: 0.3,
		padding: 10
	},
	promoItemHeader: {
		flexDirection: "row",
		alignItems: "center"
	},

	promoCompany: {
		color: "#E5B824",
		textTransform: "uppercase",
		fontWeight: "bold",
		marginLeft: 10,
		marginRight: 10,
		flex: 2
	},

	promoDate: {
		fontSize: 9,
		flex: 1
	},

	promoDescription: {
		fontSize: 12,
		color: "darkgray",
		marginTop: 5
	}
});

export default NewsScreen;
