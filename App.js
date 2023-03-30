import React from "react";

import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import ScanScreen from "./screens/ScanScreen";
import CardScreen from "./screens/CardScreen";
import ProfilScreen from "./screens/ProfilScreen";
import LoginScreen from "./screens/LoginScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import username from "./reducers/username";
import CardScreenInfo from "./screens/CardScreenInfo";

const store = createStore(combineReducers({ username }));

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "Accueil") {
            iconName = "md-home";
          } else if (route.name === "Plan") {
            iconName = "map-outline";
          } else if (route.name === "Scan QR Code") {
            iconName = "qr-code-outline";
          } else if (route.name === "Cartes Fid") {
            iconName = "card-outline";
          } else if (route.name === "Profil") {
            iconName = "person-circle-outline";
          }

          return <Ionicons name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: "#5DB075",
        tabBarInactiveTintColor: "#dfe6e9",
        tabBarShowLabel: true,
        tabBarStyle: [
          {
            display: "flex",
          },
        ],
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen
        name="Plan"
        component={MapScreen}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Scan QR Code"
        component={ScanScreen}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen name="Cartes Fid" component={CardScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
          <Stack.Screen name="InfoCard" component={CardScreenInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
