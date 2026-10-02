import type { Metadata } from "next";

import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { site, sideQuests } from "@/content/site";

export const metadata: Metadata = {
  title: "Marketing",
  description:
    "Marketing campaigns, partnerships and on-ground operations for a summit and a hackathon.",
};

export default function MarketingPage() {
  return (
    <>
      <header className="px-4 pt-14 pb-12 sm:px-8 sm:pt-20 sm:pb-16">
        <div className="mx-auto max-w-5xl">
          <p className="label">Marketing</p>
          <h1 className="display mt-5 max-w-3xl text-title">
            Campaigns, communities and hackathon floors.
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-soft">
            The growth side of my work: marketing campaigns, partner
            management and on-ground operations.
          </p>
          <div className="mt-8">
            <a
              href={`mailto:${site.email}`}
              className="link-underline text-sm text-ink-soft"
            >
              {site.email}
            </a>
          </div>
        </div>
      </header>

      <Section
        id="campaigns"
        label="Experience"
        note={`${sideQuests.roles.length} roles so far`}
        title="Where I have run growth."
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

      <Section id="toolkit" label="Toolkit">
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
