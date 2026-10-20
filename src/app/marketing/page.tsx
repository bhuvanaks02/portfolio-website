import type { Metadata } from "next";
import Image from "next/image";

import { CertificateThumb } from "@/components/certificate-thumb";
import { PageNav } from "@/components/page-nav";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { site, sideQuests } from "@/content/site";

export const metadata: Metadata = {
  title: "Marketing",
  description:
    "Marketing, PR, social media and on-ground operations for Pukecast, Dcodeblock, Under25, Warpspeed, HackALeague and ETHMumbai.",
};

type Role = (typeof sideQuests.roles)[number];

/** Portrait documents get a narrower column so they don't tower over the text. */
function isPortrait(role: Role) {
  return "image" in role && !!role.image && role.image.height > role.image.width;
}

/** Wide photos run under the text; certificates and tall images sit beside it. */
function imageBeside(role: Role) {
  return (
    "image" in role &&
    !!role.image &&
    role.image.width / role.image.height <= 1.6
  );
}

export default function MarketingPage() {
  return (
    <>
      <header className="px-4 pt-12 pb-14 sm:px-8 sm:pt-20 sm:pb-16">
        <div className="mx-auto max-w-5xl">
          <p className="label text-accent">Marketing</p>
          <h1 className="display mt-5 max-w-3xl text-title">
            Campaigns, communities and hackathon floors.
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-soft">
            Marketing, PR and on-ground operations, explored out of curiosity:
            a Web3 agency, a conference and hackathon, livestreams and
            meetups.
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
              href="https://x.com/pukecast"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              @pukecast
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
              className="scroll-mt-20 border-b border-rule py-9 sm:py-9"
            >
              <div
                className={
                  imageBeside(role)
                    ? isPortrait(role)
                      ? "grid gap-6 md:grid-cols-[minmax(0,1fr)_9rem] md:gap-10"
                      : "grid gap-6 md:grid-cols-[minmax(0,1fr)_16rem] md:gap-10"
                    : undefined
                }
              >
              <div>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
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
                {role.period && (
                  <span className="label whitespace-nowrap rounded-full border border-rule px-3 py-1 tabular-nums">
                    {role.period}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm">
                <span className="text-accent">{role.title}</span>
                {role.location && (
                  <span className="text-ink-muted"> · {role.location}</span>
                )}
              </p>
              <ul className="mt-4 max-w-2xl list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {"gallery" in role && role.gallery && (
                <div className="mt-6 grid max-w-3xl gap-4 sm:grid-cols-2">
                  {role.gallery.map((shot) => (
                    <CertificateThumb
                      key={shot.src}
                      {...shot}
                      className="max-w-none"
                    />
                  ))}
                </div>
              )}
              {"image" in role && role.image && "href" in role.image && (
                <p className="mt-4 text-sm">
                  <a
                    href={role.image.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-ink-soft"
                  >
                    Certificate (PDF)
                  </a>
                </p>
              )}
              {"links" in role && role.links && (
                <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-soft">
                  {role.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </p>
              )}
              </div>
              {"image" in role && role.image && imageBeside(role) && (
                <CertificateThumb
                  src={role.image.src}
                  alt={role.image.alt}
                  width={role.image.width}
                  height={role.image.height}
                  caption={role.image.caption}
                  className={`${
                    isPortrait(role) ? "max-w-[9rem]" : "max-w-[16rem]"
                  } justify-self-end`}
                />
              )}
              </div>
              {"image" in role && role.image && !imageBeside(role) && (
                <figure className="mt-6 max-w-3xl">
                  <Image
                    src={role.image.src}
                    alt={role.image.alt}
                    width={role.image.width}
                    height={role.image.height}
                    sizes="(min-width: 768px) 48rem, 100vw"
                    className="h-auto w-full rounded-2xl border border-rule"
                  />
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
                className="rounded-full bg-accent-soft px-3 py-1 text-sm text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>
      <PageNav
        back={{ href: "/work", label: "Engineering" }}
        next={{ href: "/side-quests", label: "Side quests" }}
      />
    </>
  );
}
