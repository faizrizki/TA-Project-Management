import { Role } from "@/modules/auth/types/auth";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface UserPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
}
