"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

  { id: "tech", label: "Technical", x: 24, y: 50, href: "/work", parent: "me", rel: "WORKS_IN" },
  { id: "growth", label: "Marketing", x: 72, y: 26, href: "/marketing", parent: "me", rel: "RAN" },
  { id: "quests", label: "Side quests", x: 80, y: 72, href: "/side-quests", parent: "me", rel: "PICKS_UP" },

  { id: "slm", label: "Small language models", x: 14, y: 13, href: "/work/infosys#small-language-models", parent: "tech", rel: "FINE_TUNES" },
  { id: "rag", label: "RAG", x: 33, y: 8, href: "/work/infosys#retrieval-and-agents", parent: "tech", rel: "RETRIEVES_WITH" },
  { id: "agents", label: "AI agents", x: 8, y: 31, href: "/work/infosys#retrieval-and-agents", parent: "tech", rel: "ORCHESTRATES" },
  { id: "edu", label: "Education", x: 6, y: 50, href: "/work#education", parent: "tech", rel: "STUDIED" },
  { id: "paper", label: "IEEE paper", x: 8, y: 68, href: "/work#education", parent: "tech", rel: "PUBLISHED" },
  { id: "graphs", label: "Graph databases", x: 12, y: 82, href: "/work/knowledge-lens#root-cause-analysis", parent: "tech", rel: "QUERIES" },
  { id: "hackathons", label: "Hackathons", x: 38, y: 74, href: "/work#hackathons", parent: "tech", rel: "JUDGES" },
  { id: "backend", label: "Backend APIs", x: 26, y: 92, href: "/work/infosys#database-connectors", parent: "tech", rel: "BUILDS" },

  { id: "ethmumbai", label: "ETHMumbai", x: 52, y: 8, href: "/marketing#ethmumbai", parent: "growth", rel: "RAN_SOCIALS_AT" },
  { id: "campaigns", label: "Campaigns", x: 66, y: 7, href: "/marketing#under25", parent: "growth", rel: "RAN" },
  { id: "under25", label: "Under25 internship", x: 85, y: 7, href: "/marketing#under25", parent: "growth", rel: "INTERNED_AT" },
  { id: "dcodeblock", label: "Dcodeblock PR", x: 90, y: 18, href: "/marketing#pr", parent: "growth", rel: "HANDLED" },
  { id: "live", label: "Livestreams & meetups", x: 89, y: 30, href: "/marketing#pr", parent: "growth", rel: "HOSTED" },
  { id: "warpspeed", label: "Warpspeed hackathon", x: 79, y: 49, href: "/marketing#warpspeed", parent: "growth", rel: "VOLUNTEERED_AT" },


  { id: "running", label: "Running", x: 92, y: 60, href: "/side-quests#running", parent: "quests", rel: "RUNS" },
  { id: "languages", label: "5 languages", x: 91, y: 82, href: "/side-quests#languages", parent: "quests", rel: "SPEAKS" },
  { id: "baddies", label: "@blrbaddies", x: 85, y: 92, href: "/side-quests#communities", parent: "quests", rel: "CO_FOUNDED" },
  { id: "crypto", label: "Crypto", x: 73, y: 92, href: "/side-quests#communities", parent: "quests", rel: "BUILDS_IN" },
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

/** Every node that hangs below the given one. */
function descendantsOf(id: string): GraphNode[] {
  const kids = nodes.filter((n) => n.parent === id);
  return kids.flatMap((k) => [k, ...descendantsOf(k.id)]);
}

/** Per-node motion state, in pixels away from the node's home position. */
type Body = { ox: number; oy: number; vx: number; vy: number };

type Point = { x: number; y: number };
type LayoutId = "radial" | "tree" | "timeline" | "kamada";

const kidsOf = (id: string) => nodes.filter((n) => n.parent === id);
const strands = nodes.filter((n) => depth(n) === 1);
const leaves = nodes.filter((n) => depth(n) === 2);
const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;

/**
 * Kamada-Kawai: treat every pair of nodes as a spring whose rest length is
 * their graph distance, then relax the whole system until the layout settles.
 * Computed once up front, so the result is the same on every visit.
 */
function kamadaKawai(): Map<string, Point> {
  const n = nodes.length;
  const index = new Map(nodes.map((node, i) => [node.id, i]));

  // Shortest-path distances between every pair, by walking the edges.
  const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));
  nodes.forEach((_, i) => (dist[i][i] = 0));
  nodes.forEach((node, i) => {
    if (!node.parent) return;
    const j = index.get(node.parent)!;
    dist[i][j] = dist[j][i] = 1;
  });
  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }

  // Start on a circle, then move the most-stressed node a little at a time.
  const xs = nodes.map((_, i) => Math.cos((i / n) * 2 * Math.PI));
  const ys = nodes.map((_, i) => Math.sin((i / n) * 2 * Math.PI));

  const stress = (m: number) => {
    let ex = 0;
    let ey = 0;
    for (let i = 0; i < n; i++) {
      if (i === m) continue;
      const dx = xs[m] - xs[i];
      const dy = ys[m] - ys[i];
      const len = Math.hypot(dx, dy) || 1e-6;
      const k = 1 / dist[m][i] ** 2;
      ex += k * (dx - (dist[m][i] * dx) / len);
      ey += k * (dy - (dist[m][i] * dy) / len);
    }
    return { ex, ey };
  };

  for (let step = 0; step < 1500; step++) {
    let m = 0;
    let worst = -1;
    for (let i = 0; i < n; i++) {
      const { ex, ey } = stress(i);
      const delta = Math.hypot(ex, ey);
      if (delta > worst) {
        worst = delta;
        m = i;
      }
    }
    if (worst < 1e-4) break;

    let a = 0;
    let b = 0;
    let c = 0;
    for (let i = 0; i < n; i++) {
      if (i === m) continue;
      const dx = xs[m] - xs[i];
      const dy = ys[m] - ys[i];
      const len = Math.hypot(dx, dy) || 1e-6;
      const k = 1 / dist[m][i] ** 2;
      const l = dist[m][i];
      a += k * (1 - (l * dy * dy) / len ** 3);
      b += (k * l * dx * dy) / len ** 3;
      c += k * (1 - (l * dx * dx) / len ** 3);
    }
    const { ex, ey } = stress(m);
    const det = a * c - b * b;
    if (Math.abs(det) < 1e-9) continue;
    xs[m] += (-ex * c + b * ey) / det;
    ys[m] += (-a * ey + b * ex) / det;
  }

  // Fit the result to the plate, leaving room for the labels.
  const [x0, x1] = [Math.min(...xs), Math.max(...xs)];
  const [y0, y1] = [Math.min(...ys), Math.max(...ys)];
  return new Map(
    nodes.map((node, i) => [
      node.id,
      {
        x: 9 + ((xs[i] - x0) / (x1 - x0)) * 82,
        y: 11 + ((ys[i] - y0) / (y1 - y0)) * 78,
      },
    ]),
  );
}

/** Where every node sits in each layout, in percent of the plate. */
const layouts: Record<LayoutId, Map<string, Point>> = (() => {
  const radial = new Map<string, Point>(
    nodes.map((n) => [n.id, { x: n.x, y: n.y }]),
  );

  // Top-down tree: leaves staggered over four rows along the bottom so labels never collide.
  const tree = new Map<string, Point>([["me", { x: 50, y: 11 }]]);
  leaves.forEach((l, i) =>
    tree.set(l.id, {
      x: 7 + i * (86 / (leaves.length - 1)),
      y: 62 + (i % 4) * 9,
    }),
  );
  strands.forEach((st) =>
    tree.set(st.id, {
      x: mean(kidsOf(st.id).map((k) => tree.get(k.id)!.x)),
      y: 45,
    }),
  );

  // Left-to-right tree.
  const timeline = new Map<string, Point>([["me", { x: 9, y: 50 }]]);
  leaves.forEach((l, i) =>
    timeline.set(l.id, {
      x: i % 2 ? 87 : 78,
      y: 5 + i * (90 / (leaves.length - 1)),
    }),
  );
  strands.forEach((st) =>
    timeline.set(st.id, {
      x: 46,
      y: mean(kidsOf(st.id).map((k) => timeline.get(k.id)!.y)),
    }),
  );

  const kamada = kamadaKawai();

  return { radial, tree, timeline, kamada };
})();

const layoutOptions: { id: LayoutId; label: string; icon: React.ReactNode }[] =
  [
    {
      id: "radial",
      label: "Radial",
      icon: (
        <>
          <circle cx="12" cy="12" r="2.5" />
          <path d="M12 9.5V4M14.2 13.2l4.6 3M9.8 13.2l-4.6 3" />
          <circle cx="12" cy="3" r="1.4" />
          <circle cx="20" cy="18" r="1.4" />
          <circle cx="4" cy="18" r="1.4" />
        </>
      ),
    },
    {
      id: "tree",
      label: "Tree",
      icon: (
        <>
          <circle cx="12" cy="4" r="2" />
          <path d="M12 6v4M12 10H5v4M12 10h7v4M12 10v4" />
          <circle cx="5" cy="17" r="1.8" />
          <circle cx="12" cy="17" r="1.8" />
          <circle cx="19" cy="17" r="1.8" />
        </>
      ),
    },
    {
      id: "timeline",
      label: "Left to right",
      icon: (
        <>
          <circle cx="4" cy="12" r="2" />
          <path d="M6 12h4M10 12V6h4M10 12h4M10 12v6h4" />
          <circle cx="17" cy="6" r="1.8" />
          <circle cx="17" cy="12" r="1.8" />
          <circle cx="17" cy="18" r="1.8" />
        </>
      ),
    },
    {
      id: "kamada",
      label: "Kamada-Kawai",
      icon: (
        <>
          <path d="M6 7l7 2.5M13 9.5l6 5M13 9.5l-3 8M10 17.5l-5-2M10 17.5l9-3M6 7l-1 8.5" />
          <circle cx="6" cy="7" r="1.8" />
          <circle cx="13" cy="9.5" r="2" />
          <circle cx="19" cy="14.5" r="1.8" />
          <circle cx="10" cy="17.5" r="1.8" />
          <circle cx="5" cy="15.5" r="1.5" />
        </>
      ),
    },
  ];

const nodeStyle = [
  "bg-ink px-4 py-2 font-serif text-xl text-paper sm:text-2xl",
  "border border-rule-strong bg-paper px-3.5 py-1.5 font-serif text-lg text-ink sm:text-xl",
  "hidden border border-rule bg-paper px-2.5 py-1 font-mono text-[0.6875rem] text-ink-soft sm:block",
];

export function MeGraph() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [layout, setLayout] = useState<LayoutId>("radial");
  const layoutRef = useRef<LayoutId>("radial");

  const path = active ? pathTo(active) : [];
  const onPath = new Set([
    ...path.map((n) => n.id),
    // Hovering a strand also lights up everything beneath it.
    ...(active ? descendantsOf(active).map((n) => n.id) : []),
  ]);

  const plate = useRef<HTMLDivElement>(null);
  const nodeEls = useRef(new Map<string, HTMLDivElement>());
  const lineEls = useRef(new Map<string, SVGLineElement>());
  const relEls = useRef(new Map<string, HTMLSpanElement>());
  const packetEls = useRef(new Map<string, HTMLSpanElement>());
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const drag = useRef<{
    id: string;
    startX: number;
    startY: number;
    x: number;
    y: number;
    moved: boolean;
  } | null>(null);

  useEffect(() => {
    const el = plate.current;
    if (!el) return;
    // Visitors who ask for reduced motion get a gentler version, not a frozen one.
    const calm = reduced ? 0.5 : 1;

    const bodies = new Map<string, Body>(
      nodes.map((n) => [n.id, { ox: 0, oy: 0, vx: 0, vy: 0 }]),
    );
    // Current home position of each node; eases toward the chosen layout.
    const pos = new Map<string, Point>(
      nodes.map((n) => [n.id, { x: n.x, y: n.y }]),
    );
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now / 1000;
      const w = el.clientWidth;
      const h = el.clientHeight;

      const target = layouts[layoutRef.current];
      const ease = 1 - Math.exp(-5 * dt);

      nodes.forEach((n, i) => {
        const b = bodies.get(n.id)!;
        const home = pos.get(n.id)!;
        const goal = target.get(n.id)!;
        home.x += (goal.x - home.x) * ease;
        home.y += (goal.y - home.y) * ease;
        const hx = (home.x / 100) * w;
        const hy = (home.y / 100) * h;
        const d = depth(n);
        const amp = (d === 0 ? 5 : d === 1 ? 12 : 17) * calm;

        // A slow, per-node wander so the whole graph is always breathing.
        let tx = Math.sin(t * (0.9 + (i % 5) * 0.2) + i * 1.7) * amp;
        let ty = Math.cos(t * (0.8 + (i % 4) * 0.22) + i * 2.3) * amp;

        // Children trail their parent, so a strand moves as one.
        if (n.parent) {
          const p = bodies.get(n.parent)!;
          tx += p.ox * 0.6;
          ty += p.oy * 0.6;
        }

        const dr = drag.current;
        const dragged = dr?.id === n.id;
        if (dr && dragged) {
          tx = dr.x - hx;
          ty = dr.y - hy;
        } else if (pointer.current && !dr) {
          // Nodes lean toward the cursor, more the closer it gets.
          const dx = pointer.current.x - hx;
          const dy = pointer.current.y - hy;
          const dist = Math.hypot(dx, dy) || 1;
          const pull = Math.max(0, 1 - dist / 260) * 26 * calm;
          tx += (dx / dist) * pull;
          ty += (dy / dist) * pull;
        }

        // Spring towards the target, with a little damping.
        const k = dragged ? 260 : 70;
        b.vx += (tx - b.ox) * k * dt;
        b.vy += (ty - b.oy) * k * dt;
        const damp = Math.exp(-(dragged ? 16 : 7) * dt);
        b.vx *= damp;
        b.vy *= damp;
        b.ox += b.vx * dt;
        b.oy += b.vy * dt;

        const nodeEl = nodeEls.current.get(n.id);
        if (nodeEl) {
          nodeEl.style.transform = `translate(${b.ox}px, ${b.oy}px)`;
          const wrap = nodeEl.parentElement;
          if (wrap) {
            wrap.style.left = `${home.x}%`;
            wrap.style.top = `${home.y}%`;
          }
        }
      });

      nodes.forEach((n) => {
        if (!n.parent) return;
        const a = bodies.get(n.parent)!;
        const b = bodies.get(n.id)!;
        const pa = pos.get(n.parent)!;
        const pn = pos.get(n.id)!;
        const x1 = pa.x + (a.ox / w) * 100;
        const y1 = pa.y + (a.oy / h) * 100;
        const x2 = pn.x + (b.ox / w) * 100;
        const y2 = pn.y + (b.oy / h) * 100;
        const line = lineEls.current.get(n.id);
        if (line) {
          line.setAttribute("x1", String(x1));
          line.setAttribute("y1", String(y1));
          line.setAttribute("x2", String(x2));
          line.setAttribute("y2", String(y2));
        }
        const packet = packetEls.current.get(n.id);
        if (packet) {
          // Each edge sends a little pulse from parent to child, on loop.
          const idx = nodes.indexOf(n);
          const f = ((t * (0.22 + (idx % 4) * 0.05) + idx * 0.37) % 1 + 1) % 1;
          packet.style.left = `${x1 + (x2 - x1) * f}%`;
          packet.style.top = `${y1 + (y2 - y1) * f}%`;
          packet.style.opacity = String(Math.sin(f * Math.PI) * calm);
        }
        const rel = relEls.current.get(n.id);
        if (rel) {
          rel.style.left = `${(x1 + x2) / 2}%`;
          rel.style.top = `${(y1 + y2) / 2}%`;
        }
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const local = (e: React.PointerEvent) => {
    const r = plate.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <figure>
      <div
        ref={plate}
        className="relative aspect-[2/1] overflow-hidden rounded-2xl border border-rule bg-paper-raised sm:aspect-[16/9]"
        style={{
          backgroundImage:
            "radial-gradient(var(--rule) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        onPointerMove={(e) => {
          pointer.current = local(e);
          const dr = drag.current;
          if (dr) {
            dr.x = pointer.current.x;
            dr.y = pointer.current.y;
            if (Math.hypot(e.clientX - dr.startX, e.clientY - dr.startY) > 5) {
              dr.moved = true;
            }
          }
        }}
        onPointerLeave={() => {
          pointer.current = null;
          if (!drag.current) setActive(null);
        }}
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
                  ref={(el) => {
                    if (el) lineEls.current.set(n.id, el);
                  }}
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

        {nodes
          .filter((n) => n.parent)
          .map((n) => (
            <span
              key={`packet-${n.id}`}
              ref={(el) => {
                if (el) packetEls.current.set(n.id, el);
              }}
              aria-hidden="true"
              className={`pointer-events-none absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent ${
                depth(n) === 2 ? "hidden sm:block" : ""
              }`}
              style={{ left: `${byId.get(n.parent!)!.x}%`, top: `${byId.get(n.parent!)!.y}%`, opacity: 0 }}
            />
          ))}

        {nodes
          .filter((n) => n.parent && n.rel)
          .map((n) => {
            const parent = byId.get(n.parent!)!;
            return (
              <span
                key={`rel-${n.id}`}
                ref={(el) => {
                  if (el) relEls.current.set(n.id, el);
                }}
                aria-hidden="true"
                className={`pointer-events-none absolute hidden -translate-x-1/2 -translate-y-1/2 rounded bg-paper-raised px-1.5 font-mono text-[0.625rem] tracking-wide text-accent transition-opacity duration-300 sm:block ${
                  onPath.has(n.id) ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  left: `${(parent.x + n.x) / 2}%`,
                  top: `${(parent.y + n.y) / 2}%`,
                }}
              >
                {n.rel}
              </span>
            );
          })}

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
              <div
                ref={(el) => {
                  if (el) nodeEls.current.set(n.id, el);
                }}
                className="relative"
              >
                {d === 0 && !reduced && (
                  <>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-ink/20 [animation-duration:2.6s]"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-ink/10 [animation-delay:1.3s] [animation-duration:2.6s]"
                    />
                  </>
                )}
              <Link
                href={n.href}
                draggable={false}
                onPointerDown={(e) => {
                  // Drag with a mouse or pen; touch keeps scrolling the page.
                  if (e.pointerType === "touch") return;
                  const p = local(e);
                  drag.current = {
                    id: n.id,
                    startX: e.clientX,
                    startY: e.clientY,
                    x: p.x,
                    y: p.y,
                    moved: false,
                  };
                  e.currentTarget.setPointerCapture(e.pointerId);
                }}
                onPointerUp={(e) => {
                  e.currentTarget.releasePointerCapture(e.pointerId);
                  // Let the click handler see whether this was a drag.
                  setTimeout(() => {
                    drag.current = null;
                  }, 0);
                }}
                onPointerCancel={() => {
                  drag.current = null;
                }}
                onClick={(e) => {
                  if (drag.current?.moved) e.preventDefault();
                }}
                onPointerEnter={() => setActive(n.id)}
                onFocus={() => setActive(n.id)}
                onBlur={() => setActive(null)}
                className={`relative block cursor-grab touch-pan-y select-none whitespace-nowrap rounded-full transition-[opacity,border-color,color,transform] duration-300 hover:scale-110 active:cursor-grabbing ${nodeStyle[d]} ${
                  lit && d > 0 ? "border-accent text-accent" : ""
                } ${active && !lit ? "opacity-40" : ""}`}
              >
                {n.label}
              </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div
        role="group"
        aria-label="Graph layout"
        className="mt-3 flex items-center justify-end gap-1.5"
      >
        <span className="label mr-1.5">Layout</span>
        {layoutOptions.map((o) => (
          <button
            key={o.id}
            type="button"
            title={o.label}
            aria-label={`${o.label} layout`}
            aria-pressed={layout === o.id}
            onClick={() => {
              layoutRef.current = o.id;
              setLayout(o.id);
            }}
            className={`grid size-8 place-items-center rounded-full border transition-colors duration-200 ${
              layout === o.id
                ? "border-ink bg-ink text-paper"
                : "border-rule text-ink-soft hover:border-rule-strong hover:text-ink"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {o.icon}
            </svg>
          </button>
        ))}
      </div>
    </figure>
  );
}
