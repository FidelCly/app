import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Button, Text, Pressable } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';



export default function ScanScreen(props){
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Scanner le QR code de votre commerçant pour l'ajouter dans votre wallet");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    })()
  }
  
  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log('Type:', type + '\nData URL QR CODE:', data);
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return(
      <View style={styles.container}>
        <Text>L'application nécessite une autorisation pour accéder à la caméra</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()}/>
      </View>

    ) 
  }  

    return (
        <View style={styles.container}>
          <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{height:400, width:400}}
          />
          </View>
          <Text style={styles.maintext}>{text}</Text>
          {scanned && 
          <View>
            <Pressable style={styles.buttonTapAgain} onPress={() => setScanned(false)}>
              <Text style={{color: 'white', fontSize:18}}>Scanner à nouveau</Text>
            </Pressable >
            <Pressable style={styles.addWallet} onPress={() => props.navigation.navigate('BottomNavigator', {screen:'Wallet'})}>
              <Text style={{color: 'white', fontSize:18}}>Ajouter au Wallet</Text>
            </Pressable > 
          </View>
             
          }
        </View>

         
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#5DB075',
    alignItems: 'center',
    justifyContent: 'center',
  },

  barcodebox:{
    alignItems:'center',
    justifyContent:'center',
    height:300,
    width:300,
    overflow:'hidden',
    borderRadius:10,
    backgroundColor:'#5DB075',
  },
  maintext:{
    fontSize:20,
    // textTransform: 'uppercase',
    // letterSpacing: -1,
    textAlign:'center',
    paddingTop:30,
    margin:10,
    color:'#fff',
  },
  buttonTapAgain:{
    backgroundColor:'#E5B824',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft:30,
    borderRadius:20,
    marginTop:20,
  },
  addWallet:{
    backgroundColor:'#E5B824',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft:30,
    borderRadius:20,
    marginTop:20,
  }


  
});