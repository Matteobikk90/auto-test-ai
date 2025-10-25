import type { ModalSliceType } from "@/types/store/modal";
import type { StateCreator } from "zustand";

const createModalSlice: StateCreator<ModalSliceType> = (set) => ({
  type: "",
  callback: undefined,
  context: undefined,
  setModal: (type, callback) => set({ type, callback }),
  closeModal: () => set({ type: "", callback: undefined }),
});

export default createModalSlice;
