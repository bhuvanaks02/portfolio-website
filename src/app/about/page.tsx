import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { achievements, education, site, work } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: site.bio[0],
};

export default function AboutPage() {
  return (
    <>
      <header className="px-4 pt-14 pb-12 sm:px-8 sm:pt-20 sm:pb-16">
        <div className="mx-auto flex max-w-3xl flex-col-reverse gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="min-w-0">
            <p className="label">About</p>
            <h1 className="display mt-5 text-title max-w-2xl">
              Engineer, Bengaluru. Fond of small models and stubborn data.
            </h1>
          </div>

          <Reveal className="shrink-0">
            <div className="relative size-32 overflow-hidden rounded-2xl border border-rule bg-paper-raised sm:size-40">
              <Image
                src="/avatar.jpg"
                alt={`Portrait of ${site.name}`}
                fill
                sizes="(min-width: 640px) 10rem, 8rem"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </header>

      <section className="px-4 sm:px-8">
        <div className="mx-auto max-w-3xl space-y-6 border-t border-rule pt-10">
          {site.bio.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p
                className={
                  i === 0
                    ? "font-serif text-xl leading-snug text-ink sm:text-2xl"
                    : "leading-relaxed text-ink-soft"
                }
              >
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="label">Timeline</p>
          </Reveal>
          <ol className="mt-6 border-t border-rule">
            {work.map((entry, i) => (
              <Reveal as="li" key={entry.slug} delay={i * 0.05}>
                <Link
                  href={`/work/${entry.slug}`}
                  className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-5 transition-colors hover:text-ink"
                >
                  <span className="text-ink-soft group-hover:text-ink">
                    <span className="font-medium">{entry.company}</span>
                    <span className="text-ink-muted"> — {entry.title}</span>
                  </span>
                  <span className="label tabular-nums">{entry.period}</span>
                </Link>
              </Reveal>
            ))}
            <Reveal as="li">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-5">
                <span className="text-ink-soft">
                  <span className="font-medium">{education.school}</span>
                  <span className="text-ink-muted"> — {education.degree}</span>
                </span>
                <span className="label tabular-nums">{education.period}</span>
              </div>
            </Reveal>
          </ol>
        </div>
      </section>

      <section className="border-t border-rule px-4 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="label">Off the clock</p>
            <p className="mt-6 max-w-2xl leading-relaxed text-ink-soft">
              I have judged {achievements.length > 0 ? "three" : "several"}{" "}
              college hackathons, which is a strange and excellent way to spend
              a weekend — you see forty versions of the same idea and learn what
              separates the two that work. I have also won a couple, including
              the office-wide hackathon at Knowledge Lens.
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
              Otherwise: reading about inference on constrained hardware,
              arguing with graph schemas, and drinking more chai than is
              defensible.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-rule px-4 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Link
              href="/#work"
              className="group inline-flex items-baseline gap-2"
            >
              <span className="display text-3xl">See the work</span>
              <span
                aria-hidden="true"
                className="text-xl text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
