"use client";

import { useEffect } from "react";

const RETRO = "/retro/index.html";
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/** The hidden way into the retro site: the Konami code, or the quiet glyph. */
export function RetroDoor() {
  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      pos = e.key === KONAMI[pos] ? pos + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (pos === KONAMI.length) window.location.href = RETRO;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <a
      href={RETRO}
      aria-label="Secret retro version of this site"
      title="↑ ↑ ↓ ↓ ← → ← → B A"
      className="ml-2 opacity-40 transition-opacity duration-300 hover:text-accent hover:opacity-100"
    >
      ▸
    </a>
  );
}
