import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { Pressable, TextInput, View, type TextInputProps } from "react-native";

interface TextInputFieldProps extends TextInputProps {
  icon?: keyof typeof MaterialIcons.glyphMap;
  iconColor?: string;
  isPassword?: boolean; // aktifkan mode password
}

export function TextInputField({
  icon,
  iconColor = "#666",
  placeholder,
  isPassword = false,
  secureTextEntry, // boleh di-override dari luar, tapi default kita atur dari isPassword
  ...props
}: TextInputFieldProps) {
  const [hidden, setHidden] = useState<boolean>(isPassword);

  return (
    <View className="flex-row items-center bg-white rounded-full px-4 h-14 mb-4 shadow-sm">
      {icon && <MaterialIcons name={icon} size={20} color={iconColor} style={{ marginRight: 12 }} />}

      <TextInput
        className="flex-1 font-poppins text-base text-gray-800"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={secureTextEntry ?? (isPassword ? hidden : false)}
        style={{
          paddingVertical: 0,
          paddingTop: 0,
          paddingBottom: 0,
          includeFontPadding: false,
          textAlignVertical: "center",
          lineHeight: 20,
        }}
        {...props}
      />

      {isPassword && (
        <Pressable onPress={() => setHidden((v) => !v)} hitSlop={10} style={{ marginLeft: 8 }}>
          <MaterialIcons name={hidden ? "visibility-off" : "visibility"} size={20} color="#9CA3AF" />
        </Pressable>
      )}
    </View>
  );
}
