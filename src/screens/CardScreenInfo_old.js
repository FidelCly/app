import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getPromotionById, getShopPromotions } from "../services";

const API_URL = process.env.API_URL;

export default function CardScreenInfo({ route, navigation }) {
	const { card } = route.params;
	if (!card) {
		return null;
	}
	const balances = card.balances;
	const shopId = card.shop.id;
	let [isLoading, setIsLoading] = useState(false);
	let [shopPromotions, setShopPromotions] = useState([]);

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
			<View style={styles.firstInformationBlocGreen}> 
				{/* HEADER  */}
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
					<Text style={styles.backButtonText}>Retour</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {}}>
					<Text style={styles.optionsButtonText}>Options</Text>
				</TouchableOpacity>
			</View>
			{/* FIN HEADER  */}
			{/* INFO SHOP  */}
			<View style={styles.shopInfoBlock}>
				<View style={styles.shopInfoContainer}>
					<View style={styles.shopImageContainer}>
						<Image
							style={styles.shopImage}
							source={{ uri: card.shop.imageUrl }}
						/>
					</View>
					<View style={styles.shopDetailsContainer}>
						<Text style={styles.companyNameText}>{card.shop.companyName}</Text>
						<View style={styles.activityContainer}>
							<Text style={styles.activityText}>{card.shop.activity}</Text>
						</View>
						<View style={styles.addressContainer}>
							<Ionicons name="location-sharp" size={28} color="red" />
							<Text style={styles.addressText}>{card.shop.address} {card.shop.zipCode}&nbsp;{card.shop.city}</Text>
						</View>
					</View>
				</View>
			</View>
			{/* INFO SHOP  */}

			</View>
			
			{/* INFO PROMOTIONS  */}
			<View style={styles.promotionsInfoBlock}>
				<View>
					<Text style={styles.titleText}>PROMOTIONS</Text>
				</View>
				{
					<ScrollView>
						{shopPromotions?.map((promotion) => {
							return (
								<View style={styles.promotionsContainer} key={promotion.id}>
									<View style={styles.promotionsTextContainer}>
										<Text style={[styles.promotionsText, styles.promotionsTextLeft]}>
											{promotion.name}
										</Text>
										<Text style={[styles.promotionsText, styles.promotionsTextRight]}>
											<Text style={styles.soldeTamponsText}>
												{balances.find((b) => b.promotionId === promotion.id)?.counter ?? 0}
											</Text>
											/ {promotion.checkoutLimit}
										</Text>
									</View>
									<Text style={styles.dateText}>
										Du {new Date(promotion.startAt).toLocaleDateString("fr-FR")} au{" "}
										{new Date(promotion.endAt).toLocaleDateString("fr-FR")}
									</Text>
								</View>
							);
						})}
					</ScrollView>
				}
			</View>
			{/* INFO SHOP  */}
		</View>
	);
}

const styles = StyleSheet.create({
	activityContainer: {
		marginTop: 10
	},
	activityText: {
		fontSize: 16,
		fontWeight: "bold"
	},
	addressContainer: {
		alignItems: "center",
		flexDirection: "row",
		marginTop: 10,
	},
	addressText: {
		fontSize: 14,
		marginLeft: 5,
		textAlign: "center"
	},
	
	backButton: {
		alignItems: "center",
		flexDirection: "row",
	},
	backButtonText: {
		color: "white",
		fontSize: 16,
		marginLeft: 5
	},
	
	companyNameText: {
		color: "orange",
		fontSize: 32,
		fontWeight: "bold",
	},
	container: {
		backgroundColor: "#F5F5F5",
		flex: 1,
	},
	firstInformationBlocGreen:{
		backgroundColor: "#5DB075"
	},
	dateText: {
		color: "#999",
		fontSize: 14,
		marginTop: 5,
		textAlign: "left"
	},
	header: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		left: 0,
		paddingHorizontal: 10,
		paddingVertical: 5,
		position: "absolute",
		right: 0,
		top: 40,
	},
	optionsButtonText: {
		color: "white", 
		fontSize: 16,
		marginLeft: 5
	},
	shopInfoBlock: {
		marginTop: 60,
		padding: 20,
	},
	shopInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
	shopImageContainer: {
        marginRight: 10,
    },
    shopImage: {
        width: 50, // ou la taille que vous souhaitez
        height: 50, // ou la taille que vous souhaitez
        borderRadius: 25, // la moitié de la taille de l'image pour obtenir une "bulle"
    },
    shopDetailsContainer: {
        flex: 1,
    },
	promotionsInfoBlock: {
		marginTop: 100,
		padding: 20,
	},
	promotionsContainer: {
		backgroundColor: "#fff",
		borderRadius: 5,
		marginTop: 20,
		paddingVertical: 15,
		paddingHorizontal: 10
	},
	promotionsText: {
		color: "#333",
		fontSize: 20,
	},
	promotionsTextContainer:{
		flexDirection: "row",
		justifyContent: "space-between"
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
		fontSize: 22,
		fontWeight: "bold"
	},
	textStyle: {
		margin: 10,
		textAlign: "center"
	},
	titleText: {
		fontSize: 20,
		fontWeight: "bold"
	}
});

