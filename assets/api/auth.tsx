import { getApiBaseUrl } from "@/scripts/config";
import axios from "axios";

export interface RegisterResponse {
  message: string;
  account: {
    id: number;
    name: string;
    username: string;
    password: string; // hashed di server
  };
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  admin: {
    id: number;
    name: string;
    username: string;
  };
}

const config = {
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
};

export const registerAdmin = async (name: string, username: string, password: string): Promise<RegisterResponse> => {
  const baseUrl = await getApiBaseUrl();
  try {
    const response = await axios.post(`${baseUrl}/api/admin/add-admin`, { name, username, password }, config);
    return response.data as RegisterResponse;
  } catch (error: any) {
    console.log("Register error:", error.response?.data || error.message);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to register");
    } else {
      throw new Error("Network error");
    }
  }
};

export const loginAdmin = async (username: string, password: string): Promise<LoginResponse> => {
  const baseUrl = await getApiBaseUrl();
  try {
    const response = await axios.post(`${baseUrl}/api/admin/login`, { username, password }, config);
    return response.data as LoginResponse;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Invalid username or password");
    } else {
      throw new Error("Network error");
    }
  }
};
