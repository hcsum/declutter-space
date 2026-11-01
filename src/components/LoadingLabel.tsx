import type { ReactNode } from "react";

export default function LoadingLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center justify-center gap-2"
      role="status"
    >
      <span
        aria-hidden="true"
        className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none"
      />
      <span>{children}</span>
    </span>
  );
}
