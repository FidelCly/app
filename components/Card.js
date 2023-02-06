import React from "react";
import { View, StyleSheet } from "react-native";
const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};
const styles = StyleSheet.create({
  card: {
    width: 260,
    height: 300,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "green",
    padding: 30,
    borderRadius: 20,
  },
});
export default Card;
