import React, { useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Dimensions, ScrollView } from "react-native";
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons  } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "../store/reducers/user.reducer";

const { height } = Dimensions.get("window");
const markerIcons = {
		Restauration: "cutlery",
		Supply: "shopping-cart",
		Entertainment: "gamepad",
		Store: "grav",
		Service: "cog"
	};

const NewsScreen = (props) => {
  const user = useSelector((state) => state.users.currentUser);
  const userLoader = useSelector((state) => state.users.userLoader);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserFromStore();
  }, []);

  const getInitials = (username) => {
    if (!username) return "";
    const words = username.split(" ");
    return words.map((word) => word.charAt(0)).join("").toUpperCase();
  };

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

  const { height } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <View style={styles.userContainer}>
          <View style={styles.userPhoto}>
            <View style={styles.initialsBubble}>
              <Text style={styles.initialText}>
                {user ? getInitials(user.username) : ""}
              </Text>
            </View>
          </View>
          <View style={styles.userName}>
            {userLoader ? (
              <View>
                <Text>Chargement ...</Text>
              </View>
            ) : user ? (
              <View style={styles.usernameContainer}>
                <View>
                  <Text style={styles.usernameText}>Bonjour {user.username}</Text>
                </View>
                <View style={styles.fullWidth}>
                  <View style={styles.columnIcon}>
                    <MaterialIcons name="notifications-active" size={24} color="#fff" />
                  </View>
                  <View style={styles.columnText}>
                    <Text style={styles.infoText}>Une de vos cartes de fidélité est complète</Text>
                    <Text style={styles.infoText}>Bénéficiez de votre promotion chez "companyName"</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.errorTextStyle}>
                  Erreur lors de la récuperation des données
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.promotionSection}>
    <Text style={styles.sectionTitle}>LES PROMOTIONS DE VOS COMMERÇANTS</Text>
    <View style={styles.scrollableCard}>
        <ScrollView>
        {/* Exemple de brique */}
          <View style={styles.promoItem}>
            <View style={styles.promoItemHeader}>
                <FontAwesome5 name="gift" size={20} color="#5DB075" />
                <Text style={styles.promoCompany}>NOM DE L'ENTREPRISE</Text>
                <Text style={styles.promoDate}>du XX/XX/XX au XX/XX/XX</Text>
            </View>
            <Text style={styles.promoDescription}>Description de la promotion</Text>
          </View>
        {/* Exemple de brique */}
        {/* Exemple de brique */}
          <View style={styles.promoItem}>
            <View style={styles.promoItemHeader}>
                <FontAwesome5 name="gift" size={20} color="#5DB075" />
                <Text style={styles.promoCompany}>NOM DE L'ENTREPRISE</Text>
                <Text style={styles.promoDate}>du XX/XX/XX au XX/XX/XX</Text>
            </View>
            <Text style={styles.promoDescription}>Description de la promotion</Text>
          </View>
        {/* Exemple de brique */}
        {/* Exemple de brique */}
          <View style={styles.promoItem}>
            <View style={styles.promoItemHeader}>
                <FontAwesome5 name="gift" size={20} color="#5DB075" />
                <Text style={styles.promoCompany}>NOM DE L'ENTREPRISE</Text>
                <Text style={styles.promoDate}>du XX/XX/XX au XX/XX/XX</Text>
            </View>
            <Text style={styles.promoDescription}>Description de la promotion</Text>
          </View>
        {/* Exemple de brique */}
              {/* Exemple de brique */}
          <View style={styles.promoItem}>
            <View style={styles.promoItemHeader}>
                <FontAwesome5 name="gift" size={20} color="#5DB075" />
                <Text style={styles.promoCompany}>NOM DE L'ENTREPRISE</Text>
                <Text style={styles.promoDate}>du XX/XX/XX au XX/XX/XX</Text>
            </View>
            <Text style={styles.promoDescription}>Description de la promotion</Text>
          </View>
        {/* Exemple de brique */}
        {/* Exemple de brique */}
          <View style={styles.promoItem}>
            <View style={styles.promoItemHeader}>
                <FontAwesome5 name="gift" size={20} color="#5DB075" />
                <Text style={styles.promoCompany}>NOM DE L'ENTREPRISE</Text>
                <Text style={styles.promoDate}>du XX/XX/XX au XX/XX/XX</Text>
            </View>
            <Text style={styles.promoDescription}>Description de la promotion</Text>
          </View>
        {/* Exemple de brique */}
       

      </ScrollView>

    </View>
</View>

<View style={styles.decouvrezSection}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
      <Text style={styles.sectionTitle}>DÉCOUVREZ AUSSI</Text>
      <Pressable onPress={() => {
		      console.log("🚀 ~ NewsScreen ~ Reload Card");
      }}>
          <MaterialCommunityIcons name="refresh-circle" size={24} color="#5DB075" />
      </Pressable>
    </View>
    <View style={styles.scrollableCard}>
      <ScrollView>
        {/* Exemple de brique */}
          <View style={styles.promoItem}>
            <View style={styles.promoItemHeader}>
                <FontAwesome5 name="gift" size={20} color="#5DB075" />
                <Text style={styles.promoCompany}>NOM DE L'ENTREPRISE</Text>
                <Text style={styles.promoDate}>du XX/XX/XX au XX/XX/XX</Text>
            </View>
            <Text style={styles.promoDescription}>Description de la promotion</Text>
          </View>
        {/* Exemple de brique */}
        {/* Exemple de brique */}
          <View style={styles.promoItem}>
            <View style={styles.promoItemHeader}>
                <FontAwesome5 name="gift" size={20} color="#5DB075" />
                <Text style={styles.promoCompany}>NOM DE L'ENTREPRISE</Text>
                <Text style={styles.promoDate}>du XX/XX/XX au XX/XX/XX</Text>
            </View>
            <Text style={styles.promoDescription}>Description de la promotion</Text>
          </View>
        {/* Exemple de brique */}
        {/* Exemple de brique */}
          <View style={styles.promoItem}>
            <View style={styles.promoItemHeader}>
                <FontAwesome5 name="gift" size={20} color="#5DB075" />
                <Text style={styles.promoCompany}>NOM DE L'ENTREPRISE</Text>
                <Text style={styles.promoDate}>du XX/XX/XX au XX/XX/XX</Text>
            </View>
            <Text style={styles.promoDescription}>Description de la promotion</Text>
          </View>
        {/* Exemple de brique */}
              {/* Exemple de brique */}
          <View style={styles.promoItem}>
            <View style={styles.promoItemHeader}>
                <FontAwesome5 name="gift" size={20} color="#5DB075" />
                <Text style={styles.promoCompany}>NOM DE L'ENTREPRISE</Text>
                <Text style={styles.promoDate}>du XX/XX/XX au XX/XX/XX</Text>
            </View>
            <Text style={styles.promoDescription}>Description de la promotion</Text>
          </View>
        {/* Exemple de brique */}
        {/* Exemple de brique */}
          <View style={styles.promoItem}>
            <View style={styles.promoItemHeader}>
                <FontAwesome5 name="gift" size={20} color="#5DB075" />
                <Text style={styles.promoCompany}>NOM DE L'ENTREPRISE</Text>
                <Text style={styles.promoDate}>du XX/XX/XX au XX/XX/XX</Text>
            </View>
            <Text style={styles.promoDescription}>Description de la promotion</Text>
          </View>
        {/* Exemple de brique */}
       

      </ScrollView>

        
        
        {/* Vous pouvez ajouter plus de briques identiques ici */}
    </View>
</View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

// HEADER SECTION

  header: {
    flex: 0.28,
    backgroundColor: "#5DB075",
    flexDirection: "column",
  },
 
  userContainer: {
    marginTop: 30,

    flex: 1,
    flexDirection: "row",
  },
  userPhoto: {
    flex: 0.3,
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
    flex: 0.7,
  },
  usernameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  usernameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    fontWeight: "bold",
  },
  infoText: {
    color: '#fff',
    fontSize: 12,
  },
  fullWidth: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  columnIcon: {
    flex: 0.15,
  },
  columnText: {
    flex: 0.85,
    marginLeft: 5,
  },
// FIN HEADER SECTION


// PROMOTION SECTION
  promotionSection: {
    flex: 0.36,
  },
// FIN PROMOTION SECTION

// DECOUVREZ SECTION
  decouvrezSection: {
    flex: 0.36,
  },
// FIN DECOUVREZ SECTION
 sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666666',
    textTransform: 'uppercase',
    padding: 10,
    height: height * 0.060,
  },

  scrollableCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    margin: 5,
    maxHeight: height * 0.25,  // Ajustez selon la taille désirée
  },

  promoItem: {
    flexDirection: 'column',
    // alignItems: 'center',
    borderBottomColor: 'darkgray',
    borderBottomWidth: 0.3,
    padding: 10
  },
  promoItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  promoCompany: {
    color: '#E5B824',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
    flex: 2,
  },

  promoDate: {
    fontSize: 9,
    flex: 1,
  },

  promoDescription: {
    fontSize: 12,
    color: 'darkgray',
    marginTop: 5,
  },

});

export default NewsScreen;
