import ProfileCard from "@/components/spesific/ProfileCard";
import ProfileMenuItem from "@/components/spesific/ProfileMenuItem";
import { useLiked } from "@/contexts/LikedContext";
import handleMaintenance from "@/scripts/handleMaintenance";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const profile = () => {
  const router = useRouter();
  const { likedCount } = useLiked();

  return (
    <View className="px-5 pt-12">
      <Text className="font-poppins-semibold text-2xl mb-10">Profile</Text>
      <ProfileCard />
      <Text className="font-poppins-medium text-xl mt-10 mb-5">General</Text>
      <View>
        <ProfileMenuItem onPress={() => router.push("/liked")} icon="favorite" label="Favorites" badgeCount={likedCount} />
        <ProfileMenuItem onPress={handleMaintenance} icon="settings" label="Setting" />
        <ProfileMenuItem onPress={() => router.push("/helpCenter")} icon="help-outline" label="Help Center" />
        <ProfileMenuItem icon="logout" label="Log Out" />
      </View>
    </View>
  );
};

export default profile;
