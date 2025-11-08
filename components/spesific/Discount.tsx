import Waiter from "@/assets/images/waiter.svg";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Discount = () => {
  return (
    <TouchableOpacity className="bg-secondary rounded-3xl px-5 py-5 relative mb-5">
      <Text className="font-poppins text-2xl text-white">Grab Our Exclusive </Text>
      <View className="flex-row gap-x-1  mb-5">
        <Text className="text-2xl text-white font-poppins">Food</Text>
        <Text className="font-poppins-bold text-2xl text-white">Discount</Text>
        <Text className="text-2xl text-white font-poppins">Now!</Text>
      </View>
      <TouchableOpacity className="border border-tertier bg-[#6E1919] px-3 py-2 self-start rounded-3xl">
        <Text className="text-white">Order Now</Text>
      </TouchableOpacity>
      {/* <Image className="absolute -right-5 -bottom-4" source={maskot} /> */}
      <View className="absolute -right-5 -bottom-4">
        <Waiter />
      </View>
    </TouchableOpacity>
  );
};

export default Discount;
