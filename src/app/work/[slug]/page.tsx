import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/reveal";
import { work } from "@/content/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return work.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = work.find((w) => w.slug === slug);
  if (!entry) return {};

  return {
    title: `${entry.company} — ${entry.title}`,
    description: entry.summary,
    openGraph: {
      title: `${entry.company} — ${entry.headline}`,
      description: entry.summary,
      type: "article",
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = work.find((w) => w.slug === slug);
  if (!entry) notFound();

  const position = work.findIndex((w) => w.slug === slug);
  const next = work[(position + 1) % work.length];

  return (
    <article>
      {/* ------------------------------ masthead ---------------------------- */}
      <header className="px-4 pt-14 pb-12 sm:px-8 sm:pt-20 sm:pb-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/work#work"
            className="label inline-flex items-center gap-2 transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span> All work
          </Link>

          <p className="label mt-10">
            {entry.index} · {entry.company} · {entry.location}
          </p>

          <h1 className="display mt-5 text-title">{entry.headline}</h1>

          <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-rule pt-5">
            <p className="text-ink-soft">{entry.title}</p>
            <span className="label">{entry.period}</span>
          </div>
        </div>
      </header>

      {/* ------------------------------- context ---------------------------- */}
      <section className="px-4 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="border-l-2 border-accent pl-5 font-serif text-xl leading-snug text-ink-soft sm:text-2xl">
              {entry.context}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ highlights -------------------------- */}
      <section className="px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-4">
              {entry.highlights.map((h) => (
                <div key={h.label} className="bg-paper px-5 py-6">
                  <dt className="label">{h.label}</dt>
                  <dd className="display mt-2 text-2xl tabular-nums">
                    {h.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------- body ------------------------------ */}
      <div className="px-4 sm:px-8">
        <div className="mx-auto max-w-3xl border-t border-rule">
          {entry.sections.map((section, i) => (
            <Reveal
              as="section"
              key={section.heading}
              delay={i * 0.04}
              className="border-b border-rule py-12 sm:grid sm:grid-cols-[13rem_1fr] sm:gap-10"
            >
              <h2 className="display text-2xl sm:sticky sm:top-24 sm:self-start">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 sm:mt-0">
                {section.body.map((paragraph, j) => (
                  <p key={j} className="leading-relaxed text-ink-soft">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* -------------------------------- stack ----------------------------- */}
      <section className="px-4 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="label">Worked with</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {entry.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-rule px-3 py-1 text-sm text-ink-soft"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------- next ------------------------------ */}
      {work.length > 1 && (
        <section className="border-t border-rule px-4 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href={`/work/${next.slug}`}
              className="group flex items-baseline justify-between gap-6 py-12"
            >
              <span>
                <span className="label">Next</span>
                <span className="display mt-2 block text-3xl">
                  {next.company}
                </span>
                <span className="mt-1.5 block font-serif text-lg italic text-ink-muted">
                  {next.headline}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="self-center text-xl text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
              >
                →
              </span>
            </Link>
          </div>
        </section>
      )}
    </article>
  );
}
