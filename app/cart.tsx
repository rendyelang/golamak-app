import BackButton from "@/components/BackButton";
import { useCart } from "@/contexts/CartContext";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
// import { Picker } from "@react-native-picker/picker";

export default function CartScreen() {
  const { cart, toggleSelectItem, updateQuantity, removeSelectedItems, selectAll, isAllSelected, getTotalPrice } = useCart();

  const renderItem = ({ item }: any) => (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#E0A15A",
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
      }}
    >
      {/* Checkbox */}
      <TouchableOpacity onPress={() => toggleSelectItem(item.id)} className={`mr-4 flex justify-center items-center w-7 h-7 rounded-md border border-secondary ${item.selected ? "bg-secondary" : ""}`}>
        {item.selected && <Feather name="check" size={24} color="white" />}
      </TouchableOpacity>

      {/* Gambar */}
      <Image
        source={item.image}
        style={{
          width: 90,
          height: 110,
          borderRadius: 8,
          marginRight: 14,
        }}
      />

      {/* Info produk */}
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <Text className="font-poppins-medium text-xl mb-2">{item.name}</Text>

          <View className="mt-[6px] flex-row justify-between items-center mb-7">
            <View>
              <Text className="font-poppins-light">Addon</Text>
              {/* <Picker
                selectedValue={item.addon}
                style={{
                    width: 100,
                    height: 35,
                    backgroundColor: "#f8f8f8",
                    borderRadius: 6,
                }}
                onValueChange={(value) => console.log("Addon changed:", value)}
                >
                <Picker.Item label="No" value="No" />
                <Picker.Item label="Tofu" value="Tofu" />
                <Picker.Item label="Extra Spicy" value="Extra Spicy" />
                </Picker> */}
            </View>

            {/* Counter */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View className="flex-row items-center border border-tertier rounded-xl p-1">
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  className={`w-9 h-9 rounded-full items-center justify-center ${item.quantity === 1 ? "bg-[#D9D9D9]" : "border border-secondary"}`}
                  disabled={item.quantity === 1}
                >
                  <Text style={{ fontSize: 18 }}>−</Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 16,
                    marginHorizontal: 8,
                    fontWeight: "500",
                  }}
                >
                  {item.quantity}
                </Text>

                <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)} className="w-9 h-9 rounded-full items-center justify-center bg-secondary">
                  <Text style={{ fontSize: 18, color: "white" }}>＋</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text className="font-poppins-bold text-lg">Rp. {(item.price * item.quantity).toLocaleString("id-ID")}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 pt-10 pb-4">
      {/* Header */}
      <View
        className="px-5"
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <BackButton />
        <Text className="font-poppins-semibold ml-4 text-lg" style={{ fontSize: 18, fontWeight: "600", marginLeft: 10 }}>
          Cart
        </Text>
      </View>

      {/* Info bar */}
      <View className="flex-row justify-between items-center py-2 border-t border-b border-tertier px-5">
        <Text style={{ color: "gray" }}>{cart.filter((i) => i.selected).length} product selected</Text>
        <TouchableOpacity onPress={removeSelectedItems}>
          <Text className="font-poppins-semibold underline text-secondary">Hapus</Text>
        </TouchableOpacity>
      </View>

      {/* Daftar item */}
      <FlatList data={cart} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }} />

      {/* Footer */}
      <View className="flex-row justify-between items-center border-t border-gray-300 p-5">
        <TouchableOpacity className={`mr-4 flex-row items-center gap-x-4`} onPress={selectAll}>
          <View className={`flex justify-center items-center w-7 h-7 rounded-md border border-secondary ${isAllSelected ? "bg-secondary" : ""}`}>{isAllSelected && <Feather name="check" size={24} color="white" />}</View>
          <Text>All</Text>
        </TouchableOpacity>

        <View className="flex-row items-center gap-x-5">
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Rp. {getTotalPrice().toLocaleString("id-ID")}</Text>
          </View>

          <TouchableOpacity className="bg-secondary rounded-lg px-5 py-3">
            <Text className="text-white font-poppins-medium">Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
