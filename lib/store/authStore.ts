import { create } from "zustand";

type AuthUser = {
    username: string;
    email: string;
    avatar?: string;
};
export type AuthStore = {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    user: AuthUser | null;
    setUser: (user: AuthUser) => void;
    clearIsAuthenticated: () => void;
};

export const useAuth = create<AuthStore>()((set) => ({
    isAuthenticated: false,
    user: null,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user: AuthUser) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));
