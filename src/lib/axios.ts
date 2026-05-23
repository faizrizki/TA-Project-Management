import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

function readTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = readTokenFromCookie();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      document.cookie = "token=; Max-Age=0; path=/";
      window.location.replace("/auth/login");
    }
    return Promise.reject(error);
  }
);

export default api;
