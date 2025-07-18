"use client";

import React, { useState } from "react";
import css from "./SignInPage.module.css";
import { RegisterRequest, loginUser } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/authStore";

const SignIn = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    const setUser = useAuth((state) => state.setUser);
    
    const handleSubmit = async (formData: FormData) => {
        try {
            const userFormData = Object.fromEntries(formData) as RegisterRequest;
            const user = await loginUser(userFormData);
            
            if (user) {
                setUser(user);
                router.push("/profile");
            } else {
                setError("Invalid email or password");
            }
        } catch {
            setError("Ooops.. Something went wrong, try again");
        }
    }

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
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

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}