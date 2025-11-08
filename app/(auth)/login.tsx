import GoogleLogo from "@/assets/images/icons/google_logo.svg";
import bgImg from "@/assets/images/rumah_minang.png";
import { Button } from "@/components/signInUpButton";
import { TextInputField } from "@/components/text-input-field";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

const login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground source={bgImg} resizeMode="cover" className="flex-1 pt-20 pb-36 px-5 justify-between items-center">
      <View className="absolute inset-0 bg-black/20" />

      <View className="items-center">
        <Text className="font-poppins text-2xl text-white mb-20">LOGIN</Text>
        <View className="flex-row items-center mt-4">
          <Text className="text-6xl font-poppins-bold text-secondary drop-shadow-xl">Go</Text>
          <Text className="text-6xl font-poppins-bold text-tertier drop-shadow-xl">Lamak</Text>
        </View>
      </View>
      <View className="w-full overflow-hidden">
        <BlurView tint="light" intensity={40} className="inset-0 border border-tertier rounded-2xl px-6 py-9">
          <TextInputField icon="person" placeholder="Username" value={username} onChangeText={setUsername} />

          <TextInputField icon="lock" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

          <TouchableOpacity onPress={() => {}} className="self-end mb-4">
            <Text className="text-white font-poppins-medium text-sm underline">Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            title="Login"
            variant="primary"
            onPress={() => {
              router.push("/(tabs)");
            }}
          />

          <View className="flex-row items-center justify-center mt-4">
            <Text className="text-white font-poppins text-sm">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text className="text-white font-poppins-medium text-sm underline">Register</Text>
            </TouchableOpacity>
          </View>

          {/* Or separator */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-white" />
            <Text className="mx-4 text-white font-poppins text-sm">Or</Text>
            <View className="flex-1 h-px bg-white" />
          </View>

          {/* Google login button */}
          <TouchableOpacity
            className="p-2 bg-white rounded-lg border border-tertier self-center items-center justify-center shadow-sm"
            onPress={() => {
              // Handle Google login
            }}
          >
            <GoogleLogo />
          </TouchableOpacity>
        </BlurView>
      </View>
    </ImageBackground>
  );
};

export default login;
