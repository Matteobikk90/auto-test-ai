import type { AuthSliceType } from "@repo/types/src/store/auth";
import type { StateCreator } from "zustand";

const createAuthSlice: StateCreator<AuthSliceType> = (set) => ({
  email: "",
  password: "",
  name: "",
  bio: "",
  image: "",

  setField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),

  resetAuthForm: () =>
    set({
      email: "",
      password: "",
      name: "",
      bio: "",
      image: "",
    }),
});

export default createAuthSlice;
