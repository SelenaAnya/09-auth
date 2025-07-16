"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuth((state) => state.setUser);
  const clearAuth = useAuth((state) => state.clearIsAuthenticated);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const isValid = await checkSession();
        console.log("Session check result:", isValid);

        if (isValid) {
          const user = await getMe();
          console.log("User data:", user);
          setUser(user);
        } else {
          clearAuth();
        }
      } catch (error) {
        console.error("Session check error:", error);
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [setUser, clearAuth]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;