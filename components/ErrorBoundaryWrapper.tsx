"use client";

import { ErrorBoundary } from "./ErrorBoundary";
import { ErrorBoundaryCyberpunk } from "./ErrorBoundaryCyberpunk";
import { ErrorBoundaryMagazine } from "./ErrorBoundaryMagazine";

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode;
  theme?: "default" | "cyberpunk" | "magazine";
}

export function ErrorBoundaryWrapper({
  children,
  theme = "default",
}: ErrorBoundaryWrapperProps) {
  if (theme === "cyberpunk") {
    return (
      <ErrorBoundaryCyberpunk>{children}</ErrorBoundaryCyberpunk>
    );
  }

  if (theme === "magazine") {
    return <ErrorBoundaryMagazine>{children}</ErrorBoundaryMagazine>;
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
}


