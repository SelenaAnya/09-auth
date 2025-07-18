import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AuthUser = {
  username: string;
  email: string;
  avatar?: string;
};

export type AuthStore = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
  
  // Actions
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: AuthUser) => void;
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
      
      setUser: (user: AuthUser) => 
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