/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";

import * as Location from "expo-location";

import MapView, { Marker } from "react-native-maps";

export default function MapScreen(props) {
  const [pin, setPin] = React.useState({
    latitude: 48.866667,
    longitude: 2.333333,
  });

  const [hasPermissionLocation, setHasPermissionLocation] = useState(null);

  const askForLocationPermission = () => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermissionLocation(status === "granted");
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  };

  useEffect(async () => {
    askForLocationPermission();
    const location = await Location.getCurrentPositionAsync({});
    setPin({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }, []);

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
          onPress={() => askForLocationPermission()}
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
      <MapView
        style={styles.map}
        region={{
          latitude: pin.latitude,
          longitude: pin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
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
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
