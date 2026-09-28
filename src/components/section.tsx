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
    <section id={id} className="border-t border-rule px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6">
            <p className="label">{label}</p>
            {note && <p className="label">{note}</p>}
          </div>
          {title && (
            <h2 className="display mt-4 max-w-2xl text-section">{title}</h2>
          )}
        </Reveal>
        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}
