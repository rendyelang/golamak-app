import GoogleLogo from "@/assets/images/icons/google_logo.svg";
import React from "react";
import { TouchableOpacity } from "react-native";

const GoogleAuthBtn = ({ onPress }) => {
  return (
    <TouchableOpacity className="p-2 bg-white rounded-lg border border-tertier self-center items-center justify-center shadow-sm" onPress={onPress}>
      <GoogleLogo />
    </TouchableOpacity>
  );
};

export default GoogleAuthBtn;
