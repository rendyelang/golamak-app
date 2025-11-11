import EvilIcons from "@expo/vector-icons/EvilIcons";
import { BlurView } from "expo-blur";
import React from "react";
import { TextInput } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholderTextColor?: string;
  textColor?: string;
  iconColor?: string;
  placeHolder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholderTextColor = "#ffffff", textColor = "#ffffff", iconColor = "#ffffff", placeHolder }) => {
  const clearSearch = () => {
    onChangeText("");
  };

  return (
    <BlurView intensity={60} tint="light" className="flex-row justify-between items-center px-6 py-2 border border-tertier rounded-3xl overflow-hidden">
      <TextInput
        className="font-poppins text-sm flex-1"
        placeholder={placeHolder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        style={{
          color: textColor,
          paddingVertical: 0,
          includeFontPadding: false,
          textAlignVertical: "center",
          lineHeight: 20,
        }}
      />
      <EvilIcons name="search" size={28} color={iconColor} />
    </BlurView>
  );
};

export default SearchBar;
