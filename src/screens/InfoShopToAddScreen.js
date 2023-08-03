import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/Button";


const API_URL = process.env.API_URL;
const { width: screenWidth } = Dimensions.get("window");
const ctaWidth = screenWidth * 0.8;


export default function InfoShopToAddScreen(props) {


  //Récupérer l'initiale du shop pour l'afficher sur la carte si pas d'image
  // const getInitials = (companyName) => {
  //   if (!companyName) return "";
  //   const words = companyName.split(" ");
  //   return words
  //     .map((word) => word.charAt(0))
  //     .join("")
  //     .toUpperCase();
  // };

  return (
    <View style={styles.container}>
      {/* Header (10%) */}
      <View style={styles.header}>
        {/* Bouton retour à gauche */}
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => props.navigation.navigate("Plan")}
        >
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>

      {/* Info Shop (15%) */}
      <View style={styles.infoShop}>
        <View style={styles.leftColumn}>
          {/* Affichage de l'image dans la colonne de gauche */}
          <View style={styles.shopImageContainer}>
            
              <View style={styles.initialsContainer}>
                <Text style={styles.cardText}>
                  Hello BG
                </Text>
              </View>
            
          </View>
        </View>
        <View style={styles.rightColumn}>
          {/* Contenu de la colonne de droite (70%) */}
          <Text style={styles.companyNameText}>companyName</Text>
          <View style={styles.activityContainer}>
            <Text style={styles.activityText}>Activité</Text>
          </View>
          <View style={styles.addressContainer}>
            <Ionicons name="location-sharp" size={20} color="red" />
            <Text style={styles.addressText}>
              Adresse
            </Text>
          </View>
        </View>
      </View>

      {/* Description (20%) */}
      <View style={styles.description}>
        <Text style={styles.descriptionTitle}>
          Un petit mot de votre commerçant
        </Text>
        <Text style={styles.descriptionText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis,
          nisl a sagittis pretium, nunc felis congue est, vitae venenatis orci
          tellus vitae lacus. Proin sed urna nec lectus eleifend fringilla.
        </Text>
        <Text style={styles.signature}>Signature du commerçant</Text>
      </View>

      {/* Promotions en cours (45%) */}
      <View style={styles.promotions}>
        <ScrollView style={styles.promotions}>
          <Text style={styles.promotionsTitle}>Promotions en cours</Text>
          {/* Liste des promotions */}
         
            <View style={styles.promotionsContainer}>
              <View style={styles.promotionsTextContainer}>
                <Text
                  style={[styles.promotionsText, styles.promotionsTextLeft]}
                >
                 Promotion name
                </Text>
              </View>
              <Text style={styles.dateText}>
                Du date
              </Text>
            </View>
          
        </ScrollView>
      </View>
      {/* CTA ajouter (10%) */}

      <View style={styles.ctaContainer}>
        <TouchableOpacity
          title="Ajouter à mon wallet"
          onPress={async () => {
          }}
        >
          <CustomButton title="Ajouter à mon wallet" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  // HEADER STYLES
  header: {
    flex: 0.1,
    backgroundColor: "#5DB075",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  goBackButton: {
    position: "absolute",
    left: 10,
    paddingHorizontal: 10,
  },
  backButtonText: {
    color: "#424242",
    fontSize: 16,
    marginTop: 20,
    textDecorationLine: "underline",
  },
  // HEADER STYLES
  // Info Shop styles
  infoShop: {
    flex: 0.2,
    flexDirection: "row",
  },
  leftColumn: {
    flex: 0.35,
    backgroundColor: "#5DB075",
    justifyContent: "center",
    alignItems: "center",
  },
  rightColumn: {
    flex: 0.65,
    backgroundColor: "#5DB075",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  shopImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
  },
  shopImage: {
    width: "100%",
    height: "100%",
  },
  companyNameText: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#FECF33",
    marginBottom: 10,
  },
  activityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  activityText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressText: {
    fontSize: 12,
    marginLeft: 5,
  },
  initialsContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    display: "flex",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#424242",
    textAlign: "center",
  },
  // Info Shop styles
  // Description styles
  description: {
    flex: 0.15,
    backgroundColor: "#fff",
    padding: 20,
  },
  descriptionTitle: {
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  descriptionText: {
    fontStyle: "italic",
    textAlign: "left",
    marginBottom: 20,
    fontSize: 12,
  },
  signature: {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 12,
  },
  // Description styles

  // Promotions styles
  promotions: {
    flex: 0.45,
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  promotionsTitle: {
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  promotionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  promotionsTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  promotionsText: {
    color: "#333",
    fontSize: 20,
  },
  promotionsTextLeft: {
    flex: 0.7,
  },
  dateText: {
    textAlign: "left",
    fontSize: 12,
    marginTop: 10,
  },
  // Promotions styles
 ctaContainer: {
  flex: 0.1,
  alignItems: 'center',
},
});
