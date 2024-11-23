// CartScreen.js
import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useCart } from "./CartContext"; // Import the custom hook

const CartScreen = ({ navigation }) => {
  const { cart, addToCart, removeFromCart } = useCart(); // Get cart state and add/remove functions

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.cartText}>
                {item.name} x{item.quantity}
              </Text>
              <Button
                title="Remove"
                onPress={() => removeFromCart(item.id)} // Call remove from cart
              />
            </View>
          )}
        />
      )}
      {/* <Button title="Close Cart" onPress={() => navigation.closeDrawer()} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  cartText: { fontSize: 16 },
});

export default CartScreen;
