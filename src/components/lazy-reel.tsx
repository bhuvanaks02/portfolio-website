"use client";

import { useNearScreen } from "@/components/use-in-view";

/**
 * One Instagram reel, scaled down. The frame is empty until the tile is about
 * to scroll into view, so five heavy embeds don't all load at once.
 */
export function LazyReel({ href, title }: { href: string; title: string }) {
  const [ref, near] = useNearScreen<HTMLDivElement>("120px");
  return (
    <div
      ref={ref}
      className="h-[360px] w-[203px] overflow-hidden rounded-xl border border-rule bg-paper-raised"
    >
      {near && (
        <iframe
          src={`${href}embed`}
          title={title}
          loading="lazy"
          allowFullScreen
          scrolling="no"
          className="h-[580px] w-[328px] origin-top-left scale-[0.62] border-0"
        />
      )}
    </div>
  );
}
