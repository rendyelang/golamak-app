import BackButton from "@/components/BackButton";
import { Button } from "@/components/signInUpButton";
import FaqItem from "@/components/spesific/FaqItem";
import SearchBar from "@/components/spesific/SearchBar";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

const helpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqData = [
    {
      question: "What is GoLamak?",
      answer: "GoLamak is a food ordering app that helps you discover, order, and enjoy your favorite meals easily.",
    },
    {
      question: "Is my personal data safe?",
      answer: "Yes, we prioritize your privacy and apply security measures to protect all user data.",
    },
    {
      question: "How do I order food in GoLamak?",
      answer: "Simply browse menus, select your items, and confirm your order through the checkout page.",
    },
    {
      question: "Do I need to create an account to use GoLamak?",
      answer: "Yes, an account helps us personalize your experience and track your orders.",
    },
    {
      question: "Can I change my password account?",
      answer: "Of course, you can change your password anytime in your profile settings.",
    },
    {
      question: "Does GoLamak offer delivery service?",
      answer: "Yes, GoLamak offers fast and reliable delivery service in selected areas.",
    },
  ];

  return (
    <View>
      {/* Header */}
      <View className="flex-row items-center border-b-2 border-tertier z-10 px-5 mt-10 pb-3">
        <BackButton />
        <Text className="font-poppins-semibold ml-4 text-lg">Help Center</Text>
      </View>

      <ScrollView className="px-5">
        <Text className="font-poppins text-2xl my-5">We’re here to help you with anything and everyting on GoLamak</Text>
        <Text className="font-poppins text-gray-500 mb-3">
          At GoLamak, we believe every day should start with good taste and great mood. Craving Padang food today? We’ve got you covered! Share your concern or check our frequently asked questions below — because your satisfaction is our
          best recipe.
        </Text>
        <SearchBar placeHolder="Search Help.." value={searchQuery} onChangeText={setSearchQuery} placeholderTextColor="#000000" textColor="#000000" iconColor="black" />

        <View className="mt-6">
          <Text className="font-poppins-bold text-[16px] mb-2">FAQ</Text>
          <ScrollView>
            <View className="bg-white rounded-2xl shadow-sm px-4 py-2">
              {faqData.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </View>
          </ScrollView>
        </View>

        <View className="mt-6 flex-col items-center gap-y-4 pb-40">
          <Text className="font-poppins-medium">Still confuse? Help us a mail away</Text>
          <Button title="Send a message" variant="primary" onPress={() => console.log("Button clicked")} />
        </View>
      </ScrollView>
    </View>
  );
};

export default helpCenter;
