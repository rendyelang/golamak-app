import { BlurView } from "expo-blur";
import React from "react";
import { Pressable, Text, View, type PressableProps, type StyleProp, type TextStyle, type ViewStyle } from "react-native";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends Omit<PressableProps, "style"> {
  title: string;
  variant?: ButtonVariant;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Button({ title, variant = "primary", onPress, style, textStyle, ...props }: ButtonProps) {
  const baseClasses = "w-full py-4 px-6 rounded-3xl items-center justify-center shadow-lg overflow-hidden";

  const variantClasses = {
    primary: "bg-secondary",
    secondary: "border border-tertier",
  };

  const textClasses = {
    primary: "text-white font-poppins-semibold text-base",
    secondary: "text-white font-poppins-medium text-base",
  };

  const shadowStyle = {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  };

  if (variant === "secondary") {
    return (
      <Pressable onPress={onPress} className={`${baseClasses} ${variantClasses[variant]}`} style={[shadowStyle, style]} {...props}>
        <BlurView intensity={70} tint="light" className="absolute inset-0" />
        <View className="absolute inset-0 bg-black/20" />
        <Text className={`${textClasses[variant]} z-10`} style={textStyle}>
          {title}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} className={`${baseClasses} ${variantClasses[variant]}`} style={[shadowStyle, style]} {...props}>
      <Text className={textClasses[variant]} style={textStyle}>
        {title}
      </Text>
    </Pressable>
  );
}
