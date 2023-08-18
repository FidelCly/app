import React, { useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import { Text, View, StyleSheet, Pressable, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "../store/reducers/user.reducer";

const ProfilScreen = (props) => {
  // Permet d'aller chercher l'utilisateur et le dans le store
  const user = useSelector((state) => state.users.currentUser);
  const userLoader = useSelector((state) => state.users.userLoader);

  const getInitials = (username) => {
    if (!username) return "";
    const words = username.split(" ");
    return words
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  const screenWidth = Dimensions.get("window").width;

  const dispatch = useDispatch();

  useEffect(() => {
    // Permet d'aller chercher les cartes de l'utilisateur et de les stocker dans le store
    getUserFromStore();
  }, []);

  const fetchUserFromStore = (userId) => {
    dispatch(getUser(userId));
  };

  const getUserFromStore = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      if (value !== null) {
        fetchUserFromStore(value);
      }
    } catch (err) {
      // Implement visual error handling
    }
  };

  return (
    <View style={styles.container}>
      {/* Header (30%) */}
      <View style={styles.header}>
        {/* First row Icon Reglage en haut à droite 20%*/}
        <View style={styles.iconReglage}>
          <Pressable
            title="Go to Edit Profile"
            type="solid"
            onPress={() => {
              props.navigation.navigate("EditProfil");
            }}
          >
            <FontAwesome5 name="cog" size={24} color="white" />
          </Pressable>
        </View>
        {/* Fin First row Icon Reglage en haut à droite 20%*/}
        {/* Second Row photo user à gauche et username à droite 80%*/}
        <View style={styles.userContainer}>
          {/* Column photo user à gauche 40%*/}
          <View style={styles.userPhoto}>
            <View style={styles.initialsBubble}>
              <Text style={styles.initialText}>
                {user ? getInitials(user.username) : ""}
              </Text>
            </View>
          </View>
          {/* Fin Column photo user à gauche 40%*/}

          {/* Username user à droite 60%*/}
          <View style={styles.userName}>
            {userLoader ? (
              <View>
                <Text>Chargement ...</Text>
              </View>
            ) : user && user !== null ? (
              <View style={styles.usernameContainer}>
                <Text style={styles.usernameText}>{user.username}</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.errorTextStyle}>
                  Erreur lors de la récuperation des données
                </Text>
              </View>
            )}
          </View>
          {/* Fin Username user à droite 60%*/}
        </View>

        {/* Fin Second Row photo user à gauche et username à droite 80%*/}
      </View>

      {/* Zone QR Code (70%) */}
      <View style={styles.qrCode}>
        {user && user !== null ? (
          <View style={styles.qrContainer}>
            <QRCode
              value={user.uuid}
              size={screenWidth * 0.8}
              color="black"
              backgroundColor="white"
              logoSize={30}
              logoMargin={2}
              logoBorderRadius={15}
            />
            <Text style={styles.consigneScan}>
              Présentez votre QR code unique à votre commerçant pour profiter du
              programme de fidélité
            </Text>
          </View>
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Chargement ...</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  // HEADER
  header: {
    flex: 0.3,
    backgroundColor: "#5DB075",
    flexDirection: "column",
  },
  iconReglage: {
    flex: 0.2,
    alignItems: "flex-end",
    padding: 10,
    marginTop: 30,
  },
  userContainer: {
    flex: 0.8,
    flexDirection: "row",
  },
  userPhoto: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  initialsBubble: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  initialText: {
    fontSize: 28,
    color: "#5DB075",
    fontWeight: "bold",
  },
  userName: {
    flex: 0.6,
    flexDirection: "row",
    alignItems: "center",
  },
  usernameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  errorTextStyle: {
    color: "red",
    fontWeight: "bold",
  },
  qrCode: {
    flex: 0.7,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  qrContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  consigneScan: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    textAlign: "center",
    color: "#000",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#000",
  },
});
