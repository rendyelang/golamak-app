export type Menu = {
  id: number;
  image_url: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
};

// Ganti sesuai URL ngrok kamu
const BASE_URL = "https://c9f8000c6577.ngrok-free.app";

export async function getMenus(): Promise<Menu[]> {
  const res = await fetch(`${BASE_URL}/api/menus/`, {
    headers: {
      "ngrok-skip-browser-warning": "true", // ✅ ini penting
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch menus: ${res.status}`);

  const json = await res.json();

  // ✅ Validasi supaya tidak error jika struktur tidak sesuai
  if (!json || !json.data || !Array.isArray(json.data)) {
    throw new Error("Invalid response structure from server");
  }

  return json.data;
}
