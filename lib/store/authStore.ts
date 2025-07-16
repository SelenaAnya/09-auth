import { create } from "zustand";

type AuthUser = {
    username: string;
    email: string;
    avatar?: string;
};
export type useAuthStore = {
    isAuthenticated: boolean;
    user: AuthUser | null;
    setUser: (user: AuthUser) => void;
    clearIsAuthenticated: () => void;
};

export const useAuth = create<useAuthStore>()((set) => ({
    isAuthenticated: false,
    user: null,
    setUser: (user: AuthUser) => set({ user, isAuthenticated: true }),
    clearIsAuthenticated: () =>
        set({
            isAuthenticated: false,
            user: null,
        }),
})); 