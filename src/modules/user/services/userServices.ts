import api from "@/lib/axios";
import { UserPayload } from "../types/user";

export const fetchUsers = async () => {
  return await api.get("/users");
};

export const createUser = async (data: UserPayload) => {
  return await api.post("/users", data);
};

export const updateUser = async (id: string, data: Partial<UserPayload>) => {
  return await api.put(`/users/${id}`, data);
};

export const deleteUser = async (id: string) => {
  return await api.delete(`/users/${id}`);
};
