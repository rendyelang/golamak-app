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
    <BlurView intensity={60} tint="light" className="flex-row justify-between items-center px-6 py-2 border border-tertier rounded-3xl overflow-hidden">
      <TextInput
        className="text-white font-poppins text-sm flex-1"
        placeholderTextColor="#ffffff"
        placeholder="Search menu..."
        value={value}
        onChangeText={onChangeText}
        style={{
          paddingVertical: 0,
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
