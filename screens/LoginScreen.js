import React, { useState } from "react";
import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import { Input } from "@rneui/themed";

import { FontAwesome5 } from "@expo/vector-icons";

// import { connect } from "react-redux";

export function LoginScreen(props) {
	const [username, setUsername] = useState("");

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
				onChangeText={(val) => setUsername(val)}
			/>
			<Input
				containerStyle={{ marginBottom: 25, width: "70%" }}
				inputStyle={{ marginLeft: 10 }}
				placeholder="Mot de passe"
				type="password"
				secureTextEntry={true}
				leftIcon={<FontAwesome5 name="key" size={24} color="black" />}
				errorStyle={{ color: "red" }}
				renderErrorMessage="ENTER A VALID ERROR HERE"
			/>
			<Pressable
				title="Se connecter"
				type="solid"
				style={styles.buttonConnect}
				onPress={() => {
					props.onSubmitUsername(username);
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

// function mapDispatchToProps(dispatch) {
// 	return {
// 		onSubmitUsername: function (username) {
// 			dispatch({ type: "saveUsername", username });
// 		}
// 	};
// }

// export default connect(null, mapDispatchToProps)(LoginScreen);
