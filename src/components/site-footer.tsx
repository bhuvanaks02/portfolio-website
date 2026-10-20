import { RetroDoor } from "@/components/retro-door";
import { site, socials } from "@/content/site";

export function SiteFooter() {
  // The email already sits under the heading, so the list skips it.
  const links = socials.filter((s) => s.href && !s.href.startsWith("mailto:"));

  return (
    <footer
      id="contact"
      className="border-t border-rule px-4 py-10 sm:px-8 sm:py-16"
    >
      <div className="mx-auto max-w-5xl text-center sm:text-left">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="label">Contact</p>
            <h2 className="display mx-auto mt-4 max-w-md text-section sm:mx-0">
              Got something to build, run or figure out? Let&apos;s talk.
            </h2>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-5 inline-block text-sm text-accent sm:text-base"
            >
              {site.email}
            </a>
          </div>

          <div>
            <p className="label">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {links.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-4 text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    <span className="link-underline">{s.label}</span>
                    <span className="font-mono text-xs text-ink-muted">
                      {s.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 text-center sm:text-right text-xs text-ink-muted">
          <RetroDoor />
        </p>
      </div>
    </footer>
  );
}
