import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NewsScreen() {
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
    alignItems: "center",
    backgroundColor: "#e67e22",
    flex: 1,
    justifyContent: "center",
    padding: 10,
    textAlign: "center",
  },
  textStyle: {
    margin: 10,
    textAlign: "center",
  },
});
