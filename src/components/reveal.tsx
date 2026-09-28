"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds of delay, for staggering siblings. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "span";
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();

  // Keep the requested element either way — a plain <div> here would land
  // directly inside a <ul>/<ol> for reduced-motion visitors.
  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
