import type { ModalSliceType } from "@/types/store/modal";
import type { StateCreator } from "zustand";

const createModalSlice: StateCreator<ModalSliceType> = (set) => ({
  type: "",
  payload: undefined,
  setModal: (type, payload) => set({ type, payload }),
  closeModal: () => set({ type: "", payload: undefined }),
});

export default createModalSlice;
