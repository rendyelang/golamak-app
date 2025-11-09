import React from "react";
import { Image, Pressable, Text } from "react-native";

type Props = {
  label: string;
  icon: any; // ImageSourcePropType
  selected?: boolean;
  onPress?: () => void;
};

const AddonCard = ({ label, icon, selected = false, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className={`w-[105px] p-3 rounded-2xl items-center justify-center relative
      ${selected ? "bg-secondary" : "bg-white border border-secondary"}`}
      style={{
        elevation: selected ? 6 : 2,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      <Image source={icon} className="w-16 h-16 rounded-full" style={{ marginBottom: 8 }} />
      <Text className={`text-center ${selected ? "text-white font-poppins-bold" : "text-black font-poppins"}`}>{label}</Text>
    </Pressable>
  );
};

export default AddonCard;
