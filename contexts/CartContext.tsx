import React, { createContext, ReactNode, useContext, useState } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selected?: boolean;
  addon?: string;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, newQty: number) => void;
  toggleSelectItem: (id: number) => void;
  selectAll: () => void;
  isAllSelected: boolean;
  removeSelectedItems: () => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      } else {
        return [...prev, { ...item, quantity: 1, selected: false, addon: "No" }];
      }
    });
  };

  const updateQuantity = (id: number, newQty: number) => {
    if (newQty < 1) return;
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item)));
  };

  const toggleSelectItem = (id: number) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)));
  };

  const selectAll = () => {
    const allSelected = cart.every((item) => item.selected);
    setCart((prev) => prev.map((item) => ({ ...item, selected: !allSelected })));
  };

  const isAllSelected = cart.length > 0 && cart.every((item) => item.selected);

  const removeSelectedItems = () => {
    setCart((prev) => prev.filter((item) => !item.selected));
  };

  const getTotalPrice = () => {
    return cart.filter((item) => item.selected).reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        toggleSelectItem,
        selectAll,
        isAllSelected,
        removeSelectedItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
