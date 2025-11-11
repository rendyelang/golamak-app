import React, { createContext, ReactNode, useContext, useState } from "react";
import type { CartItem } from "./CartContext";

export interface OrderItem extends CartItem {
  status: "Unpaid" | "Process" | "Ready" | "Done";
  selected?: boolean;
}

interface OrderContextType {
  orders: OrderItem[];
  addOrders: (items: CartItem[]) => void;
  updateStatus: (uniqueKey: string, newStatus: OrderItem["status"]) => void;
  toggleSelectItem: (uniqueKey: string) => void;
  selectAll: (status: OrderItem["status"]) => void;
  isAllSelected: (status: OrderItem["status"]) => boolean;
  getSelectedOrders: (status: OrderItem["status"]) => OrderItem[];
  removeSelectedOrders: (status: OrderItem["status"]) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  const addOrders = (items: CartItem[]) => {
    const withStatus = items.map((item) => ({
      ...item,
      status: "Unpaid",
      selected: false,
    }));
    setOrders((prev) => [...prev, ...withStatus]); // ⬅️ Menambahkan, bukan mengganti
  };

  const updateStatus = (uniqueKey: string, newStatus: OrderItem["status"]) => {
    setOrders((prev) => prev.map((o) => (o.uniqueKey === uniqueKey ? { ...o, status: newStatus } : o)));
  };

  const toggleSelectItem = (uniqueKey: string) => {
    setOrders((prev) => prev.map((o) => (o.uniqueKey === uniqueKey ? { ...o, selected: !o.selected } : o)));
  };

  const selectAll = (status: OrderItem["status"]) => {
    setOrders((prev) => {
      const sameStatus = prev.filter((o) => o.status === status);
      const allSelected = sameStatus.every((o) => o.selected);
      return prev.map((o) => (o.status === status ? { ...o, selected: !allSelected } : o));
    });
  };

  const isAllSelected = (status: OrderItem["status"]) => {
    const filtered = orders.filter((o) => o.status === status);
    return filtered.length > 0 && filtered.every((o) => o.selected);
  };

  const getSelectedOrders = (status: OrderItem["status"]) => {
    return orders.filter((o) => o.status === status && o.selected);
  };

  const removeSelectedOrders = (status: OrderItem["status"]) => {
    setOrders((prev) => prev.filter((o) => !(o.status === status && o.selected)));
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrders,
        updateStatus,
        toggleSelectItem,
        selectAll,
        isAllSelected,
        getSelectedOrders,
        removeSelectedOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within an OrderProvider");
  return ctx;
};
