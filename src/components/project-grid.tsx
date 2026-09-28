import { Reveal } from "@/components/reveal";
import { projects } from "@/content/site";

export function ProjectGrid() {
  if (projects.length === 0) {
    return (
      <Reveal>
        <div className="rounded-2xl border border-dashed border-rule-strong px-6 py-12 text-center">
          <p className="display text-2xl">Currently being written up</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
            A few side projects are on their way here. In the meantime, the
            work above is where most of the interesting problems have been.
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-2">
      {projects.map((project, i) => (
        <Reveal
          as="article"
          key={project.name}
          delay={i * 0.06}
          className="flex flex-col bg-paper p-6 transition-colors duration-300 hover:bg-paper-raised sm:p-8"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="display text-2xl">{project.name}</h3>
            <span className="label tabular-nums">{project.year}</span>
          </div>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
            {project.pitch}
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
            {project.stack.map((tech) => (
              <li key={tech} className="label">
                {tech}
              </li>
            ))}
          </ul>

          {(project.repo || project.live) && (
            <div className="mt-5 flex gap-5 border-t border-rule pt-4">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm text-ink-soft"
                >
                  Source ↗
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm text-accent"
                >
                  Live ↗
                </a>
              )}
            </div>
          )}
        </Reveal>
      ))}
    </div>
  );
}
