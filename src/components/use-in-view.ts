"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True once the element has come within `margin` of the screen, and stays true.
 * Used to hold back heavy things (code, iframes) until they are about to be seen.
 */
export function useNearScreen<T extends Element>(margin = "300px") {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, near]);

  return [ref, near] as const;
}
