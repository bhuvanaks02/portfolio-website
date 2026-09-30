"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { site } from "@/content/site";

type GraphNode = {
  id: string;
  label: string;
  /** Position inside the plate, in percent. */
  x: number;
  y: number;
  href: string;
  /** Node this one hangs off, and the relationship that joins them. */
  parent?: string;
  rel?: string;
};

const nodes: GraphNode[] = [
  { id: "me", label: site.name.split(" ")[0], x: 50, y: 50, href: "#about" },

  { id: "tech", label: "Technical", x: 27, y: 50, href: "/work", parent: "me", rel: "WORKS_IN" },
  { id: "growth", label: "Growth", x: 70, y: 27, href: "/side-quests#quests", parent: "me", rel: "RAN" },
  { id: "quests", label: "Side quests", x: 70, y: 75, href: "/side-quests", parent: "me", rel: "PICKS_UP" },

  { id: "slm", label: "Small language models", x: 13, y: 20, href: "/work/infosys", parent: "tech", rel: "FINE_TUNES" },
  { id: "rag", label: "RAG", x: 34, y: 13, href: "/work/infosys", parent: "tech", rel: "RETRIEVES_WITH" },
  { id: "graphs", label: "Graph databases", x: 11, y: 78, href: "/work/knowledge-lens", parent: "tech", rel: "QUERIES" },
  { id: "backend", label: "Backend APIs", x: 33, y: 88, href: "/work#stack", parent: "tech", rel: "BUILDS" },

  { id: "under25", label: "Under25 Summit", x: 87, y: 11, href: "/side-quests#quests", parent: "growth", rel: "MARKETED" },
  { id: "warpspeed", label: "Warpspeed hackathon", x: 87, y: 40, href: "/side-quests#quests", parent: "growth", rel: "ORGANISED" },

  { id: "judge", label: "Hackathon judge ×3", x: 89, y: 63, href: "/work#achievements", parent: "quests", rel: "JUDGED" },
  { id: "languages", label: "5 languages", x: 86, y: 90, href: "/side-quests#languages", parent: "quests", rel: "SPEAKS" },
  { id: "community", label: "Communities", x: 54, y: 90, href: "/side-quests#toolkit", parent: "quests", rel: "MODERATES" },
];

const byId = new Map(nodes.map((n) => [n.id, n]));

/** A node's depth: 0 for the centre, 1 for a strand, 2 for a leaf. */
function depth(node: GraphNode): number {
  return node.parent ? depth(byId.get(node.parent)!) + 1 : 0;
}

/** The node and every ancestor back to the centre, centre first. */
function pathTo(id: string): GraphNode[] {
  const path: GraphNode[] = [];
  for (let n = byId.get(id); n; n = n.parent ? byId.get(n.parent) : undefined) {
    path.unshift(n);
  }
  return path;
}

const nodeStyle = [
  "bg-ink px-4 py-2 font-serif text-xl text-paper sm:text-2xl",
  "border border-rule-strong bg-paper px-3.5 py-1.5 font-serif text-lg text-ink sm:text-xl",
  "hidden border border-rule bg-paper px-2.5 py-1 font-mono text-[0.6875rem] text-ink-soft sm:block",
];

export function MeGraph() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  const path = active ? pathTo(active) : [];
  const onPath = new Set(path.map((n) => n.id));

  return (
    <figure>
      <div
        className="relative aspect-[2/1] overflow-hidden rounded-2xl border border-rule bg-paper-raised sm:aspect-[5/2]"
        style={{
          backgroundImage:
            "radial-gradient(var(--rule) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        onPointerLeave={() => setActive(null)}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
          aria-hidden="true"
        >
          {nodes
            .filter((n) => n.parent)
            .map((n) => {
              const parent = byId.get(n.parent!)!;
              const lit = onPath.has(n.id);
              return (
                <line
                  key={n.id}
                  x1={parent.x}
                  y1={parent.y}
                  x2={n.x}
                  y2={n.y}
                  vectorEffect="non-scaling-stroke"
                  strokeWidth={lit ? 1.5 : 1}
                  className={`transition-[stroke,opacity] duration-300 ${
                    depth(n) === 2 ? "hidden sm:block" : ""
                  } ${
                    lit
                      ? "stroke-accent"
                      : active
                        ? "stroke-rule-strong opacity-40"
                        : "stroke-rule-strong"
                  }`}
                />
              );
            })}
        </svg>

        {nodes.map((n) => {
          const d = depth(n);
          const lit = onPath.has(n.id);
          return (
            <motion.div
              key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              initial={reduced ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + d * 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={n.href}
                onPointerEnter={() => setActive(n.id)}
                onFocus={() => setActive(n.id)}
                onBlur={() => setActive(null)}
                className={`block whitespace-nowrap rounded-full transition-[opacity,border-color,color] duration-300 ${nodeStyle[d]} ${
                  lit && d > 0 ? "border-accent text-accent" : ""
                } ${active && !lit ? "opacity-40" : ""}`}
              >
                {n.label}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </figure>
  );
}
