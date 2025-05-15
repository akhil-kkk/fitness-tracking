import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (email: string, password: string) => {
        // Simulate API call
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email,
          joinedDate: new Date().toISOString(),
        };
        set({ user: mockUser });
      },
      register: async (name: string, email: string, password: string) => {
        // Simulate API call
        const mockUser: User = {
          id: '1',
          name,
          email,
          joinedDate: new Date().toISOString(),
        };
        set({ user: mockUser });
      },
      logout: () => {
        set({ user: null });
      },
      updateProfile: (data: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);