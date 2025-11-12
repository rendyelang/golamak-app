import axios from "axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

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

// Register logic
export const registerAdmin = async (name: string, username: string, password: string): Promise<RegisterResponse> => {
  try {
    console.log(API_BASE_URL);
    const response = await axios.post(
      `${API_BASE_URL}/api/admin/add-admin`,
      {
        name,
        username,
        password,
      },
      config
    );

    return response.data as RegisterResponse;
  } catch (error: any) {
    console.log("Register error:", error.response?.data || error.message); // 🟩 log detail error
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to register");
    } else {
      throw new Error("Network error");
    }
  }
};

// logic logic
export const loginAdmin = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/admin/login`,
      {
        username,
        password,
      },
      config
    );

    return response.data as LoginResponse;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Invalid username or password");
    } else {
      throw new Error("Network error");
    }
  }
};
