"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuth((state) => state.setUser);
  const clearAuth = useAuth((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchUser = async () => {
      const isAuthenticated = await checkSession();
      if (!isAuthenticated) {
        clearAuth();
        return;
      }

      const user = await getMe();
      if (user) setUser(user);
    };

    fetchUser();
  }, [setUser, clearAuth]);

  return <>{children}</>;
};

export default AuthProvider;