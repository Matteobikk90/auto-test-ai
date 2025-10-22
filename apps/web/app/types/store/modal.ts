export type ModalType = "" | "Info" | "Warning" | "Confirm" | "Delete";

export type ModalSliceType = {
  type: ModalType;
  payload?: () => Promise<void> | undefined;
  setModal: (
    type: ModalType,
    payload?: () => Promise<void> | undefined
  ) => void;
  closeModal: () => void;
};
