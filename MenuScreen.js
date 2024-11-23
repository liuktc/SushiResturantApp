import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, Alert } from "react-native";
import { fetchMenuItems } from "./api"; // Assuming api.js exists
import MenuItemCard from "./MenuItemCard"; // Your item card component
import { useCart } from "./CartContext"; // Import the custom hook

const MenuScreen = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([]);
  // const [cart, setCart] = useState([]);
  const { cart, addToCart, removeFromCart } = useCart(); // Get cart state and add/remove functions

  React.useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const items = await fetchMenuItems();
      setMenuItems(items);
    } catch (error) {
      Alert.alert("Error", "Failed to load menu.");
    }
  };

  // Function to get the quantity of an item by ID
  const getItemQuantityById = (itemId) => {
    console.log(cart);
    const item = cart.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <MenuItemCard
            item={item}
            onAddToCart={addToCart}
            quantity={getItemQuantityById(item.id)} // Use getItemQuantityById function
          />
        )}
      />
      <Button
        title="View Cart"
        onPress={() => navigation.openDrawer()} // Open the cart from the drawer
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});

export default MenuScreen;
