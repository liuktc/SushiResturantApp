// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./CartContext"; // Import the CartProvider
import MenuScreen from "./MenuScreen"; // Your MenuScreen
import CartScreen from "./CartScreen"; // Your CartScreen
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Menu">
          <Drawer.Screen name="Menu" component={MenuScreen} />
          <Drawer.Screen name="Cart" component={CartScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
