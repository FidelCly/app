import { httpMessage } from "../store/http-translation";
import React, { useState, useEffect } from "react";
import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import { Input } from "@rneui/themed";
import { login, register } from "../services";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/Button";
import { Snackbar, ActivityIndicator, MD2Colors } from "react-native-paper";
import { getUser } from "../store/reducers/user.reducer";
import { getCards } from "../store/reducers/card.reducer";
import { useSelector, useDispatch } from "react-redux";
import { getAllShop } from "../store/reducers/shop.reducer";

export default function LoginScreen(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [snackBarVisible, setSnackbarVisible] = useState(false);
	const [snackBarMessage, setSnackbarMessage] = useState("");
	const [loader, setLoader] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		handleToken();
	}, []);

	/**
	 * handleToken
	 * @desc check if there's a token in the storage
	 */
	const handleToken = async () => {
		try {
			const token = await AsyncStorage.getItem("token");
			const userId = await AsyncStorage.getItem("userId");
			if (userId && token) {
				props.navigation.navigate("BottomNavigator", {
					screen: "Accueil"
				});
			}
		} catch (error) {}
	};

	const initDatasInStore = (userId) => {
		dispatch(getUser(userId));
		dispatch(getAllShop());
		dispatch(getCards());
	};

	return (
		<View style={styles.registerScreen__container}>
			<View style={styles.registerScreen__header}>
				<FontAwesome5 name="arrow-left" size={24} style={styles.iconArrowLeft} />
				<Pressable title="Retour" type="solid" onPress={() => props.navigation.navigate("Home")}>
					<Text style={[styles.text__retour]}>Retour</Text>
				</Pressable>
			</View>

			<View style={styles.registerScreen__body}>
				<Input
					containerStyle={{ width: "85%" }}
					inputStyle={styles.app__inputStyle}
					placeholder="Adresse email"
					onChangeText={(val) => setEmail(val)}
				/>
				<Input
					containerStyle={{ width: "85%" }}
					inputStyle={styles.app__inputStyle}
					placeholder="Mot de passe"
					type="password"
					secureTextEntry={true}
					rightIcon={<FontAwesome5 name="eye" size={24} style={styles.iconEye} />}
					onChangeText={(val) => setPassword(val)}
					errorStyle={{ color: "red" }}
					renderErrorMessage="Adresse email ou mot de passe incorrect"
				/>

				<View style={[styles.mb40]}>
					<Pressable
						title="Créer un compte"
						type="solid"
						onPress={async () => {
							try {
								setLoader(true);
								await verifyForm(email, password);
								await registerUser(email, password);
								const userId = await AsyncStorage.getItem("userId");

								if (userId) {
									initDatasInStore(userId);
								}

								setLoader(false);
								props.navigation.navigate("BottomNavigator", {
									screen: "Accueil"
								});
							} catch (error) {
								setLoader(false);
								setSnackbarVisible(true);
								setSnackbarMessage(error.message);
							}
						}}
					>
						<CustomButton title="Créer un compte" />
					</Pressable>
				</View>

				<ActivityIndicator size={"large"} animating={loader} color={MD2Colors.red800} />

				<View style={[styles.mb40]}></View>
				<Text>Déjà inscrit ?</Text>
				<Pressable title="Se connecter" type="solid" onPress={() => props.navigation.navigate("Login")}>
					<Text style={[styles.text__greenUnderline]}>Se connecter</Text>
				</Pressable>
			</View>

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

/**
 * registerUser
 */
async function registerUser(email, password) {
	const registerResponse = await register(email, password);
	if (registerResponse.status !== 201) {
		throw new Error(
			`${httpMessage[registerResponse.status][registerResponse.data.message]}` || "Une erreur est survenue"
		);
	}

	const registerUserData = registerResponse.data;

	if (registerUserData) {
		const loginResponse = await login(email, password);

		if (loginResponse.status !== 200) {
			throw new Error(
				`${httpMessage[loginResponse.status][loginResponse.data.message]}` || "Une erreur est survenue"
			);
		}

		const loginDatas = loginResponse.data;

		if (loginDatas && loginDatas.status === 200) {
			AsyncStorage.setItem("userId", loginDatas.userUuid);
			AsyncStorage.setItem("token", loginDatas.token);

			return Promise.resolve(true);
		} else {
			throw new Error(`${httpMessage[loginDatas.status][loginDatas.message]}` || "Une erreur est survenue");
		}
	} else {
		throw new Error(
			`${httpMessage[registerResponse.status][registerResponse.message]}` || "Une erreur est survenue"
		);
	}
}

/**
 * verifyForm
 */
async function verifyForm(email, password) {
	if (email === "" || password === "" || password.length < 8) {
		throw new Error("Adresse email ou mot de passe incorrect");
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		throw new Error("Adresse email invalide");
	}

	return Promise.resolve(true);
}

// Styles

const styles = StyleSheet.create({
	width100: {
		width: "100%",
		alignItems: "center"
	},
	mb40: {
		marginBottom: 40
	},
	registerScreen__container: {
		flex: 1,
		backgroundColor: "#f5f5f5"
	},
	registerScreen__header: {
		flexDirection: "row",
		marginTop: 50
	},
	registerScreen__body: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center"
	},
	icon__retour: {
		flexDirection: "row",
		marginRight: 20
	},
	text__retour: {
		color: "#424242",
		fontSize: 16
	},

	app__inputStyle: {
		padding: 10,
		backgroundColor: "white",
		fontSize: 16
	},
	iconEye: { position: "absolute", right: 20, color: "grey" },
	iconArrowLeft: { marginLeft: 20, marginRight: 20, color: "#5DB075" },

	text__greenUnderline: {
		color: "#5DB075",
		textDecorationLine: "underline",
		fontSize: 16,
		fontWeight: "bold"
	}
});
