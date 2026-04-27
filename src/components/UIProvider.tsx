"use client";

import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import theme from "@/client-lib/mui-theme";
import { ThemeProvider } from "@mui/material/styles";
import { useLightDarkMode } from "./LightDarkModeContext";
import { SnackBarProvider } from "./SnackbarProvider";
import { DialogProvider } from "./DialogProvider";
import { LoginDialogProvider } from "./LoginDialogProvider";
export default function UIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useLightDarkMode();
  const currentTheme = theme(mode);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={currentTheme}>
        <SnackBarProvider>
          <DialogProvider>
            <LoginDialogProvider>{children}</LoginDialogProvider>
          </DialogProvider>
        </SnackBarProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
