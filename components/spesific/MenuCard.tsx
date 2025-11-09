// import ayamBakar from "@/assets/images/menus/ayam_bakar.webp";
import { MenuItem, useCart } from "@/contexts/CartContext";
import { useLiked } from "@/contexts/LikedContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  item: MenuItem;
}

const MenuCard: React.FC<Props> = ({ item }) => {
  const { addToCart } = useCart();
  const { toggleLike, isLiked } = useLiked();
  const router = useRouter();

  const liked = isLiked(item.id);

  const handleLike = () => {
    toggleLike(item);
  };

  return (
    <TouchableOpacity onPress={() => router.push({ pathname: "/detail/[id]", params: { id: item.id } })} className="border border-tertier rounded-lg overflow-hidden w-[48%]">
      <Image className="w-48 h-28" source={item.image} resizeMode="cover" />
      <View className="px-3 flex-col py-3">
        <Text className="font-poppins-semibold text-lg">{item.name}</Text>
        <Text className="font-poppins text-gray-500 mb-4">
          {item.description.split(" ").slice(0, 5).join(" ")}
          {item.description.split(" ").length > 5 ? "..." : ""}
        </Text>
        <View className="flex-row justify-between items-center">
          <Text className="font-poppins-semibold text-lg">Rp. {item.price}</Text>
          {/* <AddToCartBtn onPress={() => addToCart(item)} /> */}
          {/* <LikeButton /> */}

          <TouchableOpacity onPress={handleLike} className="bg-white/60 p-2 rounded-full border border-tertier">
            <Ionicons name={liked ? "heart" : "heart-outline"} size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MenuCard;
