"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Dialog, DialogContent } from "@mui/material";
import AuthForm from "./AuthForm";

interface LoginDialogContextValue {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginDialogContext = createContext<LoginDialogContextValue>({
  open: false,
  setOpen: () => null,
});

export function LoginDialogProvider({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <LoginDialogContext.Provider value={{ open, setOpen }}>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ className: "rounded-2xl shadow-xl" }}
      >
        <DialogContent className="p-0">
          <AuthForm formType="login" compact />
        </DialogContent>
      </Dialog>
      {children}
    </LoginDialogContext.Provider>
  );
}

export function useLoginDialog(): LoginDialogContextValue {
  const context = useContext(LoginDialogContext);
  if (!context) {
    throw new Error("useLoginDialog must be used within LoginDialogProvider");
  }
  return context;
}
