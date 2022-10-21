import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { API_URL } from "@env";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.url}</Text>
  </TouchableOpacity>
);

const CardScreen = () => {
  const userId = 1;
  const [getWalletFromUser, setGetWalletFromUser] = useState([]);

  // URL API Affiche les cartes clients que le user a enregistré dans son wallet
  const urlGetWalletFromUser = API_URL + "/users/" + userId + "/wallet/";
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getWalletFromApi = async () => {
    try {
      const response = await fetch(urlGetWalletFromUser);
      const json = await response.json();
      setGetWalletFromUser(json);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWalletFromApi();
  }, []);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#367a4a" : "#5DB075";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {isLoading ? (
          <Text>Chargement ...</Text>
        ) : (
          <FlatList
            data={getWalletFromUser}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 50,
    paddingLeft: 10,
    paddingBottom: 50,
    paddingRight: 10,
  },
  textStyle: {
    textAlign: "center",
    margin: 10,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
});
