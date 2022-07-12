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
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
      console.log(location);

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

    return (
        <MapView
          style={{flex:1}}
          initialRegion={{
            latitude: 48.866667,
            longitude: 2.333333,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          onUserLocationChange={(e)=>{
            console.log("onUserLocationChange", e.nativeEvent.coordinate);
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        >
         <Marker key={"currentPos"}
          coordinate={pin}
          pinColor="red"
          title="Hello"
          description="I'am here"
          onDragStart={(e) => {
            console.log("Drag Start" . e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            console.log("Drag End" . e.nativeEvent.coordinate);
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
          
        />
        </MapView>
      );
}