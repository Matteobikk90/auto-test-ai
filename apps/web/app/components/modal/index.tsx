import { MODAL_TEMPLATES } from "@/constants/modal";
import { useStore } from "@/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/shadcn/dialog";
import { useShallow } from "zustand/shallow";

export function GlobalModal() {
  const { type, closeModal, callback } = useStore(
    useShallow(({ type, closeModal, callback }) => ({
      type,
      closeModal,
      callback,
    }))
  );

  if (!type) return null;
  const { title, description, footer } =
    MODAL_TEMPLATES[type as keyof typeof MODAL_TEMPLATES];

  return (
    <Dialog open={!!type} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only">
            Confirmation modal
          </DialogDescription>
        </DialogHeader>
        <p>{description}</p>
        <DialogFooter>{footer(closeModal, callback)}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
