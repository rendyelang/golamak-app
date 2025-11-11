import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

import { Menu, getMenus } from "@/assets/api/menus";
import CATEGORIES from "@/assets/data/categories";
import rumahMinang from "@/assets/images/rumah_minang.png";

import CartButton from "@/components/CartButton";
import CategoryCard from "@/components/spesific/CategoryCard";
import Discount from "@/components/spesific/Discount";
import LocationView from "@/components/spesific/LocationView";
import MenuCard from "@/components/spesific/MenuCard";
import SearchBar from "@/components/spesific/SearchBar";
import handleMaintenance from "@/scripts/handleMaintenance";

import MenuSkeleton from "@/components/skeleton/MenuSkeleton";

const IndexScreen = () => {
  const router = useRouter();

  // 🧠 Hooks harus selalu di atas
  const [data, setData] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["57%", "90%"], []);

  // 🔄 Load data
  const loadMenus = useCallback(async () => {
    try {
      setError(null);
      const menus = await getMenus();
      setData(menus);
    } catch (err: any) {
      setError(err.message || "Failed to load menus");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadMenus();
  }, [loadMenus]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadMenus();
  }, [loadMenus]);

  // 🔍 Filter menus
  const filteredMenus = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return data.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query) || item.price.toString().toLowerCase().includes(query);

      const matchCategory = activeCategory === "all" || item.category === activeCategory;

      return matchSearch && matchCategory;
    });
  }, [data, searchQuery, activeCategory]);

  // 🛒 Handler
  const handleCart = () => router.push("/cart");

  // 🧩 UI Render
  if (loading) {
    return <MenuSkeleton />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
        <TouchableOpacity onPress={onRefresh}>
          <Text style={[styles.muted, { textDecorationLine: "underline" }]}>Tap to retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* 🔺 Header */}
      <ImageBackground className="pt-14 pb-14 px-5" source={rumahMinang} resizeMode="stretch">
        <View className="flex-row justify-between items-center mb-52">
          <LocationView />
          <CartButton onPress={handleCart} />
        </View>
        <SearchBar placeHolder="Search menu.." value={searchQuery} onChangeText={setSearchQuery} placeholderTextColor="#ffffff" textColor="#fff" iconColor="white" />
      </ImageBackground>

      {/* ⬆️ Bottom Sheet */}
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints} enablePanDownToClose={false} backgroundStyle={{ backgroundColor: "white", borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
        <BottomSheetScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 100,
          }}
        >
          {/* Diskon */}
          <Discount />

          {/* Kategori */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-x-4">
              {CATEGORIES.map((item) => (
                <CategoryCard key={item.key} label={item.label} icon={item.icon} selected={activeCategory === item.key} onPress={() => setActiveCategory(item.key)} />
              ))}
            </View>
          </ScrollView>

          {/* Rekomendasi */}
          <View className="flex-row justify-between items-center my-6">
            <Text className="font-poppins-medium text-lg">Recommended For You</Text>
            <TouchableOpacity onPress={handleMaintenance}>
              <Text className="font-poppins text-sm underline">View All</Text>
            </TouchableOpacity>
          </View>

          {/* List menu */}
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

export default IndexScreen;

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  muted: { color: "#6B7280", marginTop: 8 },
  error: { color: "#ef4444", fontWeight: "600" },
});
