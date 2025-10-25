import { Button } from "@repo/ui/components/shadcn/button";

export const MODAL_TEMPLATES = {
  Info: {
    title: "Information",
    description: "This is just an informational message.",
    footer: (close: () => void) => <Button onClick={close}>Close</Button>,
  },
  Warning: {
    title: "Warning",
    description:
      "Generating vague or repetitive prompts may waste resources and result in warnings. Proceed?",
    footer: (close: () => void, onConfirm?: () => Promise<void> | void) => (
      <>
        <Button variant="ghost" onClick={close}>
          Cancel
        </Button>
        <Button
          onClick={async () => {
            close();
            if (onConfirm) await onConfirm();
          }}>
          Understood
        </Button>
      </>
    ),
  },
  Confirm: {
    title: "Please confirm",
    description:
      "Submitting meaningless or spam code may lead to a warning or suspension. Proceed?",
    footer: (close: () => void, onConfirm?: () => Promise<void> | void) => (
      <>
        <Button variant="ghost" onClick={close}>
          Cancel
        </Button>
        <Button
          onClick={async () => {
            close();
            if (onConfirm) await onConfirm();
          }}>
          Confirm
        </Button>
      </>
    ),
  },
};
