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
    "Backend developer exploring what AI can do inside real systems.",

  // Second sentence of the one-liner, set in italic serif.
  taglineAside: "Currently learning a little about a lot of things.",

  // Longer version, used in the About section of the landing page.
  bio: [
    "I'm still learning, and I like it that way. Quick to pick things up, and keen to turn that into work people remember.",
    "Backend development got me started, my current work is around AI, and marketing and PR are what I explore out of curiosity.",
    "For fun, I sing, dance and play badminton, which led me to build a badminton community and run it for a few months. I also speak 5 languages: English, Hindi, Kannada, Marathi and Korean.",
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
  /** One line shown on hover beside the link in the hero. */
  note?: string;
};

// Any entry left as null is skipped at render time.
export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/bhuvanaks02",
    handle: "@bhuvanaks02",
    note: "graph-viz, FinVoice and the rest",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bhuvana-ks/",
    handle: "in/bhuvana-ks",
    note: "The formal record: roles, dates, education",
  },
  {
    label: "X",
    href: "https://x.com/KsBhuvana",
    handle: "@KsBhuvana",
    note: "Shorter thoughts, less formally",
  },
  {
    label: "Telegram",
    href: "https://t.me/Bhuvanaks",
    handle: "@Bhuvanaks",
    note: "Quickest way to reach me, just in case",
  },
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
  /** Optional figures shown as a grid; leave out and the grid is hidden. */
  highlights?: { label: string; value: string }[];
  sections: {
    heading: string;
    body: string[];
    /** An optional photo shown under the text; opens full size on tap. */
    image?: {
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
    };
  }[];
  stack: string[];
  /** An award from this role, shown on its case study. */
  recognition?: {
    title: string;
    detail: string;
    certificate: { src: string; alt: string; width: number; height: number };
  };
};

export const work: WorkEntry[] = [
  {
    slug: "infosys",
    index: "01",
    company: "Infosys Ltd.",
    title: "Software Engineer, Specialist Programmer",
    headline: "From churn models to agents that run the system",
    period: "Dec 2024 – Present",
    location: "Bengaluru",
    summary:
      "Churn models and retraining pipelines, connectors for 10+ databases, locally deployed small language models, and now skills and plugins for agentic AI.",
    context:
      "Five phases, one thread: getting models and data to work reliably inside real systems.",
    highlights: [
      { label: "Databases connected", value: "10+" },
      { label: "Manual work automated", value: "40%" },
      { label: "Deployed model size", value: "~4 GB" },
      { label: "Now", value: "Agentic AI" },
    ],
    sections: [
      {
        heading: "Churn prediction",
        body: [
          "Built customer-churn prediction models and automated pipelines to retrain them, so keeping a model current no longer needed manual effort.",
        ],
      },
      {
        heading: "Refining the codebase",
        body: [
          "Reworked existing Python code with better libraries and techniques for performance.",
        ],
      },
      {
        heading: "Database connectors",
        body: [
          "Pure-Python connectors for 10+ databases and storage systems, relational, document, vector and cloud, used by an orchestrator agent.",
        ],
      },
      {
        heading: "Small language models",
        body: [
          "Learnt the full path: data cleaning, Q&A preparation, domain pre-training, LoRA and QLoRA on Qwen and Phi, then DPO.",
        ],
      },
      {
        heading: "Retrieval and agents",
        body: [
          "A short stint on RAG, then Microsoft Agent Framework. Now building skills and plugins for agents.",
        ],
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "MongoDB",
      "PostgreSQL",
      "Pinecone",
      "ChromaDB",
      "Qwen",
      "Phi",
      "LoRA / QLoRA",
      "DPO",
      "Ollama",
      "MAF",
    ],
  },
  {
    slug: "knowledge-lens",
    index: "02",
    company: "Knowledge Lens",
    title: "Software Engineer",
    headline: "Why did the machine stop? Ask the graph",
    period: "Aug 2024 – Dec 2024",
    location: "Bengaluru",
    summary:
      "Owned the Root Cause Analysis module for plant asset malfunctions, and built V1 of the internal SDK for graph layouts.",
    context:
      "When a plant asset fails, the cause is usually upstream. That is a graph problem, and it was mine to own.",
    highlights: [
      { label: "Visualisation boilerplate", value: "−50%" },
      { label: "Graph engines", value: "Neo4j + JanusGraph" },
      { label: "Module ownership", value: "End to end" },
    ],
    sections: [
      {
        heading: "Root cause analysis",
        body: [
          "Owned the module for manufacturing asset-malfunction analysis, with the plant modelled as a graph across Neo4j and JanusGraph.",
        ],
      },
      {
        heading: "Internal SDK",
        body: [
          "Built V1 of the internal SDK to make rendering graph layouts easier: multiple layouts behind a single call, with consistent output for the team.",
        ],
      },
    ],
    stack: ["Python", "Neo4j", "JanusGraph", "Cypher", "Gremlin", "SDK design"],
    recognition: {
      title: "Star of the Month, Best New Comer",
      detail:
        "Recognised for performance and excellence at work, October 2024.",
      certificate: {
        src: "/certificates/knowledge-lens-star-of-the-month.jpg",
        alt: "Knowledge Lens Star of the Month certificate of achievement for Bhuvana K S, Best New Comer, October 2024",
        width: 800,
        height: 589,
      },
    },
  },
  {
    slug: "knowledge-lens-intern",
    index: "03",
    company: "Knowledge Lens",
    title: "Software Engineer Intern",
    headline: "Making slow graph queries fast",
    period: "Feb 2024 – Aug 2024",
    location: "Bengaluru",
    summary:
      "Owned the WebSocket API behind the FTDM chatbot, optimised graph queries, and explored frontend, graph databases and data science along the way.",
    context:
      "My first role, and where I learned that a correct query and a usable query are different things.",
    highlights: [
      { label: "Query performance", value: "+40%" },
      { label: "Data retrieval time", value: "−25%" },
    ],
    sections: [
      {
        heading: "Chatbot API",
        body: ["Owned the WebSocket API behind the FTDM chatbot."],
      },
      {
        heading: "Query optimisation",
        body: [
          "Optimised Cypher and Gremlin queries across Neo4j and JanusGraph.",
        ],
      },
      {
        heading: "Graph visualiser",
        body: [
          "JanusGraph had no satisfactory visualiser at the time, so I built a Jupyter notebook: load a connection and a query, and it draws the nodes and edges of the result.",
        ],
      },
      {
        heading: "Evolve 2024 win",
        body: [
          "Won 1st place at Evolve 2024, Knowledge Lens's internal hackathon. We collected ID-card images of employees, annotated them and trained a face-recognition model for the office attendance system.",
        ],
        image: {
          src: "/photos/evolve-2024-winner.jpg",
          alt: "Bhuvana with the winning team at Evolve 2024, the Knowledge Lens internal hackathon",
          width: 2000,
          height: 1334,
          caption: "With the winning team at Evolve 2024.",
        },
      },
      {
        heading: "Domains explored",
        body: [
          "The internship was a wide start: frontend with React, graph databases, and data science, including data cleaning.",
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
      "React",
      "Data cleaning",
    ],
  },
];

/* -------------------------------- journey -------------------------------- */

const role = (slug: string) => work.find((w) => w.slug === slug)!;

/** The timeline on the home page, oldest first. */
export const journey: {
  years: string;
  verb: string;
  text: string;
  place: string;
  /** A line worth keeping from that stretch. Optional. */
  lesson?: string;
  href: string;
  cta: string;
}[] = [
  {
    years: "2020 – 2024",
    verb: "Learning",
    text: "A computer science degree, a first hackathon win in 2021 and an IEEE paper on graduate admission prediction in 2023.",
    place: "Global Academy of Technology · B.E. Computer Science · CGPA 9.17",
    href: "/work#education",
    cta: "Education and the paper",
  },
  {
    years: "2023 – 2026",
    verb: "Organising",
    text: "Marketing and PR, explored out of curiosity. A year of outreach and research at Web3 agency Pukecast, campaigns and ops for the Under25 Summit, marketing for HackALeague 2.0, marketing and PR plus livestreams and meetups for Dcodeblock, and social media and operations for ETHMumbai 2026.",
    place: "Pukecast · Under25 · Warpspeed · HackALeague · Dcodeblock · ETHMumbai",
    href: "/marketing",
    cta: "Marketing work",
  },
  {
    years: "Feb – Aug 2024",
    verb: "Querying",
    text: `${role("knowledge-lens-intern").summary} Won 1st place at Evolve 2024, the company's internal hackathon.`,
    place: "Knowledge Lens · Software Engineer Intern",
    lesson: "A correct query and a usable query are two different things.",
    href: "/work/knowledge-lens-intern",
    cta: "Experience",
  },
  {
    years: "Aug – Dec 2024",
    verb: "Modelling",
    text: role("knowledge-lens").summary,
    place: "Knowledge Lens · Software Engineer",
    lesson:
      "When an asset malfunctions, the cause is rarely the thing that failed. It is two or three hops upstream.",
    href: "/work/knowledge-lens",
    cta: "Experience",
  },
  {
    years: "Dec 2024 – now",
    verb: "Tuning",
    text: role("infosys").summary,
    place: "Infosys · Specialist Programmer",
    lesson: "Behaviour in the weights, knowledge in the index.",
    href: "/work/infosys",
    cta: "Experience",
  },
  {
    years: "2024 – 2026",
    verb: "Judging",
    text: "Judged and mentored at hackathons: Global Academy of Technology, Dayananda Sagar University and the iQOO hackathon grand finale in October 2026.",
    place: "Hackathon judge and mentor",
    href: "/work#hackathon-judge",
    cta: "Recognition",
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
    name: "FinVoice",
    pitch:
      "Voice-first money management: say what you spent or want to order, split the bill with a group, and settle it on-chain on Base.",
    stack: ["Python", "React", "TypeScript", "Solidity", "Neo4j"],
    repo: `${github}/FinVoice`,
    live: null,
    year: "2025",
  },
  {
    name: "graph-layouts",
    pitch:
      "A Python SDK that loads a graph layout by name (Kamada-Kawai, hierarchy and others), with room to register your own.",
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
      "Data exploration plus a head-to-head of logistic regression, SVM, random forest and k-nearest neighbours on admission data. This is the code behind the CIISCA 2023 paper.",
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
    period: "Nov 2023 – Dec 2023",
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
    "What I do when I'm not building: communities, crypto, badminton, running and a few languages.",

  roles: [
    {
      id: "pukecast",
      org: "Pukecast",
      title: "Community & operations contributor · Contract, part-time",
      period: "~1 year",
      location: "Web3 marketing agency, Asia",
      points: [
        "Outreach and partner-meeting materials, as key support for external communications.",
        "Management support, and quick research on companies and KOLs to inform strategy.",
      ],
    },
    {
      id: "ethmumbai",
      org: "ETHMumbai",
      title: "Mitra Mandal member · Social media & operations",
      period: "Sep 2025 – Mar 2026",
      location: "Mumbai",
      href: "https://www.ethmumbai.in/",
      links: [
        { label: "ethmumbai.in", href: "https://www.ethmumbai.in/" },
        { label: "@ethmumbai on X", href: "https://x.com/ethmumbai" },
      ],
      image: {
        src: "/mitra-mandal.png",
        alt: "The ETHMumbai Mitra Mandal team portraits on ethmumbai.in, including Bhuvana",
        caption: "The ETHMumbai Mitra Mandal, as shown on ethmumbai.in.",
        width: 1875,
        height: 877,
      },
      points: [
        "Part of the Mitra Mandal, the community team behind ETHMumbai 2026, the Ethereum conference and hackathon held in March 2026.",
        "Ran its social media for about six months and worked on operations for the event.",
      ],
    },
    {
      id: "pr",
      org: "Dcodeblock",
      title: "Marketing & PR · Livestream and meetup host",
      period: "",
      location: "",
      gallery: [
        {
          src: "/screenshots/CLicks%20from%20the%20virtual%20host%20Day%203.png",
          alt: "Screenshot from the Dcodeblock livestream, day 3, with Bhuvana as virtual host",
          caption: "Day 3, as virtual host.",
          width: 1917,
          height: 882,
        },
        {
          src: "/screenshots/Day%204%20Virtual%20host%20at%20dcodeblock.png",
          alt: "Screenshot from the Dcodeblock livestream, day 4, with Bhuvana as virtual host",
          caption: "Day 4, as virtual host.",
          width: 903,
          height: 410,
        },
        {
          src: "/screenshots/Day%205%20of%20being%20a%20virtual%20host%20at%20DCodeBlock%20with%20Austin%20Griffith.png",
          alt: "Screenshot from the Dcodeblock livestream, day 5, hosting with Austin Griffith",
          caption: "Day 5, hosting with Austin Griffith.",
          width: 1901,
          height: 884,
        },
        {
          src: "/screenshots/Click%20from%20virtual%20host%20PR%20Dcodeblock%20day%205%20austin%20griffith.png",
          alt: "Screenshot from the Dcodeblock livestream, day 5, on camera during the PR segment with Austin Griffith",
          caption: "Day 5, on camera for PR.",
          width: 1914,
          height: 880,
        },
      ],
      points: [
        "Marketing and PR, and host of the livestreams and meetups.",
      ],
    },
    {
      id: "under25",
      org: "Under25",
      title: "Student volunteer & event coordinator · Intern",
      period: "Feb 2023 – Mar 2023",
      location: "Bengaluru",
      image: {
        src: "/certificates/under25-internship.png",
        alt: "Under 25 Summit 2023 internship completion certificate for Bhuvana K S, signed by the co-founders",
        caption: "Internship certificate",
        href: "/certificates/under25-internship.pdf",
        width: 910,
        height: 1287,
      },
      points: [
        "Marketing and campaigns for the Under25 Summit 2023, plus on-ground awareness and operations on summit days.",
        "Coordinated volunteer teams and logistics for large student events.",
      ],
    },
    {
      id: "warpspeed",
      org: "Warpspeed 2023, Devfolio",
      title: "Volunteer · On-ground operations",
      period: "May 2023",
      location: "Bengaluru",
      points: ["Volunteered on the ground for Devfolio's Warpspeed hackathon."],
    },
    {
      id: "event-ops",
      org: "Hackathons & industry events",
      title: "Operations volunteer · Multiple events",
      period: "",
      location: "",
      points: [
        "On-ground operations at multiple industry hackathons, keeping events running smoothly under pressure.",
      ],
    },
    {
      id: "hackaleague",
      org: "HackALeague 2.0",
      title: "Marketing coordinator",
      period: "Feb 2024",
      location: "Bengaluru",
      image: {
        src: "/photos/Marketing%20coordinator%20at%20Global%20Academy%20of%20Technology.JPG",
        alt: "Bhuvana as marketing coordinator at Global Academy of Technology",
        caption: "Marketing coordinator, Global Academy of Technology.",
        width: 6000,
        height: 4000,
      },
      points: [
        "Marketing coordinator for HackALeague 2.0, Global Academy of Technology's flagship hackathon.",
      ],
    },
  ],

  /** Instagram reels made with @ballerdailyinc and @startupdailyinc. */
  reels: [
    "https://www.instagram.com/reel/DH_EPSxoGwL/",
    "https://www.instagram.com/reel/DDE9BXgo7De/",
    "https://www.instagram.com/reel/DDpApp4TY0i/",
    "https://www.instagram.com/reel/Ddl2w_vTSmm/",
    "https://www.instagram.com/reel/DNxubvrUgTF/",
  ],

  communities: [
    {
      id: "crypto",
      name: "Crypto",
      role: "Community member and builder",
      detail:
        "Active through ETHMumbai's Mitra Mandal and SheFi Season 14, and building FinVoice, which settles split bills on-chain on Base.",
      href: "/marketing#ethmumbai",
    },
    {
      id: "blrbaddies",
      name: "@blrbaddies",
      role: "Co-founder",
      detail:
        "Co-founded and ran a badminton community for Bengaluru players.",
      href: "https://x.com/blrbaddies",
    },
  ],

  running: {
    intro:
      "A few 10Ks and 5Ks so far, most recently the Kodagu Monsoon Half Marathon 10K in 2024.",
    races: [
      {
        name: "Kodagu Monsoon Half Marathon",
        year: "2024",
        distance: "10K",
      },
    ],
  },

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
    items: ["PostgreSQL", "MongoDB", "Neo4j", "JanusGraph", "ChromaDB", "Pinecone"],
  },
  { group: "Tools", items: ["Git", "Gradio", "vis.js"] },
];

export const education = {
  photo: {
      src: "/photos/graduation%20day.jpg",
      alt: "Bhuvana on graduation day at Global Academy of Technology",
      caption: "Graduation day",
      width: 1536,
      height: 2048,
    },
  degree: "B.E. in Computer Science",
  school: "Global Academy of Technology",
  location: "Bengaluru",
  period: "2020 – 2024",
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
    href: "https://ieeexplore.ieee.org/abstract/document/10403588",
  },
];

export const achievements: {
  id: string;
  /** Where it is shown on the Engineering page. */
  group: "hackathon";
  title: string;
  detail: string;
  year: string;
  /** Scan of the certificate. Optional. */
  certificate?: { src: string; alt: string; width: number; height: number };
  /** A photo from the day. Optional. */
  photo?: { src: string; alt: string; width: number; height: number };
  /** More photos from the day, shown under the entry. Optional. */
  gallery?: { src: string; alt: string; width: number; height: number }[];
}[] = [
  {
    id: "hackathon-judge",
    group: "hackathon",
    title: "Hackathon judge and mentor",
    detail:
      "Invited to judge and mentor at hackathons, and to judge Dayananda Sagar University's Techflix two years running, Seasons 1 and 2, including the 24-hour La Casa De Code (Season 2) in February 2026.",
    year: "2024 – 2026",
    certificate: {
      src: "/certificates/dsu-techflix-judge.jpg",
      alt: "Certificate from Dayananda Sagar University recognising Bhuvana K S as a judge for the 24-hour internal hackathon La Casa De Code, 27th–28th February 2026",
      width: 1600,
      height: 1131,
    },
  },
  {
    id: "iqoo-hackathon",
    group: "hackathon",
    title: "Mentor and judge, iQOO hackathon grand finale",
    detail:
      "Mentored teams and judged at the grand finale of the iQOO hackathon, 9th to 11th October 2026.",
    year: "2026",
    photo: {
      src: "/photos/iqoo-hackathon-mentor.jpg",
      alt: "Bhuvana mentoring at the iQOO hackathon grand finale",
      width: 3879,
      height: 5818,
    },
  },
  {
    id: "hal-3",
    group: "hackathon",
    title: "Alumni judge, HackALeague 3.0",
    detail:
      "Went back to Global Academy of Technology as an alumni judge for HackALeague 3.0, February 2025.",
    year: "2025",
  },
  {
    id: "evolve-2024",
    group: "hackathon",
    title: "1st place, Evolve 2024",
    detail:
      "Won Evolve 2024, the internal company hackathon at Knowledge Lens, securing 1st place.",
    year: "2024",
    photo: {
      src: "/photos/evolve-2024-winner.jpg",
      alt: "Bhuvana with the winning team at Evolve 2024, the Knowledge Lens internal hackathon",
      width: 2000,
      height: 1334,
    },
  },
  {
    id: "college-hackathon",
    group: "hackathon",
    title: "1st place, College Hackathon",
    detail:
      "Built a complete front-end website in HTML and CSS, from scratch, on the clock.",
    year: "2021",
  },
];

export const nav: { label: string; href: string; external?: boolean }[] = [
  { label: "Engineering", href: "/work" },
  { label: "Marketing", href: "/marketing" },
  { label: "Side quests", href: "/side-quests" },
];
