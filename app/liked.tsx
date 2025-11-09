import BackButton from "@/components/BackButton";
import MenuCard from "@/components/spesific/MenuCard";
import { useLiked } from "@/contexts/LikedContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";

export default function liked() {
  const { likedMenus } = useLiked();

  return (
    <View className="flex-1 w-full px-5 pt-12">
      {/* <View className="px-7 py-12"> */}
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <BackButton />
        <Text className="text-2xl font-bold text-black ml-4">My Favorites Menus</Text>
      </View>

      {/* Count */}
      <View className="mb-4">
        <Text className="text-gray-400">
          {likedMenus.length} {likedMenus.length === 1 ? "menu" : "menus"} saved
        </Text>
      </View>

      {/* {likedMenus.length > 0 ? (
        <FlatList
          data={likedMenus}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          // contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ flexBasis: "100%", marginBottom: 20 }}>
              <MenuCard item={item} />
            </View>
          )}
        />
      ) : (
        <View className="flex-1 justify-center items-center py-20">
          <Ionicons name="heart-outline" size={80} color="#666" />
          <Text className="text-gray-400 text-lg mt-4 text-center">No saved menus yet</Text>
          <Text className="text-gray-500 text-sm mt-2 text-center px-10">Start exploring and save your favorite menus!</Text>
        </View>
      )} */}

      <View className="flex-row justify-between flex-wrap gap-y-5">
        {likedMenus.length > 0 ? (
          likedMenus.map((item, index) => <MenuCard key={index} item={item} />)
        ) : (
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="heart-outline" size={80} color="#666" />
            <Text className="text-gray-400 text-lg mt-4 text-center">No saved menus yet</Text>
            <Text className="text-gray-500 text-sm mt-2 text-center px-10">Start exploring and save your favorite menus!</Text>
          </View>
        )}
      </View>

      {/* </View> */}
    </View>
  );
}
