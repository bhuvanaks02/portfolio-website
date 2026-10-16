"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [lifted, setLifted] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-500 ${
        lifted
          ? "border-b border-rule/30 bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-3 sm:px-8">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className="-ml-1.5 whitespace-nowrap rounded-full px-2 py-1.5 text-[13px] text-ink-soft transition-colors duration-300 hover:bg-accent-soft hover:text-ink sm:-ml-4 sm:px-4 sm:text-sm"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-[18px] sm:hidden"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 11 12 4l8 7M6 10v9h12v-9" />
          </svg>
          <span className="sr-only sm:not-sr-only">Home</span>
        </Link>

        <nav className="flex items-center gap-0 sm:gap-3">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="whitespace-nowrap rounded-full px-1 py-1.5 text-[13px] text-ink-soft transition-colors duration-300 hover:bg-accent-soft hover:text-ink sm:px-4 sm:text-sm"
            >
              {item.label}
              {item.external && (
                <span aria-hidden="true" className="ml-1 text-ink-muted">
                  ↗
                </span>
              )}
            </Link>
          ))}
          <span className="mx-2 hidden h-4 w-px bg-rule/50 sm:block" />
          <a
            href={site.resume}
            download
            aria-label="Download résumé (PDF)"
            title="Download résumé (PDF)"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-rule/50 px-2 text-sm text-ink-soft transition-colors duration-300 hover:border-rule-strong hover:text-ink sm:px-3.5"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19h14" />
            </svg>
            <span className="hidden sm:inline">Résumé</span>
          </a>
          <span className="sm:ml-2">
            <ThemeToggle />
          </span>
        </nav>
      </div>
      {/* How far down the page you are, drawn along the header's edge. */}
      <motion.span
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent/30"
      />
    </header>
  );
}
