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
    "I fine-tune small language models and build graph-backed systems — and I have run marketing campaigns and hackathons on the side.",

  // Longer version, used in the About section of the landing page.
  bio: [
    "I'm a software engineer in Bengaluru working where language models meet real data. Most of my time goes to fine-tuning small language models, wiring them to retrieval over vector stores, and making the whole thing run privately on hardware you already own.",
    "Before that I spent a year inside graph databases — modelling manufacturing plant failures in Neo4j and JanusGraph, tuning Cypher and Gremlin queries until they stopped being the bottleneck, and building the SDK that let the rest of the team draw graphs without writing the same hundred lines again.",
    "I like problems where the constraint is the interesting part: a 4 GB model instead of an API call, a graph traversal instead of a join, a human in the loop instead of blind trust in a benchmark.",
    "Outside engineering I have run marketing campaigns, organised hackathons, moderated communities and learned five languages. That work is on the side quests page.",
  ],

  // Shape of the portrait on the home page: "circle" or "square".
  avatarShape: "circle" as "circle" | "square",

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

// Any entry left as null is skipped at render time.
export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/bhuvanaks02",
    handle: "@bhuvanaks02",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bhuvana-ks/",
    handle: "in/bhuvana-ks",
  },
  { label: "X", href: "https://x.com/KsBhuvana", handle: "@KsBhuvana" },
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

const github = "https://github.com/bhuvanaks02";

/** Pulled from github.com/bhuvanaks02, newest first. */
export const projects: Project[] = [
  {
    name: "graph-viz",
    pitch:
      "Turns JanusGraph Gremlin traversal paths into interactive node-and-edge graphs with vis.js, so you can see what a query actually walked.",
    stack: ["Python", "Jupyter", "Gremlin", "JanusGraph", "vis.js"],
    repo: `${github}/graph-viz`,
    live: null,
    year: "2026",
  },
  {
    name: "HackSeek",
    pitch:
      "Find hackathons worldwide: scrapers pull listings from Devpost, Unstop, Devfolio and MLH, and you filter by place, date and theme — or just ask the chatbot.",
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
    repo: `${github}/Hack-Seek`,
    live: null,
    year: "2025",
  },
  {
    name: "FinVoice",
    pitch:
      "Voice-first money management: say what you spent or want to order, split the bill with a group, and settle it on-chain on Base.",
    stack: ["Python", "React", "TypeScript", "Solidity", "Neo4j"],
    repo: `${github}/FinVoice`,
    live: null,
    year: "2025",
  },
  {
    name: "Twitter content tool",
    pitch:
      "Pick viral tweets from your niche, add your own raw thoughts, and get drafts back in your voice. Still a product plan — no code yet.",
    stack: ["Product plan"],
    repo: `${github}/twitter-content-tool`,
    live: null,
    year: "2025",
  },
  {
    name: "graph-layouts",
    pitch:
      "A Python SDK that loads a graph layout by name — Kamada-Kawai, hierarchy and others — with room to register your own.",
    stack: ["Python", "SDK design", "Graph layouts"],
    repo: `${github}/layout-generator`,
    live: null,
    year: "2024",
  },
  {
    name: "Travel Book",
    pitch:
      "A digital scrapbook for storing the places you have been and the memories that came with them.",
    stack: ["JavaScript", "Full-stack"],
    repo: `${github}/travel_book`,
    live: "https://travel-book-ten.vercel.app",
    year: "2024",
  },
  {
    name: "WebSockets messenger",
    pitch:
      "A small React chat front-end built to practise real-time messaging over Pusher.",
    stack: ["React", "JavaScript", "Pusher"],
    repo: `${github}/webockets-messenger-app`,
    live: null,
    year: "2024",
  },
  {
    name: "Blog sentiment analysis",
    pitch:
      "Scrapes a list of blog links with BeautifulSoup and scores the sentiment of each article with NLTK.",
    stack: ["Python", "BeautifulSoup", "NLTK"],
    repo: `${github}/NLP-sentiment-analysis`,
    live: null,
    year: "2024",
  },
  {
    name: "Graduate admission prediction",
    pitch:
      "Data exploration plus a head-to-head of logistic regression, SVM, random forest and k-nearest neighbours on admission data — the code behind the CIISCA 2023 paper.",
    stack: ["Python", "Jupyter", "Machine learning"],
    repo: `${github}/Graduate-Admission-Prediction`,
    live: null,
    year: "2023",
  },
  {
    name: "Speech recognition",
    pitch:
      "Listens, transcribes speech to text, then reads it back in a synthesised voice.",
    stack: ["Python", "SpeechRecognition", "pyttsx3"],
    repo: `${github}/speech-recognition`,
    live: null,
    year: "2023",
  },
];

/* --------------------------- earlier experience -------------------------- */

/** Short roles that do not get a full case study page. */
export const internships: {
  company: string;
  title: string;
  period: string;
  location: string;
  points: string[];
}[] = [
  {
    company: "Technofly Pvt Ltd.",
    title: "Data Science Intern",
    period: "Nov 2023 — Dec 2023",
    location: "Bengaluru",
    points: [
      "Worked in Python with NumPy, Pandas, Tkinter and TensorFlow.",
      "Explored machine learning and deep learning algorithms, including YOLO and Keras classification.",
      "Built a mini-project on the Google Speech API that converts voice to text and back to an automated voice.",
    ],
  },
];

/* ------------------------------ side quests ------------------------------ */

/** Everything that is not tech. More to come. */
export const sideQuests = {
  intro:
    "The parts of me that do not compile. Marketing campaigns, hackathon floors, community servers and a few too many languages.",

  roles: [
    {
      org: "Under25",
      title: "Intern",
      period: "Feb 2023 — Mar 2023",
      location: "Bengaluru",
      points: [
        "Managed multiple marketing campaigns for the Under25 Summit 2023.",
        "Raised on-ground awareness of the Under25 community and ran on-ground operations during the summit.",
      ],
    },
    {
      org: "Warpspeed 2023, Devfolio",
      title: "Organizer",
      period: "May 2023",
      location: "Bengaluru",
      points: [
        "Helped manage partners for the Warpspeed hackathon.",
        "Handled on-ground ops and marketing.",
      ],
    },
  ],

  languages: ["English", "Hindi", "Kannada", "Marathi", "Korean"],

  toolkit: [
    "Event management",
    "Discord & Telegram moderation",
    "Figma",
    "Canva",
    "Notion",
    "Google Sheets & Slides",
  ],
};

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
  { label: "Work", href: "/work" },
  { label: "Side quests", href: "/side-quests" },
];
