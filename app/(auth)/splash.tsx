import splashLogo from "@/assets/images/logo_golamak.png";
import bgImg from "@/assets/images/minang_blur.png";
import { getAuthData } from "@/utils/authStorage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageBackground, Text, View } from "react-native";

const splash = () => {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const { accessToken, user } = await getAuthData();

        // Tunggu 2 detik biar ada animasi splash-nya dikit
        setTimeout(() => {
          if (accessToken && user) {
            console.log("✅ User logged in, redirecting to main tabs...");
            router.replace("/(tabs)");
          } else {
            console.log("🚪 No auth found, redirecting to welcome...");
            router.replace("/(auth)/welcome");
          }
        }, 2000);
      } catch (error) {
        console.error("Error checking auth:", error);
        router.replace("/(auth)/welcome");
      } finally {
        setCheckingAuth(false);
      }
    };

    checkLogin();
  }, [router]);

  return (
    <ImageBackground source={bgImg} resizeMode="cover" className="flex-1 justify-center items-center">
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
