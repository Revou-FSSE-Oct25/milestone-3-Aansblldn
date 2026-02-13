// src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

// Helper untuk set cookie (client-side)
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('https://api.escuelajs.co/api/v1/users');
          
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          
          const allUsers: User[] = await response.json();
          
          const matchedUser = allUsers.find(
            (singleUser) => {
              const emailMatch = singleUser.email === email;
              const passwordMatch = singleUser.password === password;
              return emailMatch && passwordMatch;
            }
          );

          if (matchedUser) {
            set({ 
              user: matchedUser, 
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
            
            // Set cookie untuk middleware (simpan minimal data)
            setCookie('auth-token', 'authenticated', 7);
            
            return true;
          } else {
            set({ 
              error: 'Invalid email or password',
              isLoading: false 
            });
            return false;
          }
        } catch (error) {
          set({ 
            error: 'Login failed. Please try again.',
            isLoading: false 
          });
          return false;
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false,
          error: null
        });
        
        // Hapus cookie
        deleteCookie('auth-token');
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);