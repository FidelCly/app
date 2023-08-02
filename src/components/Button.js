import React from "react";
import { Text, StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const ctaWidth = screenWidth * 0.8;

const CustomButton = ({ title }) => {
  return <Text style={[styles.buttonStyles]}>{title}</Text>;
};

const styles = StyleSheet.create({
  buttonStyles: {
    backgroundColor: "#5DB075",
    width: ctaWidth,
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
