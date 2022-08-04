import React, { useState, useEffect } from 'react';

import * as Location from 'expo-location';

import {View, Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen(){

  const [pin, setPin] = React.useState({
    latitude: 48.866667,
    longitude: 2.333333,
  })

  React.useEffect(() => {
    
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

    return (
        <MapView
          style={{flex:1}}
          region={{
            latitude: pin.latitude,
            longitude: pin.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
         <Marker key={"currentPos"}
          coordinate={pin}
          pinColor="red"
          title="Hello"
          description="I'am here"
        />
        </MapView>
      );
}