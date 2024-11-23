import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Use array for the cart

  // Add item to cart (or update quantity if already in cart)
  const addToCart = (id, name, quantity) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === id);
      if (itemIndex > -1) {
        // If item already exists in the cart, update quantity
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity += quantity;
        // Remove item if quantity is zero or less
        if (updatedCart[itemIndex].quantity <= 0) {
          updatedCart.splice(itemIndex, 1);
        }
        return updatedCart;
      } else {
        // If item is new and quantity is positive, add it
        if (quantity > 0) {
          return [...prevCart, { id, name, quantity }];
        }
        return prevCart;
      }
    });
  };

  // Remove item from cart by its ID
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
