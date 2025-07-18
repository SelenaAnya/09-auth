"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { updateUser } from "@/lib/api/clientApi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import css from "./EditProfilePage.module.css";

const EditProfile = () => {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    
    const [error, setError] = useState("");

    const handleSubmit = async (formData: FormData) => {
        const editedUserName = String(formData.get("username")).trim();

        if (editedUserName === "") {
            setError("Username is required");
            return;
        }

        if (user) {
            try {
                const editedUserData = await updateUser({
                    username: editedUserName,
                    email: user.email,
                });
                setUser(editedUserData);

                router.push("/profile");
            } catch {
                setError("Ooops.. Something went wrong, try again");
            }
        }
    };

    const handleCancel = () => {
        router.back();
    };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user?.avatar && <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />}

        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              name="username"
              id="username"
              type="text"
              className={css.input}
              defaultValue={user?.username}
            />
          </div>

          <p>{user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
        {error && <p className={css.error}>{error}</p>}
      </div>
    </main>
  );
};

export default EditProfile;