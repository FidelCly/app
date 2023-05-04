import React from "react";
import { Text, StyleSheet } from "react-native";

const CustomButton = ({ title }) => {
  return <Text style={[styles.buttonStyles]}>{title}</Text>;
};

const styles = StyleSheet.create({
  buttonStyles: {
    backgroundColor: "#5DB075",
    width: 300,
    borderRadius: 10,
    paddingBottom: 10,
    paddingTop: 10,
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CustomButton;
