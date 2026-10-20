import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";

type SectionProps = {
  id?: string;
  label: string;
  title?: string;
  children: ReactNode;
  /** Right-hand note beside the section label. */
  note?: string;
};

export function Section({ id, label, title, note, children }: SectionProps) {
  return (
    <section id={id} className="defer-paint scroll-mt-16 border-t border-rule px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:text-left">
            <p className="label text-accent">{label}</p>
            {note && <p className="label">{note}</p>}
          </div>
          {title && (
            <h2 className="display mx-auto mt-5 max-w-2xl text-center text-section sm:mx-0 sm:text-left">{title}</h2>
          )}
        </Reveal>
        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}
