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
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the phone menu after navigating, and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-500 ${
        lifted
          ? "border-b border-rule/30 bg-paper backdrop-blur-md sm:bg-paper/85"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-8">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className="-ml-3 rounded-full px-3 py-1.5 text-sm text-ink-soft transition-colors duration-300 hover:bg-accent-soft hover:text-ink sm:-ml-4 sm:px-4"
        >
          Home
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="hidden whitespace-nowrap rounded-full px-4 py-1.5 text-sm text-ink-soft transition-colors duration-300 hover:bg-accent-soft hover:text-ink sm:inline-block"
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
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-rule/50 px-2.5 text-sm text-ink-soft transition-colors duration-300 hover:border-rule-strong hover:text-ink sm:px-3.5"
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
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded-full border border-rule/50 text-ink-soft transition-colors duration-300 hover:border-rule-strong hover:text-ink sm:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </nav>
      </div>

      {/* Phone menu: the section links, one per row. */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-rule/40 bg-paper px-4 pb-4 sm:hidden"
        >
          <ul className="mx-auto max-w-5xl">
            {nav.map((item) => (
              <li key={item.label} className="border-t border-rule/30 first:border-t-0">
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className="block py-3.5 text-base text-ink-soft aria-[current=page]:text-ink"
                >
                  {item.label}
                  {item.external && (
                    <span aria-hidden="true" className="ml-1 text-ink-muted">
                      ↗
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* How far down the page you are, drawn along the header's edge. */}
      <motion.span
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent/30"
      />
    </header>
  );
}
