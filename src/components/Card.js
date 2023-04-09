import React from "react";
import { View, StyleSheet } from "react-native";
const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};
const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: "90%",
    alignSelf: "center",
    // backgroundColor: "#808080",
    marginTop: 10,
  },
});
export default Card;
