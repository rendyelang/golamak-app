import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { TouchableOpacity } from "react-native";

const EditButton = () => {
  return (
    <TouchableOpacity className="p-2 self-end bg-secondary rounded-full flex justify-center items-center">
      <Feather name="edit" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default EditButton;
