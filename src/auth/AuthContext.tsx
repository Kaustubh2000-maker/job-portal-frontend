import { createContext } from "react";

export type Role = "JOBSEEKER" | "COMPANY" | "ADMIN";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
