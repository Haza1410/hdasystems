"use client";

import type { MouseEvent, ReactNode } from "react";
import { scrollToAnchor } from "@/lib/scroll";

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

export default function AnchorLink({
  href,
  className,
  children,
  onNavigate,
}: Props) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        if (!href.startsWith("#")) return;
        e.preventDefault();
        scrollToAnchor(href);
        onNavigate?.();
      }}
    >
      {children}
    </a>
  );
}
