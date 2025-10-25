export type ModalType = "" | "Info" | "Warning" | "Confirm" | "Delete";

export type ModalSliceType = {
  type: ModalType;
  callback?: () => void | void;
  context?: "generate" | "submit";
  setModal: (type: ModalType, callback?: () => void | void) => void;
  closeModal: () => void;
};
