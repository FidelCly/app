import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getShopPromotions } from "../services";
import * as Luxon from "luxon";
import { LogBox } from "react-native";

//Récupérer l'initiale du shop pour l'afficher sur la carte si pas d'image
const getInitials = (companyName) => {
	if (!companyName) return "";
	const words = companyName.split(" ");
	return words
		.map((word) => word.charAt(0))
		.join("")
		.toUpperCase();
};

export default function CardScreenInfo({ route, navigation }) {
	LogBox.ignoreAllLogs(); // Ignore all log notifications

	const { card } = route.params;
	if (!card) {
		return null;
	}
	const balances = card.balances;
	const shopId = card.shop.id;
	const pictureUrl = card.shop.pictureUrl;
	let [isLoading, setIsLoading] = useState(false);
	let [shopPromotions, setShopPromotions] = useState([]);

	const showImage = pictureUrl && pictureUrl.length > 0;

	function formatAddress(address) {
		const parts = address.split(", ");
		if (parts.length >= 2) {
			const [street, cityZip] = parts;
			return `${street}\n${cityZip}`;
		}
		return address;
	}

	useEffect(() => {
		fetchPromotion(shopId);
	}, []);

	const fetchPromotion = async (shopId) => {
		try {
			const promotionArrays = await getShopPromotions(shopId);
			setShopPromotions(promotionArrays.filter((promotion) => promotion.isActive === true));
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			{/* Section Header */}
			<View style={styles.header}>
				{/* Section Bouton Retour */}
				<View style={styles.goBackButton}>
					<TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
						<Text style={styles.backButtonText}>Retour</Text>
					</TouchableOpacity>
				</View>
				{/* Section InfoShop */}
				<View style={styles.infoShop}>
					<View style={styles.leftColumn}>
						<View style={styles.shopImageContainer}>
							{showImage ? (
								<Image style={styles.shopImage} source={{ uri: pictureUrl }} />
							) : (
								<View style={styles.initialsContainer}>
									<Text style={styles.cardText}>{getInitials(card.shop.companyName)}</Text>
								</View>
							)}
						</View>
					</View>
					<View style={styles.rightColumn}>
						<Text style={styles.companyNameText}>{card.shop.companyName}</Text>
						<View style={styles.activityContainer}>
							<Text style={styles.activityText}>{card.shop.activity}</Text>
						</View>
						<View style={styles.addressContainer}>
							<Ionicons name="location-sharp" size={20} color="red" />
							<Text style={styles.addressText}>{formatAddress(card.shop.address)}</Text>
						</View>
					</View>
				</View>
			</View>
			<ScrollView>
				{/* Section Description */}
				{card && card.shop && card.shop.description && card.shop.description !== "" ? (
					<View style={styles.description}>
						<Text style={styles.descriptionTitle}>Un petit mot de votre commerçant</Text>
						<Text style={styles.descriptionText}>{card.shop.description}</Text>
						<Text style={styles.signature}>{card.shop.companyName}</Text>
					</View>
				) : null}
				{/* Section Promotion */}
				<View style={styles.promotions}>
					<View>
						<Text style={styles.sectionTitle}>Promotions en cours</Text>
					</View>
					{/* Liste des promotions en cours */}
					{shopPromotions.map((promotion) => (
						<View style={styles.promotionsContainer} key={promotion.id}>
							<View style={styles.promotionsTextContainer}>
								<View style={styles.promotionsTextRow}>
									<Text style={[styles.promotionsText, styles.promotionsTextLeft]}>
										{promotion.name}
									</Text>
									<Text style={styles.promotionsTextRight}>
										<Text style={styles.soldeTamponsText}>
											{balances
												.filter((b) => b.isActive)
												.find(
													(b) =>
														b.promotionId === promotion.id &&
														b.counter < promotion.checkoutLimit
												)?.counter ?? 0}
										</Text>
										/{promotion.checkoutLimit}
									</Text>
								</View>
								<View style={styles.promotionsTextRow}>
									<Text style={[styles.promotionsDescText, styles.promotionsTextLeft]}>
										{promotion.description}
									</Text>
								</View>
							</View>
						</View>
					))}
				</View>
				{/* Section Historique */}
				<View style={styles.historique}>
					<View>
						<Text style={styles.sectionTitle}>Historique de vos promotions</Text>
					</View>
					{/* Liste des promotions historiques */}
					{balances.filter((b) => !b.isActive).length > 0 ? (
						<View style={styles.balanceHistoryBloc}>
							{balances
								.filter((b) => !b.isActive)
								.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
								.map((balance, index) => (
									<View style={styles.historyContainer} key={index}>
										<View style={styles.promotionsTextContainer}>
											<View style={styles.promotionsTextRow}>
												<Text style={[styles.promotionsText, styles.promotionsTextLeft]}>
													{balance.promotion.name}
												</Text>
												<Text>
													{balance.counter}/{balance.promotion.checkoutLimit}
												</Text>
											</View>
											<View style={styles.promotionsTextRow}>
												<Text style={styles.balanceHistory}>
													{Luxon.DateTime.fromISO(balance.updatedAt)
														.setLocale("fr")
														.toFormat("DDDD t")}
												</Text>
											</View>
										</View>
									</View>
								))}
						</View>
					) : (
						<Text style={styles.titleTextHistorique}>Aucun historique pour cette carte</Text>
					)}
				</View>
			</ScrollView>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5"
	},
	// Section Header
	header: {
		paddingTop: 20,
		paddingHorizontal: 15,
		position: "sticky",
		top: 0,
		backgroundColor: "#5DB075",
		zIndex: 1
	},
	goBackButton: {
		left: 10,
		paddingTop: 10
	},
	backButtonText: {
		color: "#424242",
		fontSize: 16,
		textDecorationLine: "underline"
	},
	// Section Header Infoshop
	infoShop: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 10
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
		justifyContent: "center"
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
		alignItems: "center",
		flexWrap: "wrap"
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

	// Section Description
	description: {
		padding: 15,
		flex: "auto",
		backgroundColor: "#fff"
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

	// Section Promotion
	promotions: {
		flex: "auto",
		padding: 15,
		backgroundColor: "#F5F5F5"
	},
	sectionTitle: {
		textTransform: "uppercase",
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "left"
	},
	promotionsContainer: {
		backgroundColor: "#fff",
		borderRadius: 5,
		marginTop: 2,
		padding: 5,
		borderColor: "#CAD3C8",
		borderWidth: 1
	},
	promotionsTextRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%"
	},
	promotionsTextContainer: {
		display: "flex",
		flexDirection: "column",
		width: "100%"
	},
	promotionsText: {
		color: "#424242",
		textTransform: "uppercase",
		fontWeight: "bold"
	},
	promotionsTextLeft: {
		flex: 0.7
	},
	promotionsTextRight: {
		flex: 0.3,
		textAlign: "right"
	},
	soldeTamponsText: {
		color: "green",
		fontSize: 20,
		fontWeight: "bold"
	},
	promotionsDescText: {
		fontStyle: "italic",
		textAlign: "left",
		fontSize: 12,
		color: "darkgray"
	},

	// Section Historique
	historique: {
		padding: 15,
		backgroundColor: "#F5F5F5"
	},
	historyContainer: {
		backgroundColor: "#F5F5F5",
		borderColor: "#CAD3C8",
		borderWidth: 1,
		borderRadius: 5,
		marginTop: 2,
		padding: 5
	},
	balanceHistoryBloc: {
		display: "Block",
		width: "100%"
	},
	titleTextHistorique: {
		color: "#424242",
		paddingRight: 20,
		paddingTop: 10,
		fontStyle: "italic"
	},
	balanceHistory: {
		fontSize: 11,
		color: "darkgray",
		marginTop: 5,
		width: "100%",
		textAlign: "left",
		textTransform: "capitalize"
	}
});
