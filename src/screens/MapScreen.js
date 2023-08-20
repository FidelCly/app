/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Callout } from "react-native-maps";
import Slider from "@react-native-community/slider";
import { getAllShops, getNearShops } from "../services";
import { Snackbar, ActivityIndicator, MD2Colors } from "react-native-paper";

import { getCards } from "../store/reducers/card.reducer";

import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

export default function MapScreen(props) {
  const [pin, setPin] = useState({
    latitude: 48.866667,
    longitude: 2.333333,
  });
  const [hasPermissionLocation, setHasPermissionLocation] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [shopNearMyPosition, setShopNearMyPosition] = useState([]);
  const [allShop, setAllShop] = useState([]);
  const [distance, setDistance] = useState(10000);


  const dispatch = useDispatch();

  // Dans le cas où l'utilisateur n'a pas autorisé la localisation
  // On affiche la carte à PARIS
  const PARIS_COORDINATES = {
    latitude: 48.866667,
    longitude: 2.333333,
  };

  const mapStyle = [
    // Commerces et activités
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
    // Transport en commun
    {
      featureType: "transit",
      stylers: [{ visibility: "off" }],
    },
  ];

  const markerIcons = {
    Restauration: require("../assets/icon_restauration_v2.png"),
    Supply: require("../assets/icon_supply_v2.png"),
    Entertainment: require("../assets/icon_entertainement_v2.png"),
    Store: require("../assets/icon_store_v2.png"),
    Service: require("../assets/icon_service_v2.png"),
  };

  const activityLabels = {
    Restauration: "Restauration",
    Entertainment: "Divertissement",
    Service: "Service",
    Supply: "Alimentation",
    Store: "Magasin",
  };

  function formatAddress(address) {
  const parts = address.split(', ');
  if (parts.length >= 2) {
    const [street, cityZip] = parts;
    return `${street}\n${cityZip}`;
  }
  return address;
}

  useEffect(() => {
    (async () => {
      try {
        dispatch(getCards());
        const { status } = await Location.requestForegroundPermissionsAsync();
        setHasPermissionLocation(status === "granted");
        if (status === "granted") {
          setLoading(true);
          const { coords } = await Location.getCurrentPositionAsync({});
          setPin({ latitude: coords.latitude, longitude: coords.longitude });
          const nearShops = await getNearShops(
            distance,
            coords.latitude,
            coords.longitude
          );
          if (nearShops && nearShops.length > 0) {
            setShopNearMyPosition(nearShops);
          }
          const allShopData = await getAllShops();
          if (allShopData && allShopData.length > 0) {
            setAllShop(allShopData);
          }
          setLoading(false);
        }
        else {
      // Dans le cas où il a refusé la localisation
          setLoading(true);
          const allShopData = await getAllShops();
          if (allShopData && allShopData.length > 0) {
            setAllShop(allShopData);
          }
          setLoading(false);
      }
    }
      catch (error) {
        console.error("🚀 ~ error:", error);
      }
    })();
  }, [distance, dispatch]);

  const handleDistanceChange = async (newDistance) => {
    try {
      setLoading(true);
      const { coords } = await Location.getCurrentPositionAsync({});

      setDistance(newDistance);
      const datas = await getNearShops(
        distance,
        coords.latitude,
        coords.longitude
      );

      if (datas) {
        setShopNearMyPosition(datas);
      }
      setLoading(false);
    } catch (error) {
      console.error("🚀 ~ handleDistanceChange ~ error:", error);
    }
  };

  if (hasPermissionLocation === null) {
    return <Text>Demande d'autorisation de la localisation</Text>;
  }
  if (hasPermissionLocation === false) {

    
    return (
    <View style={styles.container}>
      <Text style={styles.errorMsg}>
        L'application nécessite une autorisation pour accéder à la localisation
      </Text>

      <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: PARIS_COORDINATES.latitude,
            longitude: PARIS_COORDINATES.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
        >
          <Marker
            key={"currentPos"}
            coordinate={pin}
            pinColor="red"
            title="Hii"
            description="I'am here"
          />
          {allShop.map((shop) => (
            <Marker
              key={shop.id}
              coordinate={{
                latitude: parseFloat(shop.lat),
                longitude: parseFloat(shop.long),
              }}
              image={markerIcons[shop.activity]}
            >
              <Callout
                style={styles.calloutContainer}
                onPress={() => {
                  if (shop) {
                    props.navigation.navigate("InfoShopToAdd", {
                      screen: "InfoShopToAddScreen",
                      props,
                      shop,
                      previousScreen: "Plan",
                    });
                  } else {
                    console.error("shop is undefined");
                  }
                }}
              >
                <View style={styles.calloutHeader}>
                  <Text style={styles.companyName}>{shop.companyName}</Text>
                  <Image
                    source={{ uri: shop.pictureUrl }}
                    style={styles.shopLogo}
                  />
                </View>
                <View style={styles.separator} />
                <View style={styles.calloutDetails}>
                  <View style={styles.detailsLeftColumn}>
                    <Text style={styles.activity}>{activityLabels[shop.activity]}</Text>
                    <Text style={styles.address}>{formatAddress(shop.address)}</Text>
                  </View>
                  <View style={styles.detailsRightColumn}>
                    <Ionicons
                      name="add-circle-outline"
                      size={36}
                      color="green"
                    />
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
    </View>
  );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          value={distance}
          minimumValue={1000}
          maximumValue={30000}
          step={1000}
          onValueChange={handleDistanceChange}
        />
        <Text style={styles.sliderValue}>{distance / 1000} KM</Text>
      </View>
      {isLoading ? (
        <View style={styles.onLoading}>
          <Text>Chargement des données ...</Text>
          <ActivityIndicator
            style={{ position: "relative", top: 10, left: 0 }}
            size={"small"}
            animating={true}
            color={MD2Colors.green200}
          />
        </View>
      ) : (
        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: pin.latitude,
            longitude: pin.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
        >
          <Marker
            key={"currentPos"}
            coordinate={pin}
            pinColor="red"
            title="Hello"
            description="I'am here"
          />
          {shopNearMyPosition.map((shop) => (
            <Marker
              key={shop.id}
              coordinate={{
                latitude: parseFloat(shop.lat),
                longitude: parseFloat(shop.long),
              }}
              image={markerIcons[shop.activity]}
            >
              <Callout
                style={styles.calloutContainer}
                onPress={() => {
                  if (shop) {
                    props.navigation.navigate("InfoShopToAdd", {
                      screen: "InfoShopToAddScreen",
                      props,
                      shop,
                      previousScreen: "Plan",
                    });
                  } else {
                    console.error("shop is undefined");
                  }
                }}
              >
                <View style={styles.calloutHeader}>
                  <Text style={styles.companyName}>{shop.companyName}</Text>
                  <Image
                    source={{ uri: shop.pictureUrl }}
                    style={styles.shopLogo}
                  />
                </View>
                <View style={styles.separator} />
                <View style={styles.calloutDetails}>
                  <View style={styles.detailsLeftColumn}>
                    <Text style={styles.activity}>{activityLabels[shop.activity]}</Text>
                    <Text style={styles.address}>{formatAddress(shop.address)}</Text>
                  </View>
                  <View style={styles.detailsRightColumn}>
                    <Ionicons
                      name="add-circle-outline"
                      size={36}
                      color="green"
                    />
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonAllowLocation: {
    backgroundColor: "#E5B824",
    borderRadius: 20,
    textAlign: "center",
    padding: 15,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 100,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  onLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMsg: {
    marginBottom: 20,
  },
  sliderContainer: {
    position: "absolute",
    zIndex: 1,
    top: 60,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slider: {
    flex: 1,
    marginRight: 10,
  },
  sliderValue: {
    fontWeight: "bold",
  },
  popUpCardInfo: {
    width: 200,
  },
  calloutContainer: {
    width: 260,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 0.5,
    borderColor: "#ccc",
  },
  calloutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  shopLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  separator: {
    height: 1,
    backgroundColor: "#bbb",
    marginVertical: 8,
  },
  calloutDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsLeftColumn: {},
  detailsRightColumn: {
    alignItems: "center",
    justifyContent: "center",
  },
  activity: {
    fontSize: 14,
    color: "red",
  },
  address: {
    fontSize: 12,
    color: "#666",
    maxWidth: 180,
  },
});
