"use client";

import Image from "next/image";
import { useState } from "react";

import { site } from "@/content/site";

const isDev = process.env.NODE_ENV === "development";

/** The tagline, with its second sentence on a new line. */
function Tagline() {
  return (
    <>
      {site.tagline}
      <br />
      <span className="font-serif text-[1.15em] italic leading-snug text-ink-muted">
        {site.taglineAside}
      </span>
    </>
  );
}

export function Hero() {
  // In dev, clicking the portrait flips its shape so the two can be compared.
  const [shape, setShape] = useState(site.avatarShape);

  return (
    <section className="relative overflow-hidden px-4 pt-14 pb-16 sm:px-8 sm:pt-28 sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 size-[28rem] rounded-full bg-accent-soft opacity-70 blur-3xl sm:right-[8%]"
      />
      <div className="relative mx-auto max-w-5xl">
        <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
          <div className="min-w-0">
            {site.availability.open && (
              <p data-rise style={{ animationDelay: "0s" }}
                className="label flex items-center gap-2 text-accent"
              >
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                {site.availability.label}
              </p>
            )}

            <h1 data-rise style={{ animationDelay: "0.08s" }} className="display mt-7 text-display">
              {site.name}
            </h1>
          </div>

          <div data-rise style={{ animationDelay: "0.05s" }} className="shrink-0">
            <div
              onClick={
                isDev
                  ? () => setShape((s) => (s === "circle" ? "square" : "circle"))
                  : undefined
              }
              title={isDev ? `Click to toggle shape (${shape})` : undefined}
              className={`relative size-32 overflow-hidden border border-rule bg-paper-raised ring-4 ring-accent-soft ring-offset-4 ring-offset-paper transition-[border-radius] duration-300 sm:size-44 ${
                shape === "circle" ? "rounded-full" : "rounded-2xl"
              } ${isDev ? "cursor-pointer" : ""}`}
            >
              <Image
                src="/avatar-web.jpg"
                alt={`Portrait of ${site.name}`}
                fill
                sizes="(min-width: 640px) 11rem, 8rem"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <p data-rise style={{ animationDelay: "0.16s" }}
          className="mt-8 max-w-2xl border-l-2 border-accent/40 pl-5 text-lg leading-relaxed text-ink-soft sm:text-xl"
        >
          <Tagline />
        </p>

      </div>
    </section>
  );
}
