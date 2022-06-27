import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { Ionicons } from '@expo/vector-icons';


function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor:'#e67e22'}}>   
    </View>
  );
 }
 
 function PageAScreen(){
  return (
    <View style={{ flex: 1, backgroundColor:'#2ecc71'}}>
    </View>
  );
 }
 
 const Tab = createBottomTabNavigator();
 
 export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;
  
            if (route.name === 'Home') {
              iconName = 'ios-information-circle';
            } else if (route.name === 'PageA') {
              iconName = 'ios-options';
            }
  
            return <Ionicons name={iconName} size={25} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#0984e3',
       inactiveTintColor: '#dfe6e9',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="PageA" component={PageAScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
  }