// store/theme.ts
import { create } from "zustand";

type ThemeState = {
  dark: boolean;
  toggleDark: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  dark: false,
  toggleDark: () =>
    set((state) => {
      const newDark = !state.dark;
      if (newDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return { dark: newDark };
    }),
}));
