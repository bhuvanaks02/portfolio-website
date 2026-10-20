import { CertificateThumb } from "@/components/certificate-thumb";
import { Reveal } from "@/components/reveal";
import { work } from "@/content/site";

/** Anchor id for a section inside a role, e.g. "infosys-small-language-models". */
export function sectionId(slug: string, heading: string) {
  return `${slug}-${heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")}`;
}

/** Every role, in full, on the Engineering page. */
export function WorkIndex() {
  return (
    <ul className="border-t border-rule">
      {work.map((entry) => (
        <Reveal
          as="li"
          key={entry.slug}
          id={entry.slug}
          className="defer-paint scroll-mt-20 border-b border-rule py-12 sm:py-14"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <h3 className="display text-3xl leading-tight sm:text-4xl">
              {entry.company}
            </h3>
            <span className="label whitespace-nowrap rounded-full border border-rule px-3 py-1 tabular-nums">
              {entry.period}
            </span>
          </div>
          <p className="mt-2 text-sm text-ink-soft">
            <span className="text-accent">{entry.title}</span>
            <span className="text-ink-muted"> · {entry.location}</span>
          </p>
          {entry.headline && (
            <p className="mt-4 max-w-2xl font-serif text-xl italic leading-snug text-ink-muted">
              {entry.headline}
            </p>
          )}

          {entry.highlights && entry.highlights.length > 0 && (
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:flex sm:flex-wrap sm:gap-x-10">
              {entry.highlights.map((h) => (
                <div key={h.label}>
                  <dd className="display text-2xl tabular-nums">{h.value}</dd>
                  <dt className="label mt-1">{h.label}</dt>
                </div>
              ))}
            </dl>
          )}

          {entry.context && (
            <p className="mt-7 max-w-2xl leading-relaxed text-ink-soft">
              {entry.context}
            </p>
          )}

          <div className="mt-8 border-t border-rule">
            {entry.sections.map((section) => (
              <div
                key={section.heading}
                id={sectionId(entry.slug, section.heading)}
                className="scroll-mt-20 border-b border-rule py-6 sm:grid sm:grid-cols-[13rem_1fr] sm:gap-10"
              >
                <h4 className="display text-xl">{section.heading}</h4>
                <div
                  className={`mt-2 sm:mt-0 ${
                    section.image
                      ? "grid gap-5 md:grid-cols-[minmax(0,1fr)_10rem] md:gap-8"
                      : ""
                  }`}
                >
                  <div className="space-y-4">
                    {section.body.map((paragraph, j) => (
                      <p key={j} className="leading-relaxed text-ink-soft">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.image && (
                    <CertificateThumb
                      {...section.image}
                      className="max-w-[10rem] md:justify-self-end"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {entry.recognition && (
            <div className="mt-6 grid gap-5 sm:grid-cols-[minmax(0,1fr)_10rem] sm:gap-8">
              <div>
                <p className="label">Recognition</p>
                <p className="display mt-2 text-xl">{entry.recognition.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {entry.recognition.detail}
                </p>
              </div>
              <CertificateThumb
                {...entry.recognition.certificate}
                className="max-w-[10rem] sm:justify-self-end"
              />
            </div>
          )}
        </Reveal>
      ))}
    </ul>
  );
}
