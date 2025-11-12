import avatar from "@/assets/images/avatar.png";
import handleMaintenance from "@/scripts/handleMaintenance";
import { getAuthData } from "@/utils/authStorage";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import EditButton from "../EditButton";

const ProfileCard = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const { user } = await getAuthData();
      if (user) setName(user.name);
    })();
  }, []);

  try {
    return (
      <View
        className="bg-secondary rounded-xl w-full pt-8 border border-tertier"
        style={{
          elevation: 5,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
        }}
      >
        <View className="bg-white rounded-xl border border-tertier px-4 pt-4 pb-7">
          <EditButton onPress={handleMaintenance} />
          <View className="flex-col justify-center items-center">
            <View className="mb-2">
              <Image className="rounded-full" source={avatar} />
            </View>
            <Text className="font-poppins-semibold text-xl">{name || "Loading.."}</Text>
            <View className="flex-row gap-x-1">
              <TouchableOpacity onPress={handleMaintenance}>
                <Text className="underline text-gray-400">0 Points</Text>
              </TouchableOpacity>
              <Text className="text-gray-400">| Level 1</Text>
            </View>
          </View>
        </View>
      </View>
    );
  } catch (e) {
    console.error("Error in ProfileCard:", e);
    return null;
  }
};

export default ProfileCard;
