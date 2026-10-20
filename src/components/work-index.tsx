import { CertificateThumb } from "@/components/certificate-thumb";
import { Reveal } from "@/components/reveal";
import { internships, work } from "@/content/site";

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
            <span className="label whitespace-nowrap rounded-full border border-rule px-2.5 py-0.5 text-[0.6875rem]! tabular-nums sm:px-3 sm:py-1 sm:text-[0.6875rem]!">
              {entry.period}
            </span>
          </div>
          <p className="mt-2 text-sm text-ink-soft">
            <span className="text-accent">{entry.title}</span>
            <span className="text-ink-muted"> · {entry.location}</span>
          </p>

          <div className="mt-6">
            {entry.sections.map((section) => (
              <div
                key={section.heading}
                id={sectionId(entry.slug, section.heading)}
                className="scroll-mt-20 border-b border-rule py-6 last:border-b-0 sm:grid sm:grid-cols-[13rem_1fr] sm:gap-10"
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
      {internships.map((role) => (
        <Reveal
          as="li"
          key={role.company}
          className="defer-paint scroll-mt-20 border-b border-rule py-12 last:border-b-0 sm:py-14"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <h3 className="display text-3xl leading-tight sm:text-4xl">
              {role.company}
            </h3>
            <span className="label whitespace-nowrap rounded-full border border-rule px-2.5 py-0.5 text-[0.6875rem]! tabular-nums sm:px-3 sm:py-1">
              {role.period}
            </span>
          </div>
          <p className="mt-2 text-sm text-ink-soft">
            <span className="text-accent">{role.title}</span>
            <span className="text-ink-muted"> · {role.location}</span>
          </p>
          <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 leading-relaxed text-ink-soft">
            {role.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </Reveal>
      ))}
    </ul>
  );
}
