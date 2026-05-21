import api from "@/lib/axios";

export const login = async (data: any) => {
  return await api.post("/login", data);
};

export const register = async (data: any) => {
  return await api.post("/register", data);
};