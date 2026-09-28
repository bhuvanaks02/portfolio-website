"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [lifted, setLifted] = useState(false);

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
          ? "border-b border-rule bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-8">
        <Link
          href="/"
          className="group flex items-baseline gap-2.5"
          aria-label={`${site.name} — home`}
        >
          <span className="display text-xl">{site.name}</span>
          {pathname !== "/" && (
            <span className="label hidden sm:inline">{site.role}</span>
          )}
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="rounded-full px-3 py-1.5 text-sm text-ink-soft transition-colors duration-300 hover:bg-accent-soft hover:text-ink"
            >
              {item.label}
              {item.external && (
                <span aria-hidden="true" className="ml-1 text-ink-muted">
                  ↗
                </span>
              )}
            </Link>
          ))}
          <span className="mx-1 hidden h-4 w-px bg-rule sm:block" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
