import { create } from "zustand";
import { UserLogin } from "@/types/user";

export type AuthStore = {
  isAuthenticated: boolean;
  user: UserLogin | null;
  setUser: (user: UserLogin) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: UserLogin) => set(() => ({ user, isAuthenticated: true })),
  clearIsAuthenticated: () =>
    set(() => ({ user: null, isAuthenticated: false })),
}));