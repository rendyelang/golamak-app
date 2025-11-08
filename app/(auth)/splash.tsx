import splashLogo from "@/assets/images/logo_golamak.png";
import bgImg from "@/assets/images/minang_blur.png";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, ImageBackground, Text, View } from "react-native";

const splash = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/welcome");
    }, 6000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <ImageBackground source={bgImg} resizeMode="cover" className="flex-1 justify-center items-center">
      {/* Blur overlay */}
      {/* <BlurView tint="dark" intensity={90} className="absolute inset-0" /> */}
      {/* <View className="absolute inset-0 bg-black/30" /> */}

      <View className="items-center z-10">
        <Image source={splashLogo} style={{ width: 253, height: 295 }} resizeMode="contain" />
        <View className="flex-row items-center mt-4">
          <Text className="text-6xl font-poppins-bold text-secondary">Go</Text>
          <Text className="text-6xl font-poppins-bold text-tertier">Lamak</Text>
        </View>
        <ActivityIndicator size="small" color="#fff" style={{ marginTop: 20 }} />
      </View>
    </ImageBackground>
  );
};

export default splash;
