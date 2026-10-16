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

      <Section id="communities" label="Communities">
        <ul className="border-t border-rule">
          {sideQuests.communities.map((c, i) => (
            <Reveal
              as="li"
              key={c.id}
              id={c.id}
              delay={i * 0.06}
              className="scroll-mt-20 border-b border-rule py-7 sm:py-9"
            >
              <h3 className="display text-2xl sm:text-3xl">
                {c.href.startsWith("http") ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    {c.name}
                  </a>
                ) : (
                  c.name
                )}
              </h3>
              <p className="mt-1.5 text-sm text-ink-soft">{c.role}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
                {c.detail}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="running" label="Running" title="10Ks and 5Ks.">
        <Reveal>
          <p className="max-w-2xl leading-relaxed text-ink-soft">
            {sideQuests.running.intro}
          </p>
          <ul className="mt-6 border-t border-rule">
            {sideQuests.running.races.map((race) => (
              <li
                key={race.name}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-4"
              >
                <p className="text-ink-soft">
                  {race.name}
                  <span className="text-ink-muted"> · {race.distance}</span>
                </p>
                <span className="label tabular-nums">{race.year}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section id="reels" label="Reels">
        <Reveal>
          <p className="max-w-2xl leading-relaxed text-ink-soft">
            A few Instagram reels made in collaboration with pages like{" "}
            <a
              href="https://www.instagram.com/ballerdailyinc/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              @ballerdailyinc
            </a>
            ,{" "}
            <a
              href="https://www.instagram.com/startupdailyinc/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              @startupdailyinc
            </a>
            {" "}and others, just for fun.
          </p>
          {/* Instagram's own embed page, loaded only as each one nears the screen. */}
          <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0">
            {sideQuests.reels.map((href, i) => (
              <li key={href} className="shrink-0 snap-start">
                {/* Instagram's player is 328×580; scaled to ~62% so the row stays quiet. */}
                <div className="h-[360px] w-[203px] overflow-hidden rounded-xl border border-rule bg-paper">
                  <iframe
                    src={`${href}embed`}
                    title={`Instagram reel ${i + 1} of ${sideQuests.reels.length}`}
                    loading="lazy"
                    allowFullScreen
                    scrolling="no"
                    className="h-[580px] w-[328px] origin-top-left scale-[0.62] border-0"
                  />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
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
    </>
  );
}
