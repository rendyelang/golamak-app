import React, { createContext, ReactNode, useContext, useState } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: any;
  quantity: number;
  selected?: boolean;
  addons?: { id: number; name: string; price: number }[];
  uniqueKey: string; // unik untuk membedakan item dengan addon berbeda
  basePrice: number;
  addonPrice: number;
  totalPrice: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "uniqueKey" | "totalPrice" | "addonPrice" | "basePrice">) => void;
  updateQuantity: (uniqueKey: string, newQty: number) => void;
  toggleSelectItem: (uniqueKey: string) => void;
  selectAll: () => void;
  isAllSelected: boolean;
  removeSelectedItems: () => void;
  getTotalPrice: () => number;
  checkoutSelectedItems: () => CartItem[]; // ✅ fungsi baru
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "uniqueKey" | "totalPrice" | "addonPrice" | "basePrice">) => {
    const addonPrice = item.addons?.reduce((sum, addon) => sum + addon.price, 0) || 0;
    const basePrice = item.price;
    const totalPrice = basePrice + addonPrice;

    const uniqueKey = `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const newItem: CartItem = {
      ...item,
      uniqueKey,
      basePrice,
      addonPrice,
      totalPrice,
    };

    setCart((prevCart) => [...prevCart, newItem]);
  };

  const updateQuantity = (uniqueKey: string, newQty: number) => {
    if (newQty < 1) return;
    setCart((prev) => prev.map((item) => (item.uniqueKey === uniqueKey ? { ...item, quantity: newQty } : item)));
  };

  const toggleSelectItem = (uniqueKey: string) => {
    setCart((prev) => prev.map((item) => (item.uniqueKey === uniqueKey ? { ...item, selected: !item.selected } : item)));
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
    return cart.filter((item) => item.selected).reduce((total, item) => total + item.totalPrice * item.quantity, 0);
  };

  // ✅ fungsi baru: checkoutSelectedItems
  const checkoutSelectedItems = () => {
    const selectedItems = cart.filter((item) => item.selected);
    setCart((prev) => prev.filter((item) => !item.selected));
    return selectedItems;
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
        checkoutSelectedItems, // ✅ include ke context
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
