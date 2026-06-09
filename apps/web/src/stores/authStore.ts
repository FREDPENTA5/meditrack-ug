import { create } from 'zustand';
import type { AuthUser } from '@meditrack/shared';

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isBootstrapped: boolean;
  setAuth: (user: AuthUser, accessToken: string) => void;
  clearAuth: () => void;
  setBootstrapped: (value: boolean) => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isBootstrapped: false,
  setAuth: (user, accessToken) => set({ user, accessToken }),
  clearAuth: () => set({ user: null, accessToken: null }),
  setBootstrapped: (value) => set({ isBootstrapped: value }),
  isAuthenticated: () => Boolean(get().accessToken && get().user),
}));
