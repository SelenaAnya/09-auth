import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { UserLogin } from "@/types/user";

export type AuthStore = {
  isAuthenticated: boolean;
  user: UserLogin | null;
  isLoading: boolean;
  
  // Actions
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: UserLogin) => void;
  clearIsAuthenticated: () => void;
  setLoading: (loading: boolean) => void;
};

export const useAuth = create<AuthStore>()(
  devtools(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      isLoading: false,

      setIsAuthenticated: (value) => 
        set({ isAuthenticated: value }, false, 'setIsAuthenticated'),
      
      setUser: (user: UserLogin) => 
        set({ user, isAuthenticated: true }, false, 'setUser'),
      
      clearIsAuthenticated: () => 
        set({ user: null, isAuthenticated: false }, false, 'clearIsAuthenticated'),
      
      setLoading: (loading) => 
        set({ isLoading: loading }, false, 'setLoading'),
    }),
    {
      name: 'auth-store',
    }
  )
);