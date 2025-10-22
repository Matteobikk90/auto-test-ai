import { MODAL_TEMPLATES } from "@/constants/modal";
import { useStore } from "@/store";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/shadcn/dialog";
import { useShallow } from "zustand/shallow";

export function GlobalModal() {
  const { type, closeModal } = useStore(
    useShallow(({ type, closeModal }) => ({ type, closeModal }))
  );

  if (!type) return null;
  const { title, description, footer } =
    MODAL_TEMPLATES[type as keyof typeof MODAL_TEMPLATES];

  return (
    <Dialog open={!!type} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p>{description}</p>
        <DialogFooter>{footer(closeModal)}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
