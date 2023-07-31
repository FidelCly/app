/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Slider from "@react-native-community/slider";
import { getAllShops, getNearShops } from "../services";

export default function MapScreen(props) {
	const [pin, setPin] = useState({
		latitude: 48.866667,
		longitude: 2.333333
	});
	const [hasPermissionLocation, setHasPermissionLocation] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const [shopNearMyPosition, setShopNearMyPosition] = useState([]);
	const [allShop, setAllShop] = useState([]);
	const [distance, setDistance] = useState(3000);

	const askForLocationPermissionAgain = useCallback(async () => {
		const location = await Location.getCurrentPositionAsync({});
		setPin({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude
		});
	}, []);

	const mapStyle = [
		// Commerces et activités
		{
			featureType: "poi",
			stylers: [{ visibility: "off" }]
		},
		// Transport en commun
		{
			featureType: "transit",
			stylers: [{ visibility: "off" }]
		}
	];

	const markerIcons = {
		Restauration: require("../assets/icon_restauration.png"),
		Supply: require("../assets/icon_supply.png"),
		Entertainment: require("../assets/icon_entertainement.png"),
		Store: require("../assets/icon_store.png"),
		Service: require("../assets/icon_service.png")
	};

	useEffect(() => {
		(async () => {
			try {
				const { status } = await Location.requestForegroundPermissionsAsync();
				setHasPermissionLocation(status === "granted");
				if (status === "granted") {
					setLoading(true);
					const { coords } = await Location.getCurrentPositionAsync({});
					setPin({ latitude: coords.latitude, longitude: coords.longitude });
					// Cette ligne permet de get les shop à proximité de la position de l'utilisateur
					const nearShops = await getNearShops(distance, coords.latitude, coords.longitude);

					// cette ligne permet de get tous les shops (sans distance ni critère de position) / à utiliser pour les tests
					const allShop = await getAllShops();

					if (nearShops && nearShops.length > 0) {
						setShopNearMyPosition(allShop);
					}

					if (allShop && allShop.length > 0) {
						setAllShop(allShop);
					}

					setLoading(false);
				}
			} catch (error) {
				console.warn("🚀 ~ error:", error);
			}
		})();
	}, [askForLocationPermissionAgain]);

	const handleDistanceChange = async (newDistance) => {
		try {
			setLoading(true);
			const { coords } = await Location.getCurrentPositionAsync({});

			setDistance(newDistance);
			const datas = await getNearShops(distance, coords.latitude, coords.longitude);

			if (datas) {
				setShopNearMyPosition(datas);
			}
			setLoading(false);
		} catch (error) {
			console.warn("🚀 ~ handleDistanceChange ~ error:", error);
		}
	};

	if (hasPermissionLocation === null) {
		return <Text>Demande d'autorisation de la localisation</Text>;
	}
	if (hasPermissionLocation === false) {
		return (
			<View style={styles.container}>
				<Text style={styles.errorMsg}>
					L'application nécessite une autorisation pour accéder à la localisation
				</Text>
				<Pressable
					title={"Autoriser la localisation"}
					onPress={() => askForLocationPermissionAgain()}
					style={styles.text}
				>
					<Text style={styles.buttonAllowLocation}>Autoriser la localisation</Text>
				</Pressable>
			</View>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.sliderContainer}>
				<Slider
					style={styles.slider}
					value={distance}
					minimumValue={100}
					maximumValue={5000}
					step={100}
					onValueChange={handleDistanceChange}
				/>
				<Text style={styles.sliderValue}>{distance} m</Text>
			</View>
			{isLoading ? (
				<View style={styles.onLoading}>
					<Text>Chargement des données ...</Text>
				</View>
			) : (
				<MapView
					style={styles.map}
					customMapStyle={mapStyle}
					initialRegion={{
						latitude: pin.latitude,
						longitude: pin.longitude,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01
					}}
					showsUserLocation={true}
				>
					<Marker key={"currentPos"} coordinate={pin} pinColor="red" title="Hello" description="I'am here" />
					{shopNearMyPosition.map((shop) => (
						<Marker
							key={shop.id}
							coordinate={{
								latitude: parseFloat(shop.lat),
								longitude: parseFloat(shop.long)
							}}
							title={shop.companyName}
							description={shop.activity}
							image={markerIcons[shop.activity]}
						/>
					))}
				</MapView>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	buttonAllowLocation: {
		backgroundColor: "#E5B824",
		borderRadius: 20,
		color: "#fff",
		fontSize: 16,
		marginTop: 20,
		paddingBottom: 10,
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 10
	},
	container: {
		alignItems: "center",
		backgroundColor: "#6600ff",
		flex: 1,
		justifyContent: "center",
		textAlign: "center"
	},
	errorMsg: {
		color: "white",
		fontSize: 20,
		padding: 30,
		textAlign: "center"
	},
	map: {
		height: Dimensions.get("window").height,
		width: Dimensions.get("window").width
	},
	onLoading: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		textAlign: "center"
	},
	slider: {
		marginTop: 10
	},
	sliderContainer: {
		backgroundColor: "transparent"
	},
	sliderValue: {
		paddingLeft: 20
	}
});
