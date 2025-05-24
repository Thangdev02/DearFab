import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Nếu đã có sản phẩm trong giỏ, tăng quantity lên 1
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Nếu chưa có, thêm mới với quantity = 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };
  return (
    <CartContext.Provider value={{ cartItems, addToCart,updateQuantity ,removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
