"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { site, socials } from "@/content/site";

const isDev = process.env.NODE_ENV === "development";

/** Splits the tagline so the em-dash clause can be set in italic serif. */
function Tagline() {
  const [lead, ...rest] = site.tagline.split("—");
  return (
    <>
      {lead.trim()}
      {rest.length > 0 && (
        <>
          {" — "}
          <span className="font-serif italic text-ink-soft">
            {rest.join("—").trim()}
          </span>
        </>
      )}
    </>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  // In dev, clicking the portrait flips its shape so the two can be compared.
  const [shape, setShape] = useState(site.avatarShape);

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.85,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  const links = socials.filter((s) => s.href);

  return (
    <section className="px-4 pt-16 pb-16 sm:px-8 sm:pt-28 sm:pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
          <div className="min-w-0">
            {site.availability.open && (
              <motion.p
                {...rise(0)}
                className="label flex items-center gap-2 text-accent"
              >
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                {site.availability.label}
              </motion.p>
            )}

            <motion.h1 {...rise(0.08)} className="display mt-7 text-display">
              {site.name}
            </motion.h1>
          </div>

          <motion.div {...rise(0.05)} className="shrink-0">
            <div
              onClick={
                isDev
                  ? () => setShape((s) => (s === "circle" ? "square" : "circle"))
                  : undefined
              }
              title={isDev ? `Click to toggle shape (${shape})` : undefined}
              className={`relative size-32 overflow-hidden border border-rule bg-paper-raised transition-[border-radius] duration-300 sm:size-40 ${
                shape === "circle" ? "rounded-full" : "rounded-2xl"
              } ${isDev ? "cursor-pointer" : ""}`}
            >
              <Image
                src="/avatar.jpg"
                alt={`Portrait of ${site.name}`}
                fill
                sizes="(min-width: 640px) 10rem, 8rem"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        <motion.p
          {...rise(0.16)}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl"
        >
          <Tagline />
        </motion.p>

        <motion.div
          {...rise(0.24)}
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition-transform duration-300 hover:-translate-y-0.5"
          >
            Work
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="link-underline text-sm text-ink-soft"
          >
            {site.email}
          </a>
          {links
            .filter((s) => !s.href?.startsWith("mailto:"))
            .map((s) => (
              <a
                key={s.label}
                href={s.href as string}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-sm text-ink-soft"
              >
                {s.label}
              </a>
            ))}
        </motion.div>

        <motion.p {...rise(0.32)} className="label mt-14">
          {site.role} · {site.location}
        </motion.p>
      </div>
    </section>
  );
}
