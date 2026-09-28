import Link from "next/link";

import { Hero } from "@/components/hero";
import { ProjectGrid } from "@/components/project-grid";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { WorkIndex } from "@/components/work-index";
import {
  achievements,
  education,
  publications,
  site,
  skills,
  work,
} from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section
        id="work"
        label="Selected work"
        note={`${work.length} roles`}
        title="Three years of shipping AI, graphs and the plumbing in between."
      >
        <WorkIndex />
      </Section>

      <Section id="projects" label="Projects" note="Side work">
        <ProjectGrid />
      </Section>

      <Section
        id="stack"
        label="Stack"
        title="What I reach for."
      >
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-2">
          {skills.map((group, i) => (
            <Reveal
              key={group.group}
              delay={i * 0.05}
              className={`bg-paper p-6 sm:p-7 ${
                i === skills.length - 1 && skills.length % 2 === 1
                  ? "sm:col-span-2"
                  : ""
              }`}
            >
              <dt className="label">{group.group}</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-rule px-3 py-1 text-sm text-ink-soft"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      <Section id="beyond" label="Beyond the job">
        <div className="grid gap-12 sm:grid-cols-2">
          <Reveal>
            <h3 className="display text-2xl">Education</h3>
            <p className="mt-4 text-ink-soft">{education.degree}</p>
            <p className="mt-1 text-sm text-ink-muted">
              {education.school}, {education.location}
            </p>
            <p className="label mt-3">
              {education.period} · {education.detail}
            </p>

            <h3 className="display mt-12 text-2xl">Published</h3>
            {publications.map((pub) => (
              <div key={pub.title} className="mt-4">
                <p className="text-ink-soft">
                  {pub.href ? (
                    <a
                      href={pub.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-accent"
                    >
                      {pub.title} ↗
                    </a>
                  ) : (
                    pub.title
                  )}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {pub.venue}
                </p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="display text-2xl">Recognition</h3>
            <ul className="mt-4 border-t border-rule">
              {achievements.map((item) => (
                <li key={item.title} className="border-b border-rule py-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-ink-soft">{item.title}</p>
                    <span className="label shrink-0 tabular-nums">
                      {item.year}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section id="more" label="Read on">
        <Reveal>
          <p className="max-w-xl font-serif text-xl italic leading-snug text-ink-soft">
            There is a longer version of all this —
            <Link href="/about" className="link-underline ml-1.5 text-accent">
              the about page
            </Link>
            , or the{" "}
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-accent"
            >
              one-page résumé ↗
            </a>
            .
          </p>
        </Reveal>
      </Section>
    </>
  );
}
