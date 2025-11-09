import React, { createContext, ReactNode, useContext, useState } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selected?: boolean;
  addon?: string;
  addons?: { id: number; name: string; price: number }[];
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
      const existing = prev.find((i) => i.id === item.id && JSON.stringify(i.addons?.map((a) => a.id).sort()) === JSON.stringify(item.addons?.map((a) => a.id).sort()));

      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, quantity: i.quantity + item.quantity } : i));
      } else {
        return [...prev, { ...item, selected: false }];
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
