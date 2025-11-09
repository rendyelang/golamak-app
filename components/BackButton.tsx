import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const BackButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} className="bg-white/60 p-2 rounded-full border border-tertier">
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;
