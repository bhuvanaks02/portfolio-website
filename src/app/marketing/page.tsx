import type { Metadata } from "next";
import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { site, sideQuests } from "@/content/site";

export const metadata: Metadata = {
  title: "Marketing",
  description:
    "Marketing, PR, social media and on-ground operations for Dcodeblock, Under25, Warpspeed and ETHMumbai.",
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
            Something I explored out of curiosity, to learn something new:
            marketing and PR for Dcodeblock, campaigns, partner management, on-ground operations and social
            media. I was part of the ETHMumbai Mitra Mandal, ran its socials
            and worked on operations for the March 2026 conference and
            hackathon, hosted Dcodeblock's livestreams and meetups, and went
            on camera for PR, making reels and cameos with influencers for
            Instagram and X.
          </p>
          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-soft">
            <a
              href="https://www.ethmumbai.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              ethmumbai.in
            </a>
            <a
              href="https://x.com/ethmumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              @ethmumbai
            </a>
            <a
              href="https://x.com/KsBhuvana"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              @KsBhuvana
            </a>
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
              id={role.id}
              delay={i * 0.06}
              className="scroll-mt-20 border-b border-rule py-7 sm:py-9"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="display text-2xl sm:text-3xl">
                  {"href" in role && role.href ? (
                    <a
                      href={role.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline"
                    >
                      {role.org}
                    </a>
                  ) : (
                    role.org
                  )}
                </h3>
                <span className="label">{role.period}</span>
              </div>
              <p className="mt-1.5 text-sm text-ink-soft">
                {[role.title, role.location].filter(Boolean).join(" · ")}
              </p>
              <ul className="mt-4 max-w-2xl list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {"image" in role && role.image && (
                <figure
                  className={`mt-6 ${
                    role.image.width > role.image.height
                      ? "max-w-3xl"
                      : "max-w-sm"
                  }`}
                >
                  {"href" in role.image && role.image.href ? (
                    <a
                      href={role.image.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={role.image.caption}
                    >
                      <Image
                        src={role.image.src}
                        alt={role.image.alt}
                        width={role.image.width}
                        height={role.image.height}
                        sizes="24rem"
                        className="h-auto w-full rounded-2xl border border-rule"
                      />
                    </a>
                  ) : (
                    <Image
                      src={role.image.src}
                      alt={role.image.alt}
                      width={role.image.width}
                      height={role.image.height}
                      sizes="(min-width: 768px) 48rem, 100vw"
                      className="h-auto w-full rounded-2xl border border-rule"
                    />
                  )}
                  <figcaption className="mt-2 text-sm text-ink-muted">
                    {role.image.caption}
                  </figcaption>
                </figure>
              )}
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
