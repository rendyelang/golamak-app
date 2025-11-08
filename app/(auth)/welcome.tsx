import bgImg from "@/assets/images/rumah_minang.png";
import { Button } from "@/components/signInUpButton";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, Text, View } from "react-native";

const welcome = () => {
  const router = useRouter();

  return (
    <ImageBackground source={bgImg} resizeMode="cover" className="flex-1 justify-between py-36 items-center px-5">
      {/* Blur overlay */}
      {/* <BlurView intensity={20} className="absolute inset-0" /> */}
      <View className="absolute inset-0 bg-black/20" />

      <View className="items-center z-10">
        <View className="flex-row items-center mt-4">
          <Text className="text-6xl font-poppins-bold text-secondary drop-shadow-xl">Go</Text>
          <Text className="text-6xl font-poppins-bold text-tertier drop-shadow-xl">Lamak</Text>
        </View>
      </View>

      <View className="w-full">
        <View className="items-center mb-14">
          <Text className="font-poppins-medium text-2xl text-white">Don't wait.</Text>
          <Text className="font-poppins-light text-base text-white">Get the best taste right now!</Text>
        </View>

        <View className="flex gap-y-5">
          <Button
            title="Login"
            variant="primary"
            onPress={() => {
              router.push("/(auth)/login");
            }}
          />
          <Button
            title="Don't have an account? Sign Up"
            variant="secondary"
            onPress={() => {
              router.push("/(auth)/register");
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default welcome;
