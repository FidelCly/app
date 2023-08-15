import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getShopPromotions } from "../services";
import { getCards } from "../store/reducers/card.reducer";
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
	const [snackBarVisible, setSnackbarVisible] = useState(false);
	const [snackBarMessage, setSnackbarMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [shopPromotions, setShopPromotions] = useState([]);
	const [existedCard, setExistedCard] = useState(null);

	const dispatch = useDispatch();

	useEffect(() => {
		// get all promotion from shop
		fetchShopPromotions(shop.id);
	}, [props]);

	/**
	 * Check if the card is already in the wallet
	 */
	checkIfCardIsInWallet = (shopId) => {
		const card = infoUserWallet.find((card) => card.shop.id === shopId);
		if (card) {
			setExistedCard(card);
			return true;
		}
		return false;
	};

	/**
	 * Get initials from username
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

	/**
	 * fetchShopPromotions
	 * @param {*} shopId
	 */
	const fetchShopPromotions = async (shopId) => {
		try {
			setIsLoading(true);
			const promotionArrays = await getShopPromotions(shopId);
			setShopPromotions(promotionArrays.filter((promotion) => promotion.isActive === true));
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

			setIsLoading(false);
			setSnackbarVisible(true);
			setSnackbarMessage("Carte ajoutée au wallet !");

			// props.navigation.navigate("InfoCard", {
			// 	screen: "CardScreenInfo"
			// 	// shop
			// });
		} catch (error) {
			console.warn("🚀 ~ handleClick ~ error:", error);
			setIsLoading(false);
			setSnackbarVisible(true);
			setSnackbarMessage("Une erreur est survenue.");
		}
	};

	return (
		<View style={styles.container}>
			{/* Header (10%) */}
			<View style={styles.header}>
				{/* Bouton retour à gauche */}
				<TouchableOpacity
					style={styles.goBackButton}
					onPress={() =>
						props.navigation.navigate("BottomNavigator", {
							screen: "Plan"
						})
					}
				>
					<Text style={styles.backButtonText}>Retour</Text>
				</TouchableOpacity>
			</View>

			{/* Info Shop (15%) */}
			<View style={styles.infoShop}>
				<View style={styles.leftColumn}>
					{/* Affichage de l'image dans la colonne de gauche */}
					<View style={styles.shopImageContainer}>
						<View style={styles.initialsContainer}>
							{pictureUrl && pictureUrl !== "" ? (
								<Image style={styles.shopImage} source={{ uri: pictureUrl }} />
							) : (
								<Text style={styles.cardText}>{getInitials(shop.companyName)}</Text>
							)}
						</View>
					</View>
				</View>
				<View style={styles.rightColumn}>
					{/* Contenu de la colonne de droite (70%) */}
					<Text style={styles.companyNameText}>{shop?.companyName}</Text>
					<View style={styles.activityContainer}>
						<Text style={styles.activityText}>{shop?.activity}</Text>
					</View>
					<View style={styles.addressContainer}>
						<Ionicons name="location-sharp" size={20} color="red" />
						<Text style={styles.addressText}>{shop?.address}</Text>
					</View>
				</View>
			</View>

			{/* Description (20%) */}
			<View style={styles.description}>
				<Text style={styles.descriptionTitle}>Un petit mot de votre commerçant</Text>
				<Text style={styles.descriptionText}>{shop?.description}</Text>
				<Text style={styles.signature}>{shop.companyName}</Text>
			</View>

			{/* Promotions en cours (45%) */}
			<View style={styles.promotions}>
				<ScrollView style={styles.promotions}>
					<Text style={styles.promotionsTitle}>Promotions en cours</Text>
					{/* Liste des promotions */}
					{shopPromotions.map((promotion) => (
						<View style={styles.promotionsContainer} key={promotion.id}>
							<View style={styles.promotionsTextContainer}>
								<Text style={[styles.promotionsText, styles.promotionsTextLeft]}>{promotion.name}</Text>
								{/* <Text style={[styles.promotionsText, styles.promotionsTextRight]}> */}
								{/* <Text style={styles.soldeTamponsText}>
										{balances.filter((b) => b.isActive).find((b) => b.promotionId === promotion.id)
											?.counter ?? 0}
									</Text>
									/ {promotion.checkoutLimit} */}
								{/* </Text> */}
							</View>
							<Text style={styles.dateText}>
								Du {new Date(promotion.startAt).toLocaleDateString("fr-FR")} au{" "}
								{new Date(promotion.endAt).toLocaleDateString("fr-FR")}
							</Text>
						</View>
					))}
				</ScrollView>
			</View>
			{/* CTA ajouter (10%) */}

			<View style={styles.ctaContainer}>
				{
					<TouchableOpacity
						title="Ajouter à mon wallet"
						onPress={() => {
							handleClick();
						}}
					>
						<CustomButton title="Ajouter à mon wallet" />
					</TouchableOpacity>
				}
				{/* :
				{
					<TouchableOpacity
						title="Voir la carte sur mon wallet"
						onPress={async () => {
							props.navigation.navigate("InfoCard", {
								screen: "CardScreenInfo",
								existedCard
							});
						}}
					>
						<CustomButton title="Voir la carte sur mon wallet" />
					</TouchableOpacity>
				} */}
			</View>
			<ActivityIndicator size={"large"} animating={isLoading} color={MD2Colors.red800} />

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
					}
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
		backgroundColor: "#F5F5F5"
	},
	// HEADER STYLES
	header: {
		flex: 0.1,
		backgroundColor: "#5DB075",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	goBackButton: {
		position: "absolute",
		left: 10,
		paddingHorizontal: 10
	},
	backButtonText: {
		color: "#424242",
		fontSize: 16,
		marginTop: 20,
		textDecorationLine: "underline"
	},
	// HEADER STYLES
	// Info Shop styles
	infoShop: {
		flex: 0.2,
		flexDirection: "row"
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
		paddingHorizontal: 20
	},
	shopImageContainer: {
		width: 70,
		height: 70,
		borderRadius: 35,
		overflow: "hidden"
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
	// Info Shop styles
	// Description styles
	description: {
		flex: 0.15,
		backgroundColor: "#fff",
		padding: 20
	},
	descriptionTitle: {
		textTransform: "uppercase",
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "left"
	},
	descriptionText: {
		fontStyle: "italic",
		textAlign: "left",
		marginBottom: 20,
		fontSize: 12
	},
	signature: {
		textAlign: "right",
		fontWeight: "bold",
		fontSize: 12
	},
	// Description styles

	// Promotions styles
	promotions: {
		flex: 0.45,
		backgroundColor: "#F5F5F5",
		padding: 10
	},
	promotionsTitle: {
		textTransform: "uppercase",
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "left"
	},
	promotionsContainer: {
		backgroundColor: "#fff",
		borderRadius: 10,
		marginTop: 20,
		paddingVertical: 15,
		paddingHorizontal: 10
	},
	promotionsTextContainer: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	promotionsText: {
		color: "#333",
		fontSize: 20
	},
	promotionsTextLeft: {
		flex: 0.7
	},
	dateText: {
		textAlign: "left",
		fontSize: 12,
		marginTop: 10
	},
	// Promotions styles
	ctaContainer: {
		flex: 0.1,
		alignItems: "center"
	}
});
