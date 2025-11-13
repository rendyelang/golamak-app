// src/config.ts
let API_BASE_URL: string | null = null;

// Fungsi ambil URL API dari GitHub
export async function getApiBaseUrl(): Promise<string> {
  if (API_BASE_URL) return API_BASE_URL; // cache biar gak fetch berulang

  try {
    const res = await fetch("https://raw.githubusercontent.com/rendyelang/restau_api_url_ngrok/main/config.json");
    const data = await res.json();
    API_BASE_URL = data.API_URL;
    console.log("berhasil", API_BASE_URL);
    return API_BASE_URL;
  } catch (error) {
    console.warn("⚠️ Gagal fetch config.json, pakai fallback .env");
    console.error(error);
    return process.env.EXPO_PUBLIC_API_URL || "";
  }
}
