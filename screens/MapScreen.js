import React, { useState, useEffect } from 'react';

import * as Location from 'expo-location';

import {View, Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen(){


  const [pin, setPin] = React.useState({
    latitude: 48.866667,
    longitude: 2.333333,
  })

  const [region, setRegion] = React.useState({
    latitude: 48.8425461,
    longitude: 2.5803917,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,

  })
  

  React.useEffect(() => {
    
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
      console.log("First localisation:",location);
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
      
      ;
    })();
  }, []);

    return (
        <MapView
          style={{flex:1}}
          initialRegion={{
            latitude: pin.latitude,
            longitude: pin.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          onUserLocationChange={(e)=>{
            // console.log("Localisation en temps réel :", e.nativeEvent.coordinate);
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
            // console.log("Localisation temps réel:", pin.latitude);

          }}

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