import type { Metadata } from "next";

import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { sideQuests } from "@/content/site";

export const metadata: Metadata = {
  title: "Side quests",
  description: sideQuests.intro,
};

export default function SideQuestsPage() {
  return (
    <>
      <header className="px-4 pt-14 pb-12 sm:px-8 sm:pt-20 sm:pb-16">
        <div className="mx-auto max-w-5xl">
          <p className="label">Side quests</p>
          <h1 className="display mt-5 max-w-3xl text-title">
            Everything that is not tech.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-xl italic leading-snug text-ink-soft">
            {sideQuests.intro}
          </p>
        </div>
      </header>

      <Section
        id="quests"
        label="Quest log"
        note={`${sideQuests.roles.length} so far`}
        title="Campaigns, crowds and hackathon floors."
      >
        <ul className="border-t border-rule">
          {sideQuests.roles.map((role, i) => (
            <Reveal
              as="li"
              key={role.org}
              delay={i * 0.06}
              className="border-b border-rule py-7 sm:py-9"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="display text-2xl sm:text-3xl">{role.org}</h3>
                <span className="label">{role.period}</span>
              </div>
              <p className="mt-1.5 text-sm text-ink-soft">
                {role.title} · {role.location}
              </p>
              <ul className="mt-4 max-w-2xl list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="languages" label="Languages" title="Five, and counting.">
        <Reveal>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {sideQuests.languages.map((language) => (
              <li key={language} className="display text-3xl sm:text-4xl">
                {language}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section id="toolkit" label="Non-tech toolkit">
        <Reveal>
          <ul className="flex flex-wrap gap-2">
            {sideQuests.toolkit.map((item) => (
              <li
                key={item}
                className="rounded-full border border-rule px-3 py-1 text-sm text-ink-soft"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section id="more" label="To be continued">
        <Reveal>
          <p className="max-w-xl font-serif text-xl italic leading-snug text-ink-soft">
            More side quests are on their way to this page.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
