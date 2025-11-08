import React from "react";
import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  icon: any; // ImageSourcePropType
  selected?: boolean;
  onPress?: () => void;
};

const CategoryCard = ({ label, icon, selected = false, onPress }: Props) => {
  const SvgComp = icon;

  return (
    <Pressable
      onPress={onPress}
      className={`w-24 h-24 rounded-2xl items-center justify-center relative
      ${selected ? "bg-secondary" : "bg-white border border-secondary"}`}
      style={{
        elevation: selected ? 6 : 2,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      <SvgComp width={40} height={40} style={{ marginBottom: 8 }} />
      <Text className={selected ? "text-white font-poppins-bold" : "text-black font-poppins"}>{label}</Text>
    </Pressable>
  );
};

export default CategoryCard;
