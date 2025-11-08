import EvilIcons from "@expo/vector-icons/EvilIcons";
import { BlurView } from "expo-blur";
import React from "react";
import { Text } from "react-native";

const LocationView = () => {
  return (
    <BlurView className="flex-row items-center self-start gap-x-1 py-2 px-4 border border-tertier rounded-3xl overflow-hidden" intensity={30} tint="light">
      <EvilIcons name="location" size={28} color="white" />
      <Text className="font-poppins-semibold text-sm text-white">Sukabumi, West Java</Text>
    </BlurView>
  );
};

export default LocationView;
