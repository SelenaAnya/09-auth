'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { clientApi } from '@/lib/api/clientApi';
import css from './page.module.css';

export default function EditProfilePage() {
    const { user, setUser } = useAuthStore();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user?.username) {
            setUsername(user.username);
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const updatedUser = await clientApi.updateProfile({ username });
            setUser(updatedUser);
            router.push('/profile');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Update failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        router.push('/profile');
    };

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image
                    src={user?.avatar || '/default-avatar.png'}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />

                <form className={css.profileInfo} onSubmit={handleSubmit}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            type="text"
                            className={css.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <p>Email: {user?.email || 'Not available'}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton} disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save'}
                        </button>
                        <button type="button" className={css.cancelButton} onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>

                    {error && <p className={css.error}>{error}</p>}
                </form>
            </div>
        </main>
    );
}