import React from "react";
import { Text, TouchableOpacity } from "react-native";

const OrderStatusButton = ({ label, isActive, onPress }) => {
  // 1. Tentukan Kelas Latar Belakang dan Teks
  const buttonBgClass = isActive
    ? "bg-[#a31a1a]" // Warna merah marun/merah gelap (gunakan hex code untuk akurasi)
    : "bg-gray-300"; // Abu-abu terang

  const buttonTextClass = isActive
    ? "text-white" // Teks Putih jika aktif
    : "text-gray-700"; // Abu-abu tua jika tidak aktif

  // 2. Gabungkan kelas-kelas (Base classes + Dynamic classes)
  const buttonClasses = `
    px-5 py-2 h-10 m-1 rounded-xl 
    ${buttonBgClass}
  `;

  const textClasses = `
    text-base font-semibold 
    ${buttonTextClass}
  `;

  return (
    <TouchableOpacity onPress={onPress} className={buttonClasses.trim()}>
      <Text className={textClasses.trim()}>{label}</Text>
    </TouchableOpacity>
  );
};

export default OrderStatusButton;
