import { useCart } from "@/contexts/CartContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  onPress?: () => void;
}

const CartButton: React.FC<Props> = ({ onPress }) => {
  const { cart } = useCart();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity onPress={onPress} className="rounded-full border border-tertier p-3 bg-white/30 relative">
      <MaterialCommunityIcons name="cart-outline" size={24} color="white" />
      {totalQty > 0 && (
        <View className="absolute bg-secondary rounded-full px-2 py-0.5 top-0 right-0 items-center justify-center">
          <Text className="text-white text-xs font-bold">{totalQty}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
