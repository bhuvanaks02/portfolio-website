import Link from "next/link";

import { Hero } from "@/components/hero";
import { LazyGraph } from "@/components/lazy-graph";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import {
  projects,
  sideQuests,
  site,
  work,
} from "@/content/site";

const glance = [{ label: "Now", value: work[0].company }];

/** The three strands, one short card each; the detail lives on their pages. */
const gist = [
  {
    href: "/work",
    label: "Technical",
    title: "Engineering",
    body: "Case studies, projects and the stack behind them.",
    note: `${work.length} roles · ${projects.length} projects`,
    cta: "Engineering",
  },
  {
    href: "/marketing",
    label: "Marketing",
    title: "Campaigns & community",
    body: "Marketing, PR and on-ground work, in full.",
    note: `${sideQuests.roles.length} roles`,
    cta: "Marketing",
  },
  {
    href: "/side-quests",
    label: "Side quests",
    title: "Everything else",
    body: "Communities, crypto, badminton, running and languages.",
    note: `${sideQuests.communities.length} communities · running`,
    cta: "Side quests",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="px-4 pb-16 sm:px-8 sm:pb-24">
        <div className="mx-auto max-w-5xl">
          <LazyGraph />
        </div>
      </div>

      <Section
        id="about"
        label="01 · About"
        title="Curious, quick to learn, here to build something real."
      >
        <div className="grid gap-12 sm:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
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

          <Reveal delay={0.1}>
            <dl className="border-t border-rule">
              {glance.map((item) => (
                <div key={item.label} className="border-b border-rule py-4">
                  <dt className="label">{item.label}</dt>
                  <dd className="mt-1.5 text-ink-soft">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section id="gist" label="02 · The gist" title="What I do, in three parts.">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule md:grid-cols-3">
          {gist.map((strand, i) => (
            <Reveal key={strand.label} delay={i * 0.06} className="bg-paper">
              <Link
                href={strand.href}
                className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-paper-raised sm:p-7"
              >
                <p className="label">{strand.label}</p>
                <h3 className="display mt-4 text-3xl">{strand.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  {strand.body}
                </p>
                <p className="label mt-6">{strand.note}</p>
                <p className="mt-3 text-sm text-ink-soft transition-colors duration-300 group-hover:text-accent">
                  {strand.cta}{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

    </>
  );
}

