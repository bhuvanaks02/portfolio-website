"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds of delay, for staggering siblings. */
  delay?: number;
  className?: string;
  id?: string;
  as?: "div" | "li" | "section" | "article" | "span";
};

export function Reveal({
  children,
  delay = 0,
  className,
  id,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();

  // Keep the requested element either way — a plain <div> here would land
  // directly inside a <ul>/<ol> for reduced-motion visitors.
  if (reduced) {
    const Plain = as;
    return (
      <Plain id={id} className={className}>
        {children}
      </Plain>
    );
  }

  const Tag = m[as];

  return (
    <Tag
      id={id}
      className={className}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: 0.25,
        delay: Math.min(delay, 0.06),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Tag>
  );
}
