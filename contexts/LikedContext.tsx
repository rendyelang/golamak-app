import React, { createContext, useContext, useState } from "react";

const LikedContext = createContext();

export const LikedProvider = ({ children }) => {
  const [likedMenus, setLikedMenus] = useState([]);

  const toggleLike = (menu) => {
    setLikedMenus((prev) => {
      const isLiked = prev.some((item) => item.id === menu.id);

      if (isLiked) {
        // Hapus dari daftar liked
        return prev.filter((item) => item.id !== menu.id);
      } else {
        // Tambahkan ke daftar liked
        return [...prev, menu];
      }
    });
  };

  const isLiked = (menuId) => {
    return likedMenus.some((item) => item.id === menuId);
  };

  return (
    <LikedContext.Provider
      value={{
        likedMenus,
        toggleLike,
        isLiked,
        likedCount: likedMenus.length,
      }}
    >
      {children}
    </LikedContext.Provider>
  );
};

export const useLiked = () => {
  const context = useContext(LikedContext);
  if (!context) {
    throw new Error("useLiked must be used within LikedProvider");
  }
  return context;
};
