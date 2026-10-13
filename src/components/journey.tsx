"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { Reveal } from "@/components/reveal";
import { journey } from "@/content/site";

/** The timeline on the home page; its spine fills in as you scroll past. */
export function Journey() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });

  return (
    <ol ref={ref} className="relative">
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-[5px] top-2 w-px bg-rule sm:left-[9.5rem]"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reduced ? 1 : scrollYProgress }}
        className="absolute bottom-0 left-[5px] top-2 w-px origin-top bg-accent sm:left-[9.5rem]"
      />

      {journey.map((era, i) => (
        <Reveal
          as="li"
          key={era.verb}
          className="relative grid gap-x-10 gap-y-2 pb-12 pl-8 last:pb-0 sm:grid-cols-[8rem_1fr] sm:pb-16 sm:pl-0"
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-1.5 size-[11px] rounded-full border border-accent bg-paper sm:left-[calc(9.5rem-5px)]"
          />
          <p className="label pt-1 tabular-nums">{era.years}</p>

          <div className="sm:pl-10">
            <h3 className="display flex items-baseline gap-3 text-3xl sm:text-4xl">
              <span className="label">{String(i + 1).padStart(2, "0")}</span>
              {era.verb}
            </h3>
            <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">
              {era.text}
            </p>
            <p className="mt-3 text-sm text-ink-muted">{era.place}</p>
            {era.lesson && (
              <p className="mt-5 max-w-lg border-l border-accent pl-4 font-serif text-xl italic leading-snug text-ink">
                {era.lesson}
              </p>
            )}
            <Link
              href={era.href}
              className="link-underline mt-5 inline-block text-sm text-accent"
            >
              {era.cta} →
            </Link>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
