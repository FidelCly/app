/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Slider from "@react-native-community/slider";

export default function MapScreen(props) {
  const API_URL = process.env.API_URL;

  const [pin, setPin] = useState({
    latitude: 48.866667,
    longitude: 2.333333,
  });
  const [hasPermissionLocation, setHasPermissionLocation] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [shopNearMyPosition, setShopNearMyPosition] = useState([]);
  const [distance, setDistance] = useState(3000);

  const askForLocationPermissionAgain = useCallback(async () => {
    const location = await Location.getCurrentPositionAsync({});
    setPin({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }, []);

  const url = useMemo(() => {
    return `${API_URL}/shops/?d=${distance}&long=${pin.longitude}&lat=${pin.latitude}`;
  }, [pin]);
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
    Restauration: require("../src/icon_restauration.png"),
    Supply: require("../src/icon_supply.png"),
    Entertainment: require("../src/icon_entertainement.png"),
    Store: require("../src/icon_store.png"),
    Service: require("../src/icon_service.png"),
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermissionLocation(status === "granted");
      if (status === "granted") {
        const { coords } = await Location.getCurrentPositionAsync({});
        setPin({ latitude: coords.latitude, longitude: coords.longitude });
        fetch(url)
          .then((res) => res.json())
          .then((json) => setShopNearMyPosition(json))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      }
    })();
  }, [askForLocationPermissionAgain, url]);

  const handleDistanceChange = (newDistance) => {
    setDistance(newDistance);
    fetch(
      `${API_URL}/shops/?d=${newDistance}&long=${pin.longitude}&lat=${pin.latitude}`
    )
      .then((res) => res.json())
      .then((json) => setShopNearMyPosition(json))
      .catch((error) => console.error(error));
  };

  if (hasPermissionLocation === null) {
    return <Text>Demande d'autorisation de la localisation</Text>;
  }
  if (hasPermissionLocation === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorMsg}>
          L'application nécessite une autorisation pour accéder à la
          localisation
        </Text>
        <Pressable
          title={"Autoriser la localisation"}
          onPress={() => askForLocationPermissionAgain()}
          style={styles.text}
        >
          <Text style={styles.buttonAllowLocation}>
            Autoriser la localisation
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          value={distance}
          minimumValue={100}
          maximumValue={5000}
          step={100}
          onValueChange={handleDistanceChange}
        />
        <Text style={styles.sliderValue}>{distance} m</Text>
      </View>
      {isLoading ? (
        <View style={styles.onLoading}>
          <Text>Chargement des données ...</Text>
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
              title={shop.companyName}
              description={shop.activity}
              image={markerIcons[shop.activity]}
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  onLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#6600ff",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  errorMsg: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    padding: 30,
  },
  buttonAllowLocation: {
    backgroundColor: "#E5B824",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 20,
    marginTop: 20,
    color: "#fff",
    fontSize: 16,
  },
  sliderContainer: {
    backgroundColor: "transparent",
  },
  slider: {
    marginTop: 10,
  },
  sliderValue: {
    paddingLeft: 20,
  },
});
