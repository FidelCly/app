import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import username from './reducers/username'

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ScanScreen from './screens/ScanScreen';
import CardScreen from './screens/CardScreen';
import ProfilScreen from './screens/ProfilScreen';
import LoginScreen from './screens/LoginScreen';

const store = createStore(combineReducers({username}))
 const Stack = createStackNavigator();
 const Tab = createBottomTabNavigator();


 const BottomNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;
  
            if (route.name === 'Accueil') {
              iconName = 'md-home';
            } else if (route.name === 'Map') {
              iconName = 'map-outline';
            } else if (route.name === 'Scan') {
              iconName = 'qr-code-outline';
            } else if (route.name === 'Cartes') {
              iconName = 'card-outline';
            } else if (route.name === 'Profil') {
              iconName = 'person-circle-outline';
            }
  
            return <Ionicons name={iconName} size={25} color={color} />;
          },
        })}
        tabBarOptions={{
          showLabel:false,
          style:{
            // position: 'absolute',
          //   bottom: 15,
          //   left:15,
          //   right:15,
          //   elevation:0,
            // borderRadius:15,
            height:70,
            paddingBottom:10,
          },
          activeTintColor: '#5DB075',
       inactiveTintColor: '#dfe6e9',
        }}
      >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="Cartes" component={CardScreen} />
        <Tab.Screen name="Profil" component={ProfilScreen} />
      </Tab.Navigator>
    )
 }
 
 export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}> 
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='BottomNavigator' component={BottomNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
  }