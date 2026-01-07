"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type DialogValue = {
  title: string;
  content: ReactNode;
  actions?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
};

interface DialogContextValue {
  dialogContent: DialogValue | undefined;
  setDialogContent: Dispatch<SetStateAction<DialogValue | undefined>>;
}

const DialogContext = createContext<DialogContextValue>({
  dialogContent: undefined,
  setDialogContent: () => null,
});

const DialogProvider = ({ children }: { children?: ReactNode }) => {
  const [dialogContent, setDialogContent] = useState<DialogValue | undefined>();

  const handleConfirm = () => {
    dialogContent?.onConfirm?.();
    setDialogContent(undefined);
  };

  const handleCancel = () => {
    dialogContent?.onCancel?.();
    setDialogContent(undefined);
  };

  return (
    <DialogContext.Provider
      value={{
        dialogContent,
        setDialogContent,
      }}
    >
      <Dialog
        open={Boolean(dialogContent)}
        onClose={() => setDialogContent(undefined)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ className: "rounded-2xl shadow-xl" }}
      >
        <DialogTitle className="px-6 pt-6 pb-2 sm:px-8 sm:pt-8 sm:pb-3 text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {dialogContent?.title}
        </DialogTitle>
        <DialogContent className="px-6 py-4 sm:px-8 sm:py-6 text-neutral-700 dark:text-neutral-300">
          {dialogContent?.content}
        </DialogContent>
        <DialogActions className="px-6 py-4 sm:px-8 sm:py-6">
          {dialogContent?.actions || (
            <>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleConfirm}>Confirm</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      {children}
    </DialogContext.Provider>
  );
};

const useDialogState = (): DialogContextValue => {
  if (!DialogContext) {
    throw new Error("useDialogState must be used within a DialogProvider");
  }
  const context = useContext(DialogContext);
  return context;
};

export { DialogProvider, useDialogState };
