import Link from "next/link";

import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { MeGraph } from "@/components/me-graph";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import {
  achievements,
  education,
  projects,
  sideQuests,
  site,
  work,
} from "@/content/site";

const glance = [
  { label: "Now", value: work[0].company },
  { label: "Based in", value: site.location },
  { label: "Studied", value: education.degree },
  { label: "Speaks", value: `${sideQuests.languages.length} languages` },
];

/** Everything in three strands; each one opens into its full page. */
const gist = [
  {
    href: "/work",
    label: "Technical",
    title: "Engineering",
    body: "Small language models, graph databases and the APIs that connect them.",
    items: work.map((role) => ({
      head: role.headline,
      sub: `${role.company} · ${role.period}`,
    })),
    note: `${work.length} roles · ${projects.length} projects · ${achievements.length} wins`,
    cta: "Work",
  },
  {
    href: "/side-quests#quests",
    label: "Growth",
    title: "Campaigns & community",
    body: "Marketing and on-ground operations for a summit and a hackathon.",
    items: sideQuests.roles.map((role) => ({
      head: role.points[0],
      sub: `${role.org} · ${role.period}`,
    })),
    note: `${sideQuests.roles.length} roles so far`,
    cta: "Growth work",
  },
  {
    href: "/side-quests",
    label: "Side quests",
    title: "Everything else",
    body: "Judging hackathons, moderating communities and learning languages.",
    items: [
      {
        head: achievements[0].title,
        sub: achievements[0].year,
      },
      {
        head: `Speaks ${sideQuests.languages.length} languages`,
        sub: sideQuests.languages.join(" · "),
      },
      {
        head: "Community moderation and design",
        sub: "Discord · Telegram · Figma · Canva",
      },
    ],
    note: `${sideQuests.languages.length} languages · ${sideQuests.toolkit.length} tools`,
    cta: "Side quests",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="px-4 pb-16 sm:px-8 sm:pb-24">
        <div className="mx-auto max-w-5xl">
          <MeGraph />
        </div>
      </div>

      <Section id="about" label="01 · About" title="Software engineer, mostly on models and graphs.">
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

      <Section
        id="path"
        label="02 · The path"
        note="2020 – now"
        title="From a first hackathon to fine-tuned models."
      >
        <Journey />
      </Section>

      <Section id="gist" label="03 · The gist" title="What I do, in three parts.">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule md:grid-cols-3">
          {gist.map((strand, i) => (
            <Reveal key={strand.label} delay={i * 0.06} className="bg-paper">
              <Link
                href={strand.href}
                className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-paper-raised sm:p-7"
              >
                <p className="label">{strand.label}</p>
                <h3 className="display mt-4 text-3xl">{strand.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {strand.body}
                </p>
                <ul className="mt-6 flex-1 border-t border-rule">
                  {strand.items.map((item) => (
                    <li key={item.head} className="border-b border-rule py-3">
                      <p className="text-sm leading-snug text-ink-soft">
                        {item.head}
                      </p>
                      <p className="mt-1 text-xs text-ink-muted">{item.sub}</p>
                    </li>
                  ))}
                </ul>
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

      <Section id="off-the-clock" label="04 · Off the clock">
        <Reveal>
          <p className="max-w-2xl leading-relaxed text-ink-soft">
            I have judged three college hackathons, one at Global Academy of
            Technology and two at Dayananda Sagar University, and won two,
            including the office-wide hackathon at Knowledge Lens.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Outside work I read about running models on limited hardware and
            study languages; I speak {sideQuests.languages.length} so far.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
