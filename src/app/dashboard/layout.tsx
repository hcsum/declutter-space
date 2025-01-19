import * as React from "react";
import UIProvider from "@/components/UIProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UIProvider>{children}</UIProvider>;
}
