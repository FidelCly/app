import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 18,
        }}
      >
        Page Accueil / News / Actualités
      </Text>
      <View style={{ paddingTop: 20 }}>
        <Ionicons name="construct-sharp" size={28} color="black" />
      </View>
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        En maintenance
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e67e22",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  textStyle: {
    textAlign: "center",
    margin: 10,
  },
});
