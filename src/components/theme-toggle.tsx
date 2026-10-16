"use client";

import { useEffect } from "react";

type Theme = "light" | "dark";

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** The theme on screen right now, read from the page itself. */
function currentTheme(): Theme {
  const set = document.documentElement.getAttribute("data-theme");
  return set === "light" || set === "dark" ? set : systemTheme();
}

/** Swap themes with no fades, so every colour changes in the same frame. */
function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  root.setAttribute("data-theme", theme);
  const done = () => root.classList.remove("theme-switching");
  requestAnimationFrame(() => requestAnimationFrame(done));
  // Backstop, in case the tab is hidden and no frames are painted.
  setTimeout(done, 150);
}

export function ThemeToggle() {
  // Keep other open tabs in step with the choice made in this one.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme" && (e.newValue === "light" || e.newValue === "dark")) {
        apply(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    apply(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private browsing: the toggle still works for this session */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      title="Switch between light and dark theme"
      className="grid size-9 place-items-center rounded-full border border-rule/50 text-ink-muted transition-colors duration-300 hover:border-rule-strong hover:text-ink"
    >
      {/* Both icons ship in the HTML; CSS shows the right one, so there is no
          blank button while the page loads. */}
      <svg
        viewBox="0 0 24 24"
        className="theme-sun size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="theme-moon size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
      </svg>
    </button>
  );
}
