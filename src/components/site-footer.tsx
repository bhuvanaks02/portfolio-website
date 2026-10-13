import { RetroDoor } from "@/components/retro-door";
import { site, socials } from "@/content/site";

export function SiteFooter() {
  // The email already sits under the heading, so the list skips it.
  const links = socials.filter((s) => s.href && !s.href.startsWith("mailto:"));

  return (
    <footer
      id="contact"
      className="border-t border-rule px-4 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 sm:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="label">Contact</p>
            <h2 className="display mt-4 text-section max-w-md">
              Got something to build, run or figure out? Let&apos;s talk.
            </h2>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-6 inline-block text-lg text-accent"
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

        <div className="mt-16 flex flex-col gap-2 border-t border-rule pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.location}.
          </p>
          <p className="font-mono">
            Built with Next.js &amp; Tailwind.
            <RetroDoor />
          </p>
        </div>
      </div>
    </footer>
  );
}
