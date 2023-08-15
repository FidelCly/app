import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, TextInput } from "react-native";
import { getPromotionById } from "../services";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../services/auth-service";
import { updateUser } from "../services/user-service";
import CustomButton from "../components/Button";
import { getUser } from "../store/reducers/user.reducer";
import { Snackbar, ActivityIndicator, MD2Colors } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeModules } from "react-native";

//Récupérer l'initiale du shop pour l'afficher sur la carte si pas d'image
const getInitials = (username) => {
	if (!username) return "";
	const words = username.split(" ");
	return words
		.map((word) => word.charAt(0))
		.join("")
		.toUpperCase();
};

//Ajuste le width à la taille de l'écran
const { width: screenWidth } = Dimensions.get("window");
const ctaWidth = screenWidth * 0.8;
const formWidth = screenWidth * 0.8;

export default function EditProfilScreen({ props, navigation }) {
	// Permet d'aller chercher l'utilisateur et le dans le store
	const user = useSelector((state) => state.users.currentUser);
	const userLoader = useSelector((state) => state.users.userLoader);
	const [snackBarVisible, setSnackbarVisible] = useState(false);
	const [snackBarMessage, setSnackbarMessage] = useState("");
	const [loader, setLoader] = useState(false);
	const dispatch = useDispatch();
	const [userId, setUserId] = useState(user && user.uuid ? user.uuid : null);

	const getUserFromStore = async () => {
		try {
			setLoader(true);
			const value = await AsyncStorage.getItem("userId");
			if (value !== null) {
				setUserId(value);
				dispatch(getUser(value));
			}
			setLoader(false);
		} catch (err) {
			setLoader(false);
			setSnackbarVisible(true);
			setSnackbarMessage(err.message);
		}
	};
	useEffect(() => {
		// Permet d'aller chercher les cartes de l'utilisateur et de les stocker dans le store
		getUserFromStore();
	}, []);

	const [email, setEmail] = useState(user && user.email ? user.email : "");
	const [lastName, setLastName] = useState(user && user.username ? user.username : "");
	const [birthDate, setBirthDate] = useState(user && user.birthday ? user.birthday.toString("YYYY/MM/DD") : "");
	const [gender, setGender] = useState(user && user.sexe ? user.sexe : "");

	return (
		<View style={styles.container}>
			{/* Header (10%) */}
			<View style={styles.header}>
				{/* Bouton retour à gauche */}
				<TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
					<Text style={styles.backButtonText}>Retour</Text>
				</TouchableOpacity>
			</View>

			{/* Photo et Nom (15%) */}
			<View style={styles.infoUser}>
				<View style={styles.leftColumn}>
					{/* Affichage de l'image dans la colonne de gauche */}
					<View style={styles.userImageContainer}>
						<View style={styles.initialsContainer}>
							<Text style={styles.initialTextBubble}>
								{getInitials(user && user.username ? user.username : "No name")}
							</Text>
						</View>
					</View>
				</View>
				<View style={styles.rightColumn}>
					{/* Contenu de la colonne de droite (70%) */}
					<Text style={styles.usernameText}>{user && user.username ? user.username : "No Name"}</Text>
				</View>
			</View>

			{/* Formulaire (60%) */}
			<View style={styles.formContainer}>
				<ScrollView style={styles.form}>
					<TextInput
						style={styles.input}
						onChangeText={setLastName}
						value={lastName}
						placeholder="Entrez votre nom"
					/>

					<TextInput
						style={styles.input}
						onChangeText={setEmail}
						editable={false}
						value={email}
						keyboardType="email-address"
						placeholder="Entrez votre email"
					/>

					<TextInput
						style={styles.input}
						onChangeText={setBirthDate}
						value={birthDate}
						keyboardType="numeric"
						placeholder="Entrez votre date de naissance"
					/>
					<TextInput
						style={styles.input}
						onChangeText={setGender}
						value={gender}
						placeholder="Entrez votre genre"
					/>
				</ScrollView>
			</View>
			{/* CTA (15%) */}
			<View style={styles.ctaContainer}>
				<TouchableOpacity
					title="Enregistrer"
					onPress={async () => {
						try {
							setLoader(true);
							user.username = lastName;
							user.birthday = birthDate;
							user.sexe = gender;

							const data = await updateUser(user);

							if (data && data.message === "User updated") {
								dispatch(getUser(userId));
								setSnackbarVisible(true);
								setSnackbarMessage("Profil mis à jour !");

								setTimeout(() => {
									navigation.navigate("BottomNavigator", {
										screen: "Profil"
									});
								}, 1000);
							} else {
								throw new Error(data.message);
							}
							setLoader(false);
						} catch (error) {
							setLoader(false);
							setSnackbarVisible(true);
							setSnackbarMessage(error.message);
						}
					}}
				>
					<CustomButton title="Enregistrer" />
				</TouchableOpacity>
			</View>
			<View style={styles.ctaContainer}>
				<TouchableOpacity
					title="Se déconnecter"
					onPress={async () => {
						try {
							setLoader(true);
							const result = await logout();
							setLoader(false);

							if (result) navigation.navigate("Login");
							NativeModules.DevSettings.reload();
						} catch (error) {
							setLoader(false);
							setSnackbarVisible(true);
							setSnackbarMessage(error.message);
						}
					}}
				>
					<Text style={[styles.ctaLogOut]}>Se déconnecter</Text>
				</TouchableOpacity>
			</View>
			<ActivityIndicator size={"large"} animating={loader} color={MD2Colors.red800} />
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
	// Info User styles
	infoUser: {
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
	userImageContainer: {
		width: 70,
		height: 70,
		borderRadius: 35,
		overflow: "hidden"
	},
	usernameText: {
		fontSize: 20,
		fontWeight: "bold",
		textTransform: "uppercase",
		color: "#FFF",
		marginBottom: 10
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
	initialTextBubble: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#424242",
		textAlign: "center"
	},
	// Info User styles
	// Formulaire styles
	formContainer: {
		flex: 0.6,
		alignItems: "center",
		justifyContent: "center"
	},
	form: {
		width: formWidth,
		textAlign: "center",
		paddingVertical: 10,
		marginTop: 20
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 10,
		padding: 10,
		borderRadius: 5
	},
	// CTA styles
	ctaContainer: {
		marginTop: 20,
		justifyContent: "center",
		alignItems: "center"
	},
	ctaLogOut: {
		backgroundColor: "#fff",
		borderColor: "#5DB075",
		borderWidth: 2,
		width: ctaWidth,
		borderRadius: 10,
		paddingBottom: 10,
		paddingTop: 10,
		textAlign: "center",
		color: "#5DB075",
		fontSize: 18,
		fontWeight: "bold"
	}
});
