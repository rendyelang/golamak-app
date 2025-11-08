import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { TouchableOpacity } from "react-native";

const AddToCartBtn = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="bg-secondary p-2 rounded-md border border-tertier">
      <FontAwesome name="cart-plus" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default AddToCartBtn;
