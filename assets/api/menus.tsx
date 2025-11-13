import { getApiBaseUrl } from "@/scripts/config";

export type Menu = {
  id: number;
  image_url: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
};

export async function getMenus(): Promise<Menu[]> {
  const baseUrl = await getApiBaseUrl();
  const res = await fetch(`${baseUrl}/api/menus/`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch menus: ${res.status}`);

  const json = await res.json();

  if (!json || !json.data || !Array.isArray(json.data)) {
    throw new Error("Invalid response structure from server");
  }

  return json.data;
}
