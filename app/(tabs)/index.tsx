import CATEGORIES from "@/assets/data/categories";
import menus from "@/assets/data/menus";
// import { Menu, getMenus } from "@/assets/api/menus";
import rumahMinang from "@/assets/images/rumah_minang.png";
import CartButton from "@/components/CartButton";
import CategoryCard from "@/components/spesific/CategoryCard";
import Discount from "@/components/spesific/Discount";
import LocationView from "@/components/spesific/LocationView";
import MenuCard from "@/components/spesific/MenuCard";
import SearchBar from "@/components/spesific/SearchBar";
import handleMaintenance from "@/scripts/handleMaintenance";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

const index = () => {
  const router = useRouter();

  const [data, setData] = useState<Menu[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [refreshing, setRefreshing] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // const load = async () => {
  //   try {
  //     setError(null);
  //     const menus = await getMenus();
  //     console.log("✅ Loaded menus:", menus);
  //     setData(menus);
  //   } catch (e: any) {
  //     setError(e.message || "Failed to load");
  //   } finally {
  //     setLoading(false);
  //     setRefreshing(false);
  //   }
  // };

  // useEffect(() => {
  //   load();
  // }, []);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   load();
  // }, []);

  // if (loading) {
  //   return (
  //     <View style={styles.center}>
  //       <ActivityIndicator />
  //       <Text style={styles.muted}>Loading menus..</Text>
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.center}>
  //       <Text style={styles.error}>Error: {error}</Text>
  //       <Text style={styles.muted}>Pull to retry.</Text>
  //     </View>
  //   );
  // }

  const handleCart = () => {
    router.push("/cart");
  };

  const filteredMenus = menus.filter((item) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query) || item.price.toString().toLowerCase().includes(query);

    const matchesCategory = activeCategory === "all" || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["57%", "90%"], []); // bisa ditarik dari % 57ke full screen

  return (
    <GestureHandlerRootView className="pb-96">
      <ImageBackground className="pt-14 pb-14 px-5" source={rumahMinang} resizeMode="stretch">
        <View className="flex-row justify-between items-center mb-52">
          <LocationView />
          <CartButton onPress={handleCart} />
        </View>
        <SearchBar placeHolder="Search menu.." value={searchQuery} onChangeText={setSearchQuery} placeholderTextColor="#ffffff" textColor="#fff" iconColor="white" />
      </ImageBackground>
      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0} // posisi awal (0 = snapPoints[0])
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: "white", borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
      >
        <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }}>
          <Discount />
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-x-4">
              {CATEGORIES.map((item) => (
                <CategoryCard key={item.key} label={item.label} icon={item.icon} selected={activeCategory === item.key} onPress={() => setActiveCategory(item.key)} />
              ))}
            </View>
          </ScrollView>

          <View className="flex-row justify-between items-center my-6">
            <Text className="font-poppins-medium text-lg">Recommended For You</Text>
            <TouchableOpacity onPress={handleMaintenance} className="">
              <Text className="font-poppins text-sm underline">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between flex-wrap gap-y-5">
            {filteredMenus.length > 0 ? (
              filteredMenus.map((item, index) => <MenuCard key={index} item={item} />)
            ) : (
              <View className="py-10 flex items-center w-full">
                <Text className="text-gray-400 text-base text-center">No menus found for “{searchQuery}”</Text>
              </View>
            )}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default index;

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  muted: { color: "#6B7280", marginTop: 8 },
  error: { color: "#ef4444", fontWeight: "600" },
  header: {
    fontSize: 22,
    fontWeight: "700",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
