import { create } from "zustand";
import { persist } from "zustand/middleware";

import { MOCK_USERS } from "@/modules/auth/data/users";

import { AppUser, UserPayload } from "../types/user";

interface UserState {
  users: AppUser[];
  addUser: (data: UserPayload) => void;
  updateUser: (id: string, data: Partial<UserPayload>) => void;
  deleteUser: (id: string) => void;
  findByCredentials: (email: string, password: string) => AppUser | null;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: MOCK_USERS,

      addUser: (data) =>
        set((state) => ({
          users: [
            ...state.users,
            {
              id: `u-${Date.now()}`,
              ...data,
            },
          ],
        })),

      updateUser: (id, data) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id ? { ...u, ...data } : u
          ),
        })),

      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        })),

      findByCredentials: (email, password) => {
        return (
          get().users.find(
            (u) => u.email === email && u.password === password
          ) ?? null
        );
      },
    }),
    {
      name: "user-storage",
    }
  )
);
