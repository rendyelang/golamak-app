// import ayamBakar from "@/assets/images/menus/ayam_bakar.webp";
import { MenuItem, useCart } from "@/contexts/CartContext";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AddToCartBtn from "../AddToCartBtn";

interface Props {
  item: MenuItem;
}

const MenuCard: React.FC<Props> = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <TouchableOpacity className="border border-tertier rounded-lg overflow-hidden w-[48%]">
      <Image className="w-48 h-28" source={item.image} resizeMode="cover" />
      <View className="px-3 flex-col py-3">
        <Text className="font-poppins-semibold text-lg">{item.name}</Text>
        <Text className="font-poppins text-gray-500 mb-4">{item.description}</Text>
        <View className="flex-row justify-between items-center">
          <Text className="font-poppins-semibold text-lg">Rp. {item.price}</Text>
          <AddToCartBtn onPress={() => addToCart(item)} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MenuCard;
