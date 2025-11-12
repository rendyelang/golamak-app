import * as SecureStore from "expo-secure-store";

export async function saveAuthData(accessToken: string, refreshToken: string, user: any) {
  await SecureStore.setItemAsync("accessToken", accessToken);
  await SecureStore.setItemAsync("refreshToken", refreshToken);
  await SecureStore.setItemAsync("user", JSON.stringify(user));
}

export async function getAuthData() {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const refreshToken = await SecureStore.getItemAsync("refreshToken");
  const user = await SecureStore.getItemAsync("user");
  return {
    accessToken,
    refreshToken,
    user: user ? JSON.parse(user) : null,
  };
}

export async function clearAuthData() {
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("refreshToken");
  await SecureStore.deleteItemAsync("user");
}
