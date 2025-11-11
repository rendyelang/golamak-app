import BackButton from "@/components/BackButton";
import MenuCard from "@/components/spesific/MenuCard";
import { useLiked } from "@/contexts/LikedContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function liked() {
  const { likedMenus } = useLiked();
  const router = useRouter();

  const exploringStyle = "font-poppins text-gray-500 text-sm";

  return (
    <View className="flex-1 w-full px-5 pt-12">
      {/* <View className="px-7 py-12"> */}
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <BackButton />
        <Text className="text-2xl font-poppins-semibold text-black ml-4">My Favorites Menus</Text>
      </View>

      {/* Count */}
      <View className="mb-4">
        <Text className="text-gray-400 font-poppins">
          {likedMenus.length} {likedMenus.length === 1 ? "menu" : "menus"} saved
        </Text>
      </View>

      <View className="flex-row justify-between flex-wrap gap-y-5">
        {likedMenus.length > 0 ? (
          likedMenus.map((item, index) => <MenuCard key={index} item={item} />)
        ) : (
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="heart-outline" size={80} color="#666" />
            <Text className="text-gray-400 text-lg mt-4 text-center font-poppins">No saved menus yet</Text>
            <View className="flex-row gap-x-1 items-center mt-2 text-center px-10">
              <Text className={exploringStyle}>Start</Text>
              <TouchableOpacity onPress={() => router.push("/(tabs)")}>
                <Text className={`underline font-poppins-semibold ${exploringStyle}`}>exploring</Text>
              </TouchableOpacity>
              <Text className={exploringStyle}>and save your favorite menus!</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
