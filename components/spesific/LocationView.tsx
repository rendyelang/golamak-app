import { getAuthData } from "@/utils/authStorage";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";

const LocationView = () => {
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUserAndGreeting = async () => {
      try {
        // Ambil data user dari SecureStore
        const { user } = await getAuthData();

        if (user?.name) setName(user.name);

        // Dapatkan waktu lokal
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) setGreeting("Good Morning");
        else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
        else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
        else setGreeting("Good night");
      } catch (error) {
        console.error("Error fetching greeting:", error);
      }
    };

    fetchUserAndGreeting();
  }, []);

  return (
    <BlurView className="flex-row gap-x-1 items-center self-start py-2 px-4 border border-tertier rounded-3xl overflow-hidden" intensity={30} tint="light">
      <Text className="font-poppins-semibold text-sm text-white">{greeting}</Text>
      <Text className="font-poppins-bold italic text-white">{name}</Text>
    </BlurView>
  );
};

export default LocationView;
