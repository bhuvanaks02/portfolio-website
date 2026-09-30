import type { Metadata } from "next";

import { ProjectGrid } from "@/components/project-grid";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { WorkIndex } from "@/components/work-index";
import {
  achievements,
  education,
  internships,
  projects,
  publications,
  site,
  skills,
  work,
} from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Experience, projects, stack, education, publications and achievements.",
};

export default function ResumePage() {
  return (
    <>
      <header className="px-4 pt-14 pb-12 sm:px-8 sm:pt-20 sm:pb-16">
        <div className="mx-auto max-w-5xl">
          <p className="label">Work</p>
          <h1 className="display mt-5 max-w-3xl text-title">
            AI agents, graph databases and the backend systems around them.
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-soft">
            {site.role} in {site.location}. Everything technical in one place.
            Each role opens into a full case study.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition-transform duration-300 hover:-translate-y-0.5"
            >
              One-page PDF
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>
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
        id="work"
        label="Experience"
        note={`${work.length + internships.length} roles`}
        title="Three years of shipping AI, graphs and the plumbing in between."
      >
        <WorkIndex />

        <div className="mt-12">
          <Reveal>
            <p className="label">Earlier</p>
          </Reveal>
          <ul className="mt-4 border-t border-rule">
            {internships.map((role) => (
              <Reveal
                as="li"
                key={role.company}
                className="border-b border-rule py-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <p className="text-ink-soft">
                    <span className="font-medium">{role.company}</span>
                    <span className="text-ink-muted"> · {role.title}</span>
                  </p>
                  <span className="label tabular-nums">{role.period}</span>
                </div>
                <ul className="mt-3 max-w-2xl list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-muted">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        id="projects"
        label="Projects"
        note={`${projects.length} on GitHub`}
        title="Things built on my own time."
      >
        <ProjectGrid />
      </Section>

      <Section id="stack" label="Stack" title="What I reach for.">
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

      <Section id="achievements" label="Education & achievements">
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
    </>
  );
}
