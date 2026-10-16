"use client";

import Image from "next/image";
import { useRef } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** Downloadable PDF of the same document. */
  pdf?: string;
  /** Where the document can be checked independently. */
  verify?: { label: string; href: string };
  /** Thumbnail width cap, as a Tailwind max-width class. */
  className?: string;
  /** Classes that crop the thumbnail only, e.g. "aspect-square object-cover". */
  crop?: string;
};

/** A small certificate that opens full size in a dialog. */
export function CertificateThumb({
  src,
  alt,
  width,
  height,
  caption,
  pdf,
  verify,
  className = "max-w-xs",
  crop,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <figure className={`w-full ${className}`}>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-label={`Open full size: ${alt}`}
        className="block w-full cursor-zoom-in"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 768px) 20rem, 100vw"
          className={`w-full rounded-lg border border-rule transition-transform duration-300 hover:-translate-y-0.5 ${
            crop ?? "h-auto"
          }`}
        />
      </button>

      {(caption || pdf || verify) && (
        <figcaption className="mt-2 space-y-1 text-sm text-ink-muted">
          {caption && <p>{caption}</p>}
          {(pdf || verify) && (
            <p className="flex flex-wrap gap-x-4 gap-y-1">
              {pdf && (
                <a
                  href={pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-ink-soft"
                >
                  PDF
                </a>
              )}
              {verify && (
                <a
                  href={verify.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-ink-soft"
                >
                  {verify.label} ↗
                </a>
              )}
            </p>
          )}
        </figcaption>
      )}

      <dialog
        ref={dialog}
        onClick={(e) => {
          // A click on the backdrop lands on the dialog element itself.
          if (e.target === dialog.current) dialog.current?.close();
        }}
        className="m-auto max-h-[92vh] max-w-[92vw] overflow-auto rounded-xl bg-paper p-2 backdrop:bg-black/70"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="92vw"
          className="h-auto max-h-[86vh] w-auto max-w-full rounded-lg"
        />
        <form method="dialog" className="mt-2 flex justify-end">
          <button className="rounded-full px-4 py-1.5 text-sm text-ink-soft hover:bg-accent-soft hover:text-ink">
            Close
          </button>
        </form>
      </dialog>
    </figure>
  );
}
