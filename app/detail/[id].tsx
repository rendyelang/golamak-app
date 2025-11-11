import { getMenus, Menu } from "@/assets/api/menus"; // ✅ ambil dari API
import ADDONS from "@/assets/data/addons";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/signInUpButton";
import AddonCard from "@/components/spesific/AddonCard";
import { useCart } from "@/contexts/CartContext";
import { useLiked } from "@/contexts/LikedContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";

const DetailPage = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { id } = useLocalSearchParams();
  const { toggleLike, isLiked } = useLiked();

  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menus = await getMenus(); // ✅ panggil API
        const found = menus.find((item) => item.id === parseInt(id as string));
        setMenu(found || null);
      } catch (error) {
        console.error("Failed to load menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading menu...</Text>
      </View>
    );
  }

  if (!menu) {
    return (
      <View style={styles.center}>
        <Text>Menu not found.</Text>
      </View>
    );
  }

  const handleSelectAddon = (addonId: number) => {
    setSelectedAddons((prev) => (prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]));
  };

  const totalAddonPrice = selectedAddons.reduce((acc, addonId) => {
    const addon = ADDONS.find((a) => a.id === addonId);
    return acc + (addon?.price || 0);
  }, 0);

  const totalPrice = (menu?.price || 0) * qty + totalAddonPrice;

  const handleAddToCart = () => {
    addToCart({
      id: menu.id,
      name: menu.name,
      image: { uri: menu.image_url }, // ✅ ubah ke { uri: ... } untuk <Image />
      quantity: qty,
      addons: ADDONS.filter((a) => selectedAddons.includes(a.id)),
      basePrice: menu.price,
      price: totalPrice,
      uniqueKey: `${menu.id}-${Date.now()}`,
    });

    ToastAndroid.show(`${menu.name} added to cart`, 1);
    setTimeout(() => router.push("/(tabs)"), 100);
  };

  const liked = isLiked(menu.id);
  const relatedAddons = ADDONS.filter((addon) => addon.categories.includes(menu.category));

  return (
    <View className="relative flex-1">
      {/* Gambar */}
      <View className="relative">
        <Image className="w-full h-96" source={{ uri: menu.image_url }} /> {/* ✅ */}
        <View className="absolute top-12 left-5">
          <BackButton />
        </View>
        <View className="absolute top-12 right-5">
          <TouchableOpacity onPress={() => toggleLike(menu)} className="bg-white/60 p-2 rounded-full border border-tertier">
            <Ionicons name={liked ? "heart" : "heart-outline"} size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Info Menu */}
      <View className="px-5 pt-10">
        <Text className="font-poppins-medium text-3xl mb-5">{menu.name}</Text>
        <Text className="font-poppins">{menu.description}</Text>

        {/* Addons */}
        <View className="flex-row items-center my-5 gap-x-3">
          <Text className="font-poppins-medium text-xl">Addons</Text>
          <Text className="font-poppins-semibold text-tertier text-lg">+ Rp. {totalAddonPrice.toLocaleString("id-ID")}</Text>
        </View>

        <View className="flex-row flex-wrap gap-4">
          {relatedAddons.length > 0 ? (
            relatedAddons.map((item) => <AddonCard key={item.id} icon={item.image} label={item.name} selected={selectedAddons.includes(item.id)} onPress={() => handleSelectAddon(item.id)} />)
          ) : (
            <Text className="text-gray-400 font-poppins">No addons available for this category</Text>
          )}
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomContainer}>
        <View className="flex-row justify-between items-center mb-5">
          <View className="flex-row items-center gap-x-4">
            <TouchableOpacity onPress={() => setQty((prev) => Math.max(1, prev - 1))} className={`w-9 h-9 rounded-full items-center justify-center ${qty === 1 ? "bg-[#D9D9D9]" : "border border-secondary"}`} disabled={qty === 1}>
              <Text style={{ fontSize: 18 }}>−</Text>
            </TouchableOpacity>

            <Text className="font-poppins-medium text-xl">{qty}</Text>

            <TouchableOpacity onPress={() => setQty((prev) => prev + 1)} className="w-9 h-9 rounded-full items-center justify-center bg-secondary">
              <Text style={{ fontSize: 18, color: "white" }}>＋</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="font-poppins-light">Total Amount</Text>
            <Text className="font-bold text-2xl">Rp. {totalPrice.toLocaleString("id-ID")}</Text>
          </View>
        </View>
        <Button title="Add to Cart" variant="primary" onPress={handleAddToCart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ED9636",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 12,
  },
});

export default DetailPage;
