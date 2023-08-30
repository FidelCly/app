import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getShopPromotions } from "../services";
import * as Luxon from "luxon";

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

	const getDayNameByNumber = (dayNumber) => {
		switch (dayNumber) {
			case 1:
				return "Lundi";
			case 2:
				return "Mardi";
			case 3:
				return "Mercredi";
			case 4:
				return "Jeudi";
			case 5:
				return "Vendredi";
			case 6:
				return "Samedi";
			case 7:
				return "Dimanche";
			default:
				return "";
		}
	};

	const getMonthNameByNumber = (monthNumber) => {
		switch (monthNumber) {
			case 1:
				return "Janvier";
			case 2:
				return "Février";
			case 3:
				return "Mars";
			case 4:
				return "Avril";
			case 5:
				return "Mai";
			case 6:
				return "Juin";
			case 7:
				return "Juillet";
			case 8:
				return "Août";
			case 9:
				return "Septembre";
			case 10:
				return "Octobre";
			case 11:
				return "Novembre";
			case 12:
				return "Décembre";
			default:
				return "";
		}
	};

	return (
		<View style={styles.container}>
			{/* Header (10%) */}
			<View style={styles.header}>
				{/* Bouton retour à gauche */}
				<TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
					<Text style={styles.backButtonText}>Retour</Text>
				</TouchableOpacity>
			</View>

			{/* Info Shop (15%) */}
			<View style={styles.infoShop}>
				<View style={styles.leftColumn}>
					{/* Affichage de l'image dans la colonne de gauche */}
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
					{/* Contenu de la colonne de droite (70%) */}
					<Text style={styles.companyNameText}>{card.shop.companyName}</Text>
					<View style={styles.activityContainer}>
						<Text style={styles.activityText}>{card.shop.activity}</Text>
					</View>
					<View style={styles.addressContainer}>
						<Ionicons name="location-sharp" size={20} color="red" />
						<Text style={styles.addressText}>
							{card.shop.address}
							{"\n"}
							{card.shop.zipCode}&nbsp;{card.shop.city}
						</Text>
					</View>
				</View>
			</View>

			{/* Description (20%) */}
			{card && card.shop && card.shop.description && card.shop.description !== "" ? (
				<View style={styles.description}>
					<Text style={styles.descriptionTitle}>Un petit mot de votre commerçant</Text>
					<Text style={styles.descriptionText}>{card.shop.description}</Text>
					<Text style={styles.signature}>{card.shop.companyName}</Text>
				</View>
			) : null}

			<View style={styles.promotions}>
				<ScrollView style={styles.promotions}>
					<View style={styles.titreBloc}>
						<Text style={styles.promotionsTitle}>Promotions en cours</Text>
					</View>
					{/* Liste des promotions en cours */}
					{shopPromotions.map((promotion) => (
						<View style={styles.promotionsContainer} key={promotion.id}>
							<View style={styles.promotionsTextContainer}>
								<Text style={[styles.promotionsText, styles.promotionsTextLeft]}>{promotion.name}</Text>
								<Text style={[styles.promotionsText, styles.promotionsTextRight]}>
									<Text style={styles.soldeTamponsText}>
										{balances
											.filter((b) => b.isActive)
											.find(
												(b) =>
													b.promotionId === promotion.id &&
													b.counter < promotion.checkoutLimit
											)?.counter ?? 0}
									</Text>
									/ {promotion.checkoutLimit}
								</Text>
							</View>
						</View>
					))}
				</ScrollView>
			</View>

			<View style={styles.promotions}>
				<ScrollView style={styles.promotions}>
					<View style={styles.titreBloc}>
						<Text style={styles.promotionsTitle}>Historique de vos promotions</Text>
					</View>
					{/* Liste des promotions historiques */}
					{balances.filter((b) => !b.isActive).length > 0 ? (
						<View style={styles.balanceHistoryBloc}>
							<Text style={styles.titleTextHistorique}>Dates des précédentes utilisations :</Text>
							{balances
								.filter((b) => !b.isActive)
								.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
								.map((balance, index) => (
									<Text key={index} style={styles.balanceHistory}>
										{getDayNameByNumber(
											Luxon.DateTime.fromISO(balance.updatedAt).toJSDate().getDay()
										)}
										, {Luxon.DateTime.fromISO(balance.updatedAt).day.toString()}{" "}
										{getMonthNameByNumber(
											Luxon.DateTime.fromISO(balance.updatedAt).toJSDate().getMonth()
										)}{" "}
										{Luxon.DateTime.fromISO(balance.updatedAt).year.toString()} à{" "}
										{Luxon.DateTime.fromISO(balance.updatedAt).hour.toString()}:
										{Luxon.DateTime.fromISO(balance.updatedAt).minute.toString()}:
										{Luxon.DateTime.fromISO(balance.updatedAt).second.toString()}({balance.counter})
										({balance.promotion.name})
									</Text>
								))}
						</View>
					) : (
						<Text style={styles.titleTextHistorique}>Aucun historique pour cette carte</Text>
					)}
				</ScrollView>
			</View>
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
		flex: 0.25,
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
	refreshIcon: {
		textAlign: "right",
		position: "relative",
		top: -5
	},

	titreBloc: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	promotionsContainer: {
		backgroundColor: "#fff",
		borderRadius: 10,
		marginTop: 20,
		paddingVertical: 15,
		paddingHorizontal: 10
	},
	promotionsTextContainer: {
		// flexDirection: "row",
		//justifyContent: "space-between"
		display: "flex",
		flexDirection: "column",
		width: "100%"
	},
	promotionsText: {
		color: "#333",
		fontSize: 20
	},
	promotionsTextHistorique: {
		color: "#222",
		fontSize: 8,
		paddingRight: 20,
		paddingTop: 10
	},

	promotionsTextLeft: {
		flex: 0.7
	},
	promotionsTextRight: {
		color: "#666",
		flex: 0.3,
		textAlign: "right"
	},
	soldeTamponsText: {
		color: "green",
		fontSize: 20,
		fontWeight: "bold"
	},
	dateText: {
		textAlign: "left",
		fontSize: 12,
		marginTop: 10
	},
	balanceHistoryBloc: {
		display: "Block",
		width: "100%"
	},
	titleTextHistorique: {
		color: "#444",
		fontSize: 12,
		paddingRight: 20,
		paddingTop: 10,
		fontStyle: "italic"
	},
	balanceHistory: {
		fontSize: 11,
		color: "darkgray",
		marginTop: 5,
		width: "100%",
		textAlign: "left"
	}
	// Promotions styles
});
