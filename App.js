import React from "react";
import store from "./src/store/store";
import NewsScreen from "./src/screens/NewsScreen";
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";
import ScanScreen from "./src/screens/ScanScreen";
import CardScreen from "./src/screens/CardScreen";
import ProfilScreen from "./src/screens/ProfilScreen";
import EditProfilScreen from "./src/screens/EditProfilScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CardScreenInfo from "./src/screens/CardScreenInfo";
import InfoShopToAddScreen from "./src/screens/InfoShopToAddScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

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
      <Tab.Screen
        name="Accueil"
        component={NewsScreen}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Tab.Screen
        name="Plan"
        component={MapScreen}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Tab.Screen
        name="Scan QR Code"
        component={ScanScreen}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Tab.Screen
        name="Cartes Fid"
        component={CardScreen}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfilScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
          <Stack.Screen name="InfoCard" component={CardScreenInfo} />
          <Stack.Screen name="EditProfil" component={EditProfilScreen} />
          <Stack.Screen
            name="InfoShopToAdd"
            component={InfoShopToAddScreen}
            options={{ unmountOnBlur: true, headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
