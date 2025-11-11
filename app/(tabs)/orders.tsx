import OrderStatusButton from "@/components/spesific/OrderStatusButton";
import { useOrders } from "@/contexts/OrderContext";
import Feather from "@expo/vector-icons/Feather";
import React, { useMemo, useState } from "react";
import { FlatList, Image, Text, ToastAndroid, TouchableOpacity, View } from "react-native";

export default function OrdersScreen() {
  const { orders, toggleSelectItem, selectAll, isAllSelected, getSelectedOrders, updateStatus } = useOrders();

  const [activeLabel, setActiveLabel] = useState<"Unpaid" | "Process" | "Ready" | "Done">("Unpaid");

  const statuses: (typeof activeLabel)[] = ["Unpaid", "Process", "Ready", "Done"];

  // Filter order berdasarkan status tab
  const filteredOrders = orders.filter((o) => o.status === activeLabel);

  // Total harga order yang diselect
  const selectedTotal = useMemo(() => {
    return filteredOrders.filter((o) => o.selected).reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
  }, [filteredOrders]);

  // Handle tombol Pay
  const handlePay = () => {
    const selected = getSelectedOrders(activeLabel);
    if (selected.length === 0) return ToastAndroid.show("Select an order first!", 1);
    selected.forEach((o) => updateStatus(o.uniqueKey, "Process"));
    ToastAndroid.show("Payment successful, moved to Process tab!", 1.5);
  };

  // Render tiap item order
  const renderItem = ({ item }: any) => (
    <View className="flex-row bg-white border border-secondary rounded-xl p-4 mb-3">
      {/* Checkbox hanya muncul di tab Unpaid */}
      {activeLabel === "Unpaid" && (
        <TouchableOpacity onPress={() => toggleSelectItem(item.uniqueKey)} className={`mr-3 flex justify-center items-center w-7 h-7 rounded-md border border-secondary ${item.selected ? "bg-secondary" : ""}`}>
          {item.selected && <Feather name="check" size={20} color="white" />}
        </TouchableOpacity>
      )}

      <Image source={item.image} style={{ width: 70, height: 70, borderRadius: 8, marginRight: 10 }} />

      <View style={{ flex: 1 }}>
        <Text className="font-poppins-semibold text-lg">{item.name}</Text>

        {item.addons?.length > 0 && (
          <View>
            {item.addons.map((a) => (
              <Text key={a.id} className="font-poppins-light text-sm text-gray-600">
                + {a.name} (Rp. {a.price.toLocaleString("id-ID")})
              </Text>
            ))}
          </View>
        )}

        <Text className="font-poppins-bold text-base text-secondary mt-1">Rp. {(item.totalPrice * item.quantity).toLocaleString("id-ID")}</Text>

        {/* Status khusus untuk tab "Process" */}
        {activeLabel === "Process" && (
          <Text
            style={{
              color: "#DAA520", // gold
              fontStyle: "italic",
              marginTop: 4,
            }}
          >
            Process
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <View className="flex-1 pt-12 bg-[#F9F9F9]">
      <Text className="font-poppins-semibold text-2xl mb-4 px-5">Orders</Text>

      {/* Status Tabs */}
      <View className="gap-x-3 border-t-2 border-b border-tertier flex-row justify-center items-center py-2 px-5">
        {statuses.map((label) => (
          <OrderStatusButton key={label} label={label} isActive={label === activeLabel} onPress={() => setActiveLabel(label)} />
        ))}
      </View>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        renderItem={renderItem}
        keyExtractor={(item) => item.uniqueKey}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
        ListEmptyComponent={<Text className="text-center text-gray-500 mt-10 font-poppins">No orders in this category.</Text>}
      />

      {/* Footer hanya muncul jika tab aktif = "Unpaid" */}
      {activeLabel === "Unpaid" && filteredOrders.length > 0 && (
        <View className="flex-row justify-between items-center border-t border-gray-300 p-5 bg-white">
          {/* Select All */}
          <TouchableOpacity className="flex-row items-center gap-x-3" onPress={() => selectAll(activeLabel)}>
            <View className={`w-7 h-7 rounded-md border border-secondary items-center justify-center ${isAllSelected(activeLabel) ? "bg-secondary" : ""}`}>
              {isAllSelected(activeLabel) && <Feather name="check" size={20} color="white" />}
            </View>
            <Text className="font-poppins-medium text-gray-700">Select All</Text>
          </TouchableOpacity>

          {/* Total + Pay */}
          <View className="flex-row items-center gap-x-3">
            <Text className="font-poppins-semibold text-lg">Rp. {selectedTotal.toLocaleString("id-ID")}</Text>
            <TouchableOpacity onPress={handlePay} disabled={selectedTotal === 0} className={`rounded-lg px-5 py-3 ${selectedTotal === 0 ? "bg-gray-400" : "bg-secondary"}`}>
              <Text className="text-white font-poppins-medium">Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
