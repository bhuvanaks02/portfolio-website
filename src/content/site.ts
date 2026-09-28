/* ---------------------------------------------------------------------------
   Single source of truth for the whole site.
   Anything marked TODO is waiting on you — nothing else needs editing.
--------------------------------------------------------------------------- */

export const site = {
  name: "Bhuvana K S",
  initials: "BKS",
  role: "Software Engineer",
  location: "Bengaluru, India",
  email: "work.bhuvanaks@gmail.com",
  phone: "+91 92847 17303",
  resume: "/Bhuvana_KS_Resume.pdf",

  // TODO: replace with your real deployed URL (used for metadata + sitemap).
  url: "https://bhuvanaks.vercel.app",

  // The one-liner under your name on the home page.
  tagline:
    "I build AI agents, graph databases and backend systems — teaching small models new tricks and making messy data answer questions.",

  // Longer version, used on /about.
  bio: [
    "I'm a software engineer in Bengaluru working where language models meet real data. Most of my time goes to fine-tuning small language models, wiring them to retrieval over vector stores, and making the whole thing run privately on hardware you already own.",
    "Before that I spent a year inside graph databases — modelling manufacturing plant failures in Neo4j and JanusGraph, tuning Cypher and Gremlin queries until they stopped being the bottleneck, and building the SDK that let the rest of the team draw graphs without writing the same hundred lines again.",
    "I like problems where the constraint is the interesting part: a 4 GB model instead of an API call, a graph traversal instead of a join, a human in the loop instead of blind trust in a benchmark.",
  ],

  availability: {
    open: true,
    label: "Open to interesting work",
  },
};

export type SocialLink = {
  label: string;
  href: string | null;
  handle: string;
};

// TODO: fill in the hrefs. Any entry left as null is skipped at render time.
export const socials: SocialLink[] = [
  { label: "GitHub", href: null, handle: "@bhuvanaks" },
  { label: "LinkedIn", href: null, handle: "in/bhuvanaks" },
  { label: "X", href: null, handle: "@bhuvanaks" },
  { label: "Email", href: "mailto:" + site.email, handle: site.email },
];

/* --------------------------------- work ---------------------------------- */

export type WorkEntry = {
  slug: string;
  index: string;
  company: string;
  title: string;
  headline: string;
  period: string;
  location: string;
  summary: string;
  /** Short framing of the problem, shown at the top of the case study. */
  context: string;
  highlights: { label: string; value: string }[];
  sections: { heading: string; body: string[] }[];
  stack: string[];
};

export const work: WorkEntry[] = [
  {
    slug: "infosys",
    index: "01",
    company: "Infosys Ltd.",
    title: "Software Engineer — Specialist Programmer",
    headline: "Small language models that run on your own hardware",
    period: "Dec 2024 — Present",
    location: "Bengaluru",
    summary:
      "Fine-tuned 3–4B parameter models for support automation, paired them with retrieval so knowledge stays current without retraining, and shipped them quantised to ~4 GB for local inference.",
    context:
      "Support automation across roughly twenty business domains needed answers that were specific, current and private. A hosted frontier model was the obvious path and the wrong one: the data could not leave, the cost per ticket did not scale, and every knowledge change would have meant another training run.",
    highlights: [
      { label: "Manual review effort", value: "−30%" },
      { label: "Deployed model size", value: "~4 GB" },
      { label: "Business domains", value: "~20" },
      { label: "Curated Q&A pairs", value: "~1,500" },
    ],
    sections: [
      {
        heading: "Fine-tuning for specificity",
        body: [
          "I fine-tuned small language models — Phi-4-mini (3.8B) and Qwen3 — using parameter-efficient techniques, LoRA and QLoRA, through Unsloth. The training set was roughly 1,500 curated domain-specific question-and-answer pairs spanning about twenty business domains.",
          "The goal was never general capability. It was making a small model answer these questions, in this voice, with the vocabulary of the domain it was serving. Parameter-efficient tuning made that cheap enough to iterate on rather than a once-a-quarter event.",
        ],
      },
      {
        heading: "Retrieval, so the model doesn't go stale",
        body: [
          "Fine-tuning fixes tone and shape; it is a poor place to store facts that change. I integrated the tuned models with Retrieval-Augmented Generation over vector databases — ChromaDB and Pinecone — so updated documentation is available to the model the moment it lands, with no retraining cycle.",
          "That split — behaviour in the weights, knowledge in the index — is what made the system maintainable by people who were never going to babysit training runs.",
        ],
      },
      {
        heading: "Local, quantised, private",
        body: [
          "I deployed the models 4-bit quantised, about 4 GB on disk, locally through Ollama. No cloud dependency, no data leaving the environment, and an inference cost that does not scale with ticket volume.",
        ],
      },
      {
        heading: "The backend around it",
        body: [
          "I built multi-database API integrations and backend services with FastAPI and WebSockets, spanning three or more heterogeneous database systems — document, graph and relational.",
          "I also built the end-to-end ML pipeline in Python and MongoDB: ingestion, preprocessing, training and serialisation, so a new domain could go from raw data to a candidate model without manual glue.",
        ],
      },
      {
        heading: "Keeping a human in the loop",
        body: [
          "Automated metrics were not enough to decide which checkpoint shipped. I built a validation interface in Gradio where reviewers judge candidate outputs directly, feeding automated retraining and champion-model selection.",
          "It cut manual model-review effort by around 30% — not by removing the human, but by only asking them the questions that actually decided something.",
        ],
      },
      {
        heading: "Agent workflows",
        body: [
          "Most recently I have been integrating AI agent workflows using MAF, so backend modules can hand multi-step tasks to an agent rather than hard-coding every branch.",
        ],
      },
    ],
    stack: [
      "Python",
      "Phi-4-mini",
      "Qwen3",
      "LoRA / QLoRA",
      "Unsloth",
      "Hugging Face",
      "Ollama",
      "RAG",
      "ChromaDB",
      "Pinecone",
      "FastAPI",
      "WebSockets",
      "MongoDB",
      "Gradio",
      "MAF",
    ],
  },
  {
    slug: "knowledge-lens",
    index: "02",
    company: "Knowledge Lens",
    title: "Software Engineer",
    headline: "Why did the machine stop? Ask the graph",
    period: "Aug 2024 — Dec 2024",
    location: "Bengaluru",
    summary:
      "Owned the Root Cause Analysis module for manufacturing plant asset malfunctions, and built V1 of the internal SDK that let every engineer render graph layouts from a single call.",
    context:
      "When an asset on a plant floor malfunctions, the cause is rarely the thing that failed. It is upstream, two or three hops away, in a relationship nobody wrote down. That is a graph problem, and it was mine to own.",
    highlights: [
      { label: "Visualisation boilerplate", value: "−50%" },
      { label: "Graph engines", value: "Neo4j + JanusGraph" },
      { label: "Module ownership", value: "End to end" },
    ],
    sections: [
      {
        heading: "Modelling failure as a graph",
        body: [
          "I owned the Root Cause Analysis module for manufacturing plant asset-malfunction analysis — modelling the domain as a graph and storing it across Neo4j and JanusGraph.",
          "The modelling was the real work. Assets, sensors, process steps and failure events each had to become nodes and edges a traversal could actually reason over, rather than a schema that merely looked like the plant diagram.",
        ],
      },
      {
        heading: "An SDK, so nobody rewrote the drawing code",
        body: [
          "Every engineer who wanted to see a graph was writing their own layout, styling and rendering code. I built V1 of the company's internal backend SDK: multiple graph layouts behind a single unified function call.",
          "It cut graph-visualisation boilerplate by roughly 50% for the engineering team, and — more usefully — made the output consistent. The same graph looked the same no matter who rendered it.",
        ],
      },
    ],
    stack: ["Python", "Neo4j", "JanusGraph", "Cypher", "Gremlin", "SDK design"],
  },
  {
    slug: "knowledge-lens-intern",
    index: "03",
    company: "Knowledge Lens",
    title: "Software Engineer Intern",
    headline: "Making slow graph queries fast",
    period: "Feb 2024 — Aug 2024",
    location: "Bengaluru",
    summary:
      "Owned the WebSocket API behind the FTDM chatbot, cut graph query time by 40%, and built a Gremlin graph visualiser from scratch.",
    context:
      "My first role, and the fastest way I learned that a correct query and a usable query are two different things.",
    highlights: [
      { label: "Query performance", value: "+40%" },
      { label: "Data retrieval time", value: "−25%" },
    ],
    sections: [
      {
        heading: "Real-time chatbot plumbing",
        body: [
          "I handled the WebSocket API for the FTDM chatbot feature — the transport between a user asking a question and a graph that had to answer while they were still watching.",
        ],
      },
      {
        heading: "Query optimisation",
        body: [
          "I optimised Cypher and Gremlin queries across Neo4j and JanusGraph, landing 40% faster query performance and a 25% reduction in data-retrieval time. Mostly this meant traversing in the direction the index supported, and stopping the query from walking parts of the graph the answer never depended on.",
        ],
      },
      {
        heading: "Seeing the graph, and upgrading Kafka",
        body: [
          "I built a Gremlin graph visualiser with vis.js and Python so the team could look at what they were querying.",
          "I also led the Kafka version upgrade for Jublient's client module — the kind of task that is entirely invisible when it goes well.",
        ],
      },
    ],
    stack: [
      "Python",
      "WebSockets",
      "Neo4j",
      "JanusGraph",
      "Cypher",
      "Gremlin",
      "vis.js",
      "Kafka",
    ],
  },
];

/* ------------------------------- projects -------------------------------- */

export type Project = {
  name: string;
  pitch: string;
  stack: string[];
  repo: string | null;
  live: string | null;
  year: string;
};

/**
 * TODO: your projects go here.
 *
 * Add 2–4 entries in this shape and the Projects section fills itself in:
 *
 *   {
 *     name: "Graph Whisperer",
 *     pitch: "Ask a Neo4j database questions in English; get Cypher back.",
 *     stack: ["Python", "FastAPI", "Neo4j", "Ollama"],
 *     repo: "https://github.com/…",
 *     live: null,
 *     year: "2025",
 *   },
 *
 * While the array is empty the section renders a quiet placeholder rather
 * than an empty hole.
 */
export const projects: Project[] = [];

/* ---------------------------- everything else ---------------------------- */

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "C++", "SQL", "Gremlin", "Cypher"] },
  {
    group: "AI & ML",
    items: [
      "SLM fine-tuning",
      "LoRA / QLoRA",
      "Unsloth",
      "Hugging Face",
      "Ollama",
      "RAG",
      "MAF",
      "Object detection",
    ],
  },
  { group: "Backend", items: ["FastAPI", "WebSockets"] },
  {
    group: "Databases",
    items: ["MongoDB", "Neo4j", "JanusGraph", "ChromaDB", "Pinecone"],
  },
  { group: "Tools", items: ["Git", "Gradio", "vis.js"] },
];

export const education = {
  degree: "B.E. in Computer Science",
  school: "Global Academy of Technology",
  location: "Bengaluru",
  period: "2020 — 2024",
  detail: "CGPA 9.17",
};

export const publications: {
  title: string;
  venue: string;
  year: string;
  href: string | null;
}[] = [
  {
    title: "ML-Based Graduate Admission Prediction",
    venue:
      "IEEE International Conference on Intelligent Systems, Communication and Applications (CIISCA 2023)",
    year: "2023",
    // TODO: link to the paper.
    href: null,
  },
];

export const achievements = [
  {
    title: "Hackathon judge, three times over",
    detail:
      "Invited to judge three college hackathons — at Global Academy of Technology, and twice at Dayananda Sagar University.",
    year: "2024 — 2025",
  },
  {
    title: "1st place — Evolve 2024",
    detail: "Won the office-wide hackathon at Knowledge Lens.",
    year: "2024",
  },
  {
    title: "1st place — College Hackathon",
    detail:
      "Built a complete front-end website in HTML and CSS, from scratch, on the clock.",
    year: "2021",
  },
];

export const nav: { label: string; href: string; external?: boolean }[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Résumé", href: site.resume, external: true },
];
