"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

export default function ChecklistPdfLink({
  href,
  area,
  source,
  className,
  children,
}: {
  href: string;
  area: string;
  source: "checklist_resources" | "checklist_printable";
  className: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      download
      className={className}
      onClick={() =>
        trackEvent("download_pdf", { source, area, format: "static_pdf" })
      }
    >
      {children}
    </a>
  );
}
