import React, { useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView, Text, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "../store/reducers/user.reducer";
import { logout } from "../services/auth-service";

const ProfilScreen = (props) => {
	// Permet d'aller chercher l'utilisateur et le dans le store
	const user = useSelector((state) => state.users.currentUser);
	const userLoader = useSelector((state) => state.users.userLoader);
	const dispatch = useDispatch();

	useEffect(() => {
		// Permet d'aller chercher les cartes de l'utilisateur et de les stocker dans le store
		getUserFromStore();
	}, []);

	const fetchUserFromStore = (userId) => {
		dispatch(getUser(userId));
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

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				{userLoader ? (
					<View>
						<Text>Chargement ...</Text>
					</View>
				) : user && user !== null ? (
					<View>
						<Text
							style={{
								fontSize: 20,
								fontWeight: "bold",
								padding: 20,
								marginTop: 30
							}}
						>
							<Ionicons name="person-sharp" size={24} color="black" />
							{user.username}
						</Text>
					</View>
				) : (
					<View>
						<Text style={styles.textStyle}>Erreur lors de la récuperation des données</Text>
					</View>
				)}
				<View
					style={{
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					{user && user !== null ? (
						<View style={styles.container}>
							<Text style={styles.textStyle}>
								Présentez votre QR code unique à votre commerçant pour profiter du programme de fidélité
							</Text>
							<QRCode
								value={user.uuid}
								size={180}
								color="black"
								backgroundColor="white"
								logoSize={30}
								logoMargin={2}
								logoBorderRadius={15}
							/>
						</View>
					) : (
						<View>
							<Text>Chargement ...</Text>
						</View>
					)}

					{
						<Pressable
							style={{
								backgroundColor: "#f15454",
								padding: 15,
								borderRadius: 10,
								marginBottom: 50,
								display: "flex" // bug sur android, ne pas activer
							}}
							onPress={async () => {
								try {
									const result = await logout();
									if (result) {
										props.navigation.navigate("Login");
									}
								} catch (error) {}
							}}
						>
							<Text style={{ color: "white" }}>Se déconnecter</Text>
						</Pressable>
					}
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ProfilScreen;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: "white",
		flex: 1,
		justifyContent: "center",
		padding: 10,
		textAlign: "center"
	},
	textStyle: {
		margin: 10,
		textAlign: "center"
	}
});
