import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { work } from "@/content/site";

export function WorkIndex() {
  return (
    <ul className="border-t border-rule">
      {work.map((entry, i) => (
        <Reveal as="li" key={entry.slug} delay={i * 0.06}>
          <Link
            href={`/work/${entry.slug}`}
            className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 gap-y-2 border-b border-rule py-7 transition-colors duration-300 hover:bg-accent-soft/60 sm:gap-x-8 sm:py-9"
          >
            <span className="label pt-1 tabular-nums">{entry.index}</span>

            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="display text-2xl sm:text-3xl">
                  {entry.company}
                </h3>
                <span className="label">{entry.period}</span>
              </div>
              <p className="mt-1.5 text-sm text-ink-soft">{entry.title}</p>
              <p className="mt-3 max-w-xl font-serif text-lg italic leading-snug text-ink-muted">
                {entry.headline}
              </p>
            </div>

            <span
              aria-hidden="true"
              className="self-center text-xl text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
            >
              →
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
