"use client";

import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/** Wrapper kept for layout API compatibility — no scroll-gated hiding. */
export default function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}
