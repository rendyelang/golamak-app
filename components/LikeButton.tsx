import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const LikeButton = () => {
  const router = useRouter();
  // const { toggleLike, isLiked } = useLiked();
  // const liked = isLiked(item.id);

  // const handleLike = () => {
  //   toggleLike(item);
  // };

  return (
    <TouchableOpacity onPress={() => router.push("/liked")} className="bg-white/60 p-2 rounded-full border border-tertier">
      <Ionicons name="heart" size={24} color="red" />
    </TouchableOpacity>
  );
};

export default LikeButton;
