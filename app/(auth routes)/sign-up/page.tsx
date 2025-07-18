// app/(auth routes)/sign-up/page.tsx
"use client";

import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";
import { useState } from "react";

import { registerUser, getMe } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";

export default function SignUP() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { setUser, setIsAuthenticated } = useAuth.getState();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            // Реєструємо користувача
            await registerUser({ email, password });
            
            // Встановлюємо автентифікацію
            setIsAuthenticated(true);
            
            // Отримуємо повну інформацію про користувача
            const user = await getMe();
            setUser(user);
            
            router.push("/profile");
        } catch (error) {
            console.error("Registration error:", error);
            setErrorMessage(
                "Registration failed. The account may already exist or an error occurred."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={css.mainContent}>
            <h1 className={css.formTitle}>Sign up</h1>
            <form className={css.form} onSubmit={handleSubmit}>
                <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className={css.input}
                        required
                        disabled={isLoading}
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
                        disabled={isLoading}
                    />
                </div>

                <div className={css.actions}>
                    <button 
                        type="submit" 
                        className={css.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                </div>

                {errorMessage && <p className={css.error}>{errorMessage}</p>}
            </form>
        </main>
    );
}