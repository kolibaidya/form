import { create } from "zustand";

type User = {
  id: number;
  username: string;
  forename: string;
  surname: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initializeAuth: () => void;
  login: (user: User) => void;
  logout: () => void;
};
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  initializeAuth: () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    set({ user, isAuthenticated: !!user, isLoading: false });
  },
  login: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isAuthenticated: false });
  },
}));
