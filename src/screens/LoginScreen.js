import React, { useState, useEffect } from "react";
import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import { Input } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../services";

import { FontAwesome5 } from "@expo/vector-icons";

// import { connect } from "react-redux";

export default function LoginScreen(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [userId, setUserId] = useState("");

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
			console.log("🚀 ~ handleToken ~ userId:", userId);
			if (token) {
				props.navigation.navigate("BottomNavigator", {
					screen: "Profil"
				});
			}
			console.log("🚀 ~ handleToken ~ token:", token);
		} catch (error) {
			console.log("🚀 ~ handleToken ~ error:", error);
		}
	};

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#fff",
				alignItems: "center",
				justifyContent: "center"
			}}
		>
			<Image style={{ width: 286, height: 199 }} source={require("../assets/secure_login.png")} />
			<Input
				containerStyle={{ width: "70%" }}
				inputStyle={{
					marginLeft: 10
				}}
				placeholder="Email"
				leftIcon={<FontAwesome5 name="user-alt" size={24} color="black" />}
				onChangeText={(val) => setEmail(val)}
			/>
			<Input
				containerStyle={{ marginBottom: 25, width: "70%" }}
				inputStyle={{ marginLeft: 10 }}
				placeholder="Mot de passe"
				type="password"
				secureTextEntry={true}
				leftIcon={<FontAwesome5 name="key" size={24} color="black" />}
				onChangeText={(val) => setPassword(val)}
				errorStyle={{ color: "red" }}
				renderErrorMessage="ENTER A VALID ERROR HERE"
			/>
			<Pressable
				title="Se connecter"
				type="solid"
				style={styles.buttonConnect}
				onPress={async () => {
					await loginUser(email, password);

					props.navigation.navigate("BottomNavigator", {
						screen: "Profil"
					});
				}}
			>
				<Text style={{ color: "white", fontSize: 18 }}>Se connecter</Text>
			</Pressable>
			<Text style={{ margin: 10 }}>Mot de passe oublié?</Text>
		</View>
	);
}

async function loginUser(email, password) {
	try {
		const loginUserData = await login(email, password);

		if (loginUserData && loginUserData.status === 200) {
			await AsyncStorage.setItem("token", loginUserData.token);
		}
	} catch (error) {
		console.log("🚀 ~ loginUser ~ error", error);
	}
}

const styles = StyleSheet.create({
	buttonConnect: {
		backgroundColor: "#5DB075",
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 30,
		paddingLeft: 30,
		borderRadius: 20
	}
});
