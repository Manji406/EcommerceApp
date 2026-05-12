import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "../EcommerceApp/src/screens/HomeScreen";
// Import other screens: Browse, Offers, Cart

const Tab = createBottomTabNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#888',
          }}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
          />
          <Tab.Screen 
            name="Browse" 
            component={() => <Text>Browse Screen</Text>} 
          />
          <Tab.Screen 
            name="Offers" 
            component={() => <Text>Offers Screen</Text>} 
          />
          <Tab.Screen 
            name="Cart" 
            component={() => <Text>Cart Screen</Text>} 
            options={{ tabBarBadge: 3 }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;