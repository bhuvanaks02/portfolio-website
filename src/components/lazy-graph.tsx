"use client";

import dynamic from "next/dynamic";

import { useNearScreen } from "@/components/use-in-view";

/** Same shape as the real graph, so nothing jumps when it arrives. */
function Placeholder() {
  return (
    <div
      aria-hidden="true"
      className="aspect-[4/8] rounded-2xl border border-rule bg-paper-raised sm:aspect-[16/9]"
    />
  );
}

const MeGraph = dynamic(
  () => import("@/components/me-graph").then((mod) => mod.MeGraph),
  { ssr: false, loading: Placeholder },
);

/** The graph and its code are only fetched as it nears the screen. */
export function LazyGraph() {
  const [ref, near] = useNearScreen<HTMLDivElement>("400px");
  return (
    <div ref={ref}>
      {near ? <MeGraph /> : <Placeholder />}
      <p className="label mt-4 text-center sm:hidden">
        Best experienced on a laptop or a bigger screen
      </p>
    </div>
  );
}
