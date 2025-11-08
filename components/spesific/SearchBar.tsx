import EvilIcons from "@expo/vector-icons/EvilIcons";
import { BlurView } from "expo-blur";
import React from "react";
import { TextInput } from "react-native";

const SearchBar = ({ value, onChangeText }) => {
  // Fungsi untuk clear search`
  const clearSearch = () => {
    onChangeText("");
  };

  return (
    <BlurView className="flex-row justify-between items-center px-6 py-2 border border-tertier rounded-3xl overflow-hidden" intensity={60} tint="light">
      <TextInput
        className="text-white font-poppins text-sm"
        placeholderTextColor="#ffffff"
        placeholder="Search menu..."
        value={value}
        onChangeText={onChangeText}
        style={{
          paddingVertical: 0,
          paddingTop: 0,
          paddingBottom: 0,
          includeFontPadding: false,
          textAlignVertical: "center",
          lineHeight: 20,
        }}
      />
      <EvilIcons name="search" size={28} color="white" />
    </BlurView>
  );
};

export default SearchBar;
