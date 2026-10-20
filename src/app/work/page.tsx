import type { Metadata } from "next";

import { CertificateThumb } from "@/components/certificate-thumb";
import { ProjectGrid } from "@/components/project-grid";
import { PageNav } from "@/components/page-nav";
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
  title: "Engineering",
  description:
    "Experience, projects, stack, education, publications, hackathons and mentoring.",
};

type Achievement = (typeof achievements)[number];

function AchievementList({ items }: { items: Achievement[] }) {
  return (
    <ul className="mt-4 border-t border-rule">
      {items.map((item) => {
        const media = item.certificate ?? item.photo;
        return (
        <li
          key={item.title}
          id={item.id}
          className="scroll-mt-20 border-b border-rule py-4"
        >
          <div
            className={
              media
                ? "grid gap-4 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-8"
                : undefined
            }
          >
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-ink-soft">{item.title}</p>
                <span className="label shrink-0 tabular-nums">{item.year}</span>
              </div>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-muted">
                {item.detail}
              </p>
            </div>
            {media && (
              <CertificateThumb
                src={media.src}
                alt={media.alt}
                width={media.width}
                height={media.height}
                className="max-w-[14rem] md:justify-self-end"
              />
            )}
          </div>
          {item.gallery && (
            <div className="mt-5 grid max-w-xl gap-4 sm:grid-cols-2">
              {item.gallery.map((shot) => (
                <CertificateThumb key={shot.src} {...shot} className="max-w-none" />
              ))}
            </div>
          )}
        </li>
        );
      })}
    </ul>
  );
}

export default function ResumePage() {
  return (
    <>
      <header className="px-4 pt-12 pb-14 sm:px-8 sm:pt-20 sm:pb-16">
        <div className="mx-auto max-w-5xl">
          <p className="label text-accent">Engineering</p>
          <h1 className="display mt-5 max-w-3xl text-title">
            AI agents, graph databases and the backend systems around them.
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-soft">
            {site.role} in {site.location}. Everything technical in one place.
          </p>
        </div>
      </header>

      <Section
        id="work"
        label="Experience"
        note={`${work.length + internships.length} roles`}
        title="Three years of shipping AI and graph systems."
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
                    className="rounded-full bg-accent-soft px-3 py-1 text-sm text-ink"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      <Section id="education" label="Education & publications">
        <div>
          <Reveal>
            <div className="grid grid-cols-[minmax(0,1fr)_6.5rem] items-center gap-6 sm:grid-cols-[minmax(0,1fr)_8rem] sm:gap-10">
              <div>
                <h3 className="display text-2xl">Education</h3>
                <p className="mt-4 text-ink-soft">{education.degree}</p>
                <p className="mt-1 text-sm text-ink-muted">
                  {education.school}, {education.location}
                </p>
                <p className="label mt-3">
                  {education.period} · {education.detail}
                </p>
              </div>
              <CertificateThumb
                {...education.photo}
                className="max-w-[8rem] justify-self-end"
                crop="aspect-square object-cover object-[50%_30%]"
              />
            </div>

            <h3 className="display mt-12 text-2xl">Published</h3>
            {publications.map((pub) => (
              <div key={pub.title} className="mt-4 max-w-xl">
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
        </div>
      </Section>

      <Section
        id="hackathons"
        label="Hackathons & mentoring"
        title="Judging, mentoring and winning on the clock."
      >
        <Reveal>
          <AchievementList
            items={achievements.filter((a) => a.group === "hackathon")}
          />
        </Reveal>
      </Section>
      <PageNav
        back={{ href: "/", label: "Homepage" }}
        next={{ href: "/marketing", label: "Marketing" }}
      />
    </>
  );
}
