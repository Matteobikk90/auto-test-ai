import createAuthSlice from "@/store/slices/auth";
import createThemeSlice from "@/store/slices/theme";
import type { StoreState } from "@/types/store";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

export const useStore = create<StoreState>()(
  persist(
    subscribeWithSelector((set, get, store) => ({
      ...createThemeSlice(set, get, store),
      ...createAuthSlice(set, get, store),
    })),
    {
      name: "global-store",
      partialize: ({ theme }) => ({
        theme,
      }),
    }
  )
);
