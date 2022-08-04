import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import * as Location from "expo-location";

import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  const [pin, setPin] = React.useState({
    latitude: 48.866667,
    longitude: 2.333333,
  });
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== "granted") {
        setErrorMsg("L'autorisation d'accéder à la position a été refusée");
        console.log(errorMsg);
        return;
      }
      console.log(errorMsg);
      const location = await Location.getCurrentPositionAsync({});
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.errorText}>
        <Text>{errorMsg}</Text>
      </View>
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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  errorText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    color: "#ffff00",
    marginTop: 30,
  },
});
