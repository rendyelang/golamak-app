import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Text } from "react-native";
import "react-native-reanimated";
import "../assets/css/globals.css";

import { CartProvider } from "@/contexts/CartContext";
import { LikedProvider } from "@/contexts/LikedContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";

// Keep native splash visible until we're ready
SplashScreen.preventAutoHideAsync();

// Set default font for all Text components
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = { fontFamily: "Poppins_400Regular" };

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    // Hide native splash when fonts are loaded
    // This makes way for your custom splash screen
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Show nothing while loading - native splash will show
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <CartProvider>
      <OrderProvider>
        <LikedProvider>
          <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)/splash" />
              <Stack.Screen name="(auth)/welcome" />
              <Stack.Screen name="(tabs)" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </LikedProvider>
      </OrderProvider>
    </CartProvider>
  );
}
