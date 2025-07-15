'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { clientApi } from '@/lib/api/clientApi';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const { user, isAuthenticated, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await clientApi.logout();
      clearAuth();
      router.push('/sign-in');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isAuthenticated && user) {
    return (
      <>
        <li className={css.navigationItem}>
          <a href="/profile" className={css.navigationLink}>
            Profile
          </a>
        </li>
        <li className={css.navigationItem}>
          <p className={css.userEmail}>{user.email}</p>
          <button className={css.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.navigationItem}>
        <a href="/sign-in" className={css.navigationLink}>
          Login
        </a>
      </li>
      <li className={css.navigationItem}>
        <a href="/sign-up" className={css.navigationLink}>
          Sign up
        </a>
      </li>
    </>
  );
}