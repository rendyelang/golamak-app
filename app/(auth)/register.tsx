import { registerAdmin } from "@/assets/api/auth";
import GoogleLogo from "@/assets/images/icons/google_logo.svg";
import bgImg from "@/assets/images/rumah_minang.png";
import { Button } from "@/components/signInUpButton";
import { TextInputField } from "@/components/text-input-field";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ImageBackground, Text, TouchableOpacity, View } from "react-native";

const register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Function handleRegister
  const handleRegister = async () => {
    if (!name || !username || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await registerAdmin(name, username, password);
      Alert.alert("Success", `Welcome, ${res.account.name}!`);
      router.push("/(auth)/login");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={bgImg} resizeMode="cover" className="flex-1 pt-20 pb-36 px-5 justify-between items-center">
      <View className="absolute inset-0 bg-black/20" />

      <View className="items-center">
        <Text className="font-poppins text-2xl text-white mb-20">SIGN UP</Text>
        <View className="flex-row items-center mt-4">
          <Text className="text-6xl font-poppins-bold text-secondary drop-shadow-xl">Go</Text>
          <Text className="text-6xl font-poppins-bold text-tertier drop-shadow-xl">Lamak</Text>
        </View>
      </View>
      <View className="w-full bg-white/20 border border-tertier rounded-2xl px-6 py-9">
        <TextInputField icon="person" placeholder="Name" value={name} onChangeText={setName} />
        <TextInputField icon="person" placeholder="Username" value={username} onChangeText={setUsername} />

        <TextInputField icon="lock" placeholder="Password" value={password} onChangeText={setPassword} isPassword />
        <TextInputField icon="lock" placeholder="Confirm password" value={confirmPassword} onChangeText={setConfirmPassword} isPassword />

        <View className="flex-row self-end mb-4">
          <Text className="text-white font-poppins text-sm mr-1">Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/(auth)/login");
            }}
            className=""
          >
            <Text className="text-white font-poppins-medium text-sm underline">Login</Text>
          </TouchableOpacity>
        </View>

        <Button title={loading ? "Registering..." : "Sign Up"} variant="primary" onPress={handleRegister} disabled={loading} />

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
      </View>
    </ImageBackground>
  );
};

export default register;
