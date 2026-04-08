import ClientPage from "./ClientPage";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Declutter Checklist | DeclutterSpace",
  description:
    "Free declutter checklist to track daily tasks. Organize room-by-room, set deadlines, and build decluttering habits that stick.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ClientPage />
    </Suspense>
  );
}
