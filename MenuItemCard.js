import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const MenuItemCard = ({ item, onAddToCart, quantity }) => {
  return (
    <View style={styles.menuItem}>
      {/* Image with quantity overlay */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image_url }} style={styles.menuImage} />
        {/* Display quantity if it exists */}
        {quantity > 0 && (
          <View style={styles.quantityOverlay}>
            <Text style={styles.quantityText}>{quantity}</Text>
          </View>
        )}
      </View>

      <View style={styles.itemDetails}>
        <Text style={styles.menuText}>{item.name}</Text>
        <Text style={styles.menuText}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityButtons}>
        {/* Decrease Quantity Button */}
        <TouchableOpacity
          style={styles.changeQuantityButton}
          onPress={() => onAddToCart(item.id, item.name, -1)} // Decrease quantity
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        {/* Increase Quantity Button */}
        <TouchableOpacity
          style={styles.changeQuantityButton}
          onPress={() => onAddToCart(item.id, item.name, 1)} // Increase quantity
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "space-between",
    // Shadow effect for iOS and Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // For Android shadow support
  },
  imageContainer: {
    position: "relative", // Required for positioning the overlay
  },
  menuImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  quantityOverlay: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "rgba(0, 123, 255, 0.7)", // Semi-transparent background
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  quantityText: {
    color: "#fff",
    fontSize: 14, // Small size for the quantity number
    fontWeight: "bold",
  },
  itemDetails: {
    alignItems: "center",
  },
  menuText: {
    fontSize: 16,
    textAlign: "center",
  },
  changeQuantityButton: {
    marginHorizontal: 10,
    paddingVertical: 12, // Increased padding for better button size
    paddingHorizontal: 20, // Increased padding for better button size
    backgroundColor: "#007BFF",
    borderRadius: 8, // Rounded corners
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24, // Larger font size for the + and - buttons
    fontWeight: "bold", // Bold font for emphasis
    textAlign: "center", // Center the text within the button
  },
  quantityButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default MenuItemCard;
