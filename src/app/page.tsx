import Link from "next/link";

import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { MeGraph } from "@/components/me-graph";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import {
  projects,
  sideQuests,
  site,
  socials,
  work,
} from "@/content/site";

const glance = [
  { label: "Now", value: work[0].company },
  { label: "Speaks", value: sideQuests.languages.join(" · ") },
];

type FindCard = {
  label: string;
  title: string;
  body: string;
  href: string | null;
  cta: string;
};

const githubLink = socials.find((s) => s.label === "GitHub")!;

/** Where to find the work and the person, one card each. */
const findCards: FindCard[] = [
  {
    label: "GitHub",
    title: githubLink.handle,
    body: `${projects.length} public projects, from a graph visualiser to a hackathon finder and a voice-first money app.`,
    href: githubLink.href,
    cta: "See the code",
  },
  ...socials
    .filter((s) => s.label !== "GitHub" && s.href)
    .map((s) => ({
      label: s.label,
      title: s.handle,
      body: s.note ?? "",
      href: s.href,
      cta: s.label === "Email" ? "Say hello" : `Open ${s.label}`,
    })),
  {
    label: "Resume",
    title: "One-page PDF",
    body: "Roles, projects, education and the paper on a single page.",
    href: site.resume,
    cta: "Download",
  },
];

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
    body: "Community, languages and the things that do not compile.",
    note: `${sideQuests.toolkit.length} tools`,
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

        <div className="mt-16">
          <Reveal>
            <p className="label">Find me elsewhere</p>
          </Reveal>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {findCards.map((card, i) => {
              const external = card.href?.startsWith("http");
              const inner = (
                <>
                  <p className="label">{card.label}</p>
                  <h3 className="display mt-3 text-xl leading-snug sm:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                    {card.body}
                  </p>
                  {card.href && (
                    <p className="mt-5 text-sm text-ink-soft transition-colors duration-300 group-hover:text-accent">
                      {card.cta}{" "}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                      >
                        {external ? "↗" : "→"}
                      </span>
                    </p>
                  )}
                </>
              );
              const box =
                "group flex h-full flex-col rounded-2xl border border-rule p-6";
              return (
                <Reveal key={card.label} delay={i * 0.05}>
                  {card.href ? (
                    <a
                      href={card.href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={`${box} transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-rule-strong hover:bg-paper-raised`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={box}>{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      <Section
        id="path"
        label="02 · The path"
        note="2020 – now"
        title="From back then to now, one step at a time."
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

