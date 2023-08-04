import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { getShop } from "../store/reducers/shop.reducer";
import { useSelector, useDispatch } from "react-redux";
import { addCardToWallet } from "../services";
import { getCards } from "../store/reducers/card.reducer";
import { getUser } from "../store/reducers/user.reducer";

const screenWidth = Dimensions.get("window").width;
const scannerSize = screenWidth * 0.8; // Adjust the size of the scanner box here

export default function ScanScreen(props) {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const [shopIdScan, setShopIdScan] = useState(
		"Scanner le QR code de votre commerçant pour l'ajouter dans votre wallet"
	);
	const shop = useSelector((state) => state.shops.currentShop);

	// Permet d'aller chercher l'utilisateur et le dans le store
	const user = useSelector((state) => state.users.currentUser);
	const dispatch = useDispatch();

	const currentDate = new Date();
	const endAtDate = new Date();

	const askForCameraPermission = () => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	};

	// Request Camera Permission
	useEffect(() => {
		getUserFromStore();
		askForCameraPermission();
		if (shopIdScan !== "Scanner le QR code de votre commerçant pour l'ajouter dans votre wallet") {
			fetchShop(shopIdScan);
		}
	}, [shopIdScan]);

	const fetchShop = (shopId) => {
		dispatch(getShop(shopId));
	};

	const getUserFromStore = async () => {
		try {
			const value = await AsyncStorage.getItem("userId");
			if (value !== null) {
				fetchUserFromStore(value);
			}
		} catch (err) {
			// Implement visual error handling
		}
	};

	const fetchUserFromStore = (userId) => {
		dispatch(getUser(userId));
	};

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		setShopIdScan(+data);
	};

	const handleClick = async () => {
		try {
			await addCardToWallet(shopIdScan);
			dispatch(getCards());
			getUserFromStore();
			await props.navigation.navigate("BottomNavigator", {
				screen: "Cartes Fid"
			});
		} catch (error) {
			console.error("🚀 ~ handleClick ~ error:", error);
		}
	};

	if (hasPermission === null) {
		return <Text>Demande d'autorisation de la caméra</Text>;
	}
	if (hasPermission === false) {
		return (
			<View style={styles.container}>
				<Text style={styles.errorMsg}>L'application nécessite une autorisation pour accéder à la caméra</Text>
				<Pressable title={"Allow Camera"} onPress={() => askForCameraPermission()}>
					<Text style={styles.buttonAllowCamera}>Autoriser la caméra</Text>
				</Pressable>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.scanText}>Un scan, un clic, un wallet plein de fidélité !</Text>
			<Text style={styles.scanText}>Simplifiez vos achats !</Text>
			<View style={styles.scannerContainer}>
				<View style={styles.scannerOutline}>
					<BarCodeScanner
						onBarCodeScanned={scanned ? false : handleBarCodeScanned}
						style={[StyleSheet.absoluteFillObject, styles.barcodeScanner]}
					/>
					<View style={[styles.cornerBorder, styles.topLeftCorner]} />
					<View style={[styles.cornerBorder, styles.topRightCorner]} />
					<View style={[styles.cornerBorder, styles.bottomLeftCorner]} />
					<View style={[styles.cornerBorder, styles.bottomRightCorner]} />
				</View>
			</View>
			<Text style={styles.maintext}>{shop?.companyName}</Text>
			{scanned && (
				<View>
					<Pressable style={styles.buttonTapAgain} onPress={() => setScanned(false)}>
						<Text style={{ color: "white", fontSize: 18 }}>Scanner à nouveau</Text>
					</Pressable>
					<Pressable style={styles.addWallet} onPress={() => handleClick()}>
						<Text style={{ color: "white", fontSize: 18 }}>Ajouter aux Cartes</Text>
					</Pressable>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	addWallet: {
		backgroundColor: "#E5B824",
		borderRadius: 20,
		marginTop: 20,
		paddingBottom: 10,
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 10
	},
	barcodeScanner: {
		width: "100%",
		height: "100%"
	},
	buttonAllowCamera: {
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
	buttonTapAgain: {
		backgroundColor: "#E5B824",
		borderRadius: 20,
		marginTop: 20,
		paddingBottom: 10,
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 10
	},
	container: {
		alignItems: "center",
		backgroundColor: "transparent",
		flex: 1,
		justifyContent: "center"
	},
	errorMsg: {
		color: "white",
		fontSize: 20,
		padding: 30,
		textAlign: "center"
	},
	maintext: {
		color: "#424242",
		fontWeight: "bold",
		fontSize: 20,
		margin: 10,
		paddingTop: 30,
		textAlign: "center"
	},
	scannerContainer: {
		alignItems: "center",
		justifyContent: "center",
		width: scannerSize,
		height: scannerSize,
		borderWidth: 2,
		borderColor: "#E6E6E6",
		borderRadius: 10,
		overflow: "hidden"
	},
	scannerOutline: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "transparent",
		alignItems: "center",
		justifyContent: "center"
	},
	scanText: {
		color: "#424242",
		fontSize: 22,
		margin: 10,
		textAlign: "center",
		fontWeight: "bold"
	},
	cornerBorder: {
		position: "absolute",
		width: 60,
		height: 60,
		borderColor: "#FFF",
		borderWidth: 5
	},
	topLeftCorner: {
		top: 0,
		left: 0,
		borderRightWidth: 0,
		borderBottomWidth: 0
	},
	topRightCorner: {
		top: 0,
		right: 0,
		borderLeftWidth: 0,
		borderBottomWidth: 0
	},
	bottomLeftCorner: {
		bottom: 0,
		left: 0,
		borderRightWidth: 0,
		borderTopWidth: 0
	},
	bottomRightCorner: {
		bottom: 0,
		right: 0,
		borderLeftWidth: 0,
		borderTopWidth: 0
	}
});
