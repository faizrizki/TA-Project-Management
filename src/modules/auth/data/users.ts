import { Role } from "../types/auth";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}

/**
 * Daftar user demo. Edit di sini untuk menambah/mengubah user & password.
 * Login akan match terhadap kombinasi email + password di list ini.
 */
export const MOCK_USERS: MockUser[] = [
  {
    id: "u-1",
    name: "Andi Wijaya",
    email: "pm@test.com",
    password: "pm123456",
    role: "PROJECT_MANAGER",
  },
  {
    id: "u-2",
    name: "Admin Sistem",
    email: "admin@test.com",
    password: "admin123",
    role: "ADMIN",
  },
  {
    id: "u-3",
    name: "Budi Santoso",
    email: "member@test.com",
    password: "member123",
    role: "TEAM_MEMBER",
  },
  {
    id: "u-4",
    name: "Citra Lestari",
    email: "client@test.com",
    password: "client123",
    role: "CLIENT",
  },
];

export function findUserByCredentials(email: string, password: string) {
  return (
    MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    ) ?? null
  );
}
