"use client";

import React, { useState } from "react";
import css from "./SignInPage.module.css";
import { getMe, loginUser } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/authStore";

export default function SignInPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser, setIsAuthenticated } = useAuth.getState();

  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await loginUser({ email, password });
      setIsAuthenticated(true);

      const user = await getMe();
      setUser(user);

      router.push("/profile");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("The login or password is incorrect.");
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleLogin} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {errorMessage && <p className={css.error}>{errorMessage}</p>}
      </form>
    </main>
  );
}