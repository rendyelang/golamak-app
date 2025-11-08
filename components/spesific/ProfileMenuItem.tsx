import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ProfileMenuItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress?: () => void;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center justify-between py-4 border-b border-gray-200">
      <View className="flex-row items-center gap-x-5">
        <View className="w-10 h-10 border-2 border-orange-400 rounded-full flex items-center justify-center">
          <MaterialIcons name={icon} size={22} color="#b91c1c" />
        </View>
        <Text className="font-poppins-medium text-base text-black">{label}</Text>
      </View>

      <MaterialIcons name="chevron-right" size={20} color="#555" />
    </TouchableOpacity>
  );
};

export default ProfileMenuItem;
