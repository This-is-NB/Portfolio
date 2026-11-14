export type ProjectKind =
  | "workflow"
  | "performance"
  | "machine-learning"
  | "browser"
  | "recommendation"
  | "resume-parser"
  | "transcription"
  | "computer-vision"
  | "video-automation";

export type Project = {
  number: string;
  category: string;
  kind: ProjectKind;
  name: string;
  summary: string;
  description: string;
  tags: string[];
  status?: string;
  links: {
    demo?: string;
    source?: string;
    caseStudy?: string;
  };
};

export const projects: Project[] = [
  {
    number: "01",
    category: "ENTERPRISE PLATFORM",
    kind: "workflow",
    name: "DART-SEZ",
    summary: "Procurement & SEZ compliance workflows",
    description:
      "Led architecture and full-stack delivery of a configurable procurement and compliance platform, with 12+ modular backend areas, Camunda approvals for 6+ request types, audit trails, and enterprise-system integrations.",
    tags: ["Java 21", "Spring Boot", "React", "Camunda BPMN", "AWS"],
    links: {},
  },
  {
    number: "02",
    category: "PERFORMANCE ENGINEERING",
    kind: "performance",
    name: "From hours to minutes",
    summary: "Database and async workflow optimization",
    description:
      "Optimized a production data-processing path from 15–16 hours to 2–3 minutes using query tuning, bulk operations, and asynchronous processing.",
    tags: ["PostgreSQL", "WebClient", "Flux", "CompletableFuture"],
    links: {},
  },
  {
    number: "03",
    category: "MACHINE LEARNING",
    kind: "machine-learning",
    name: "ML Made Easy",
    summary: "No-code machine-learning workbench",
    description:
      "An interactive app for preprocessing and visualizing data, training models, and tuning algorithms without requiring a statistics or ML background.",
    tags: ["Python", "PyCaret", "Streamlit", "AutoVIZ"],
    status: "Walmart Converge 2022 finalist · IIT Guwahati TechExpo feature",
    links: { demo: "https://youtu.be/_Y4ATp5O69s?t=14390" },
  },
  {
    number: "04",
    category: "DESKTOP APPLICATION",
    kind: "browser",
    name: "PySurf",
    summary: "A lightweight custom web browser",
    description:
      "Built a Python desktop browser with real-time ad blocking, private browsing, dynamic zoom controls, and a lightweight interface.",
    tags: ["Python", "PyQt5", "PyQtWebEngine"],
    links: {},
  },
  {
    number: "05",
    category: "RECOMMENDATION SYSTEM",
    kind: "recommendation",
    name: "Product Preference Engine",
    summary: "Ingredient-based product discovery",
    description:
      "Applied cosine similarity to a catalog of 10,000+ products to recommend items based on their ingredients.",
    tags: ["Python", "Cosine Similarity", "NLP"],
    links: {},
  },
  {
    number: "06",
    category: "NLP / RECRUITMENT",
    kind: "resume-parser",
    name: "ATS & Resume Parser",
    summary: "Resume matching at scale",
    description:
      "Parsed, categorized, and summarized resumes, matching more than 1,000 candidate profiles to job descriptions.",
    tags: ["Python", "NLTK", "spaCy", "NLP"],
    links: {},
  },
  {
    number: "07",
    category: "MEDIA AUTOMATION",
    kind: "transcription",
    name: "Video transcription & speaker classification",
    summary: "An asynchronous media-processing pipeline",
    description:
      "Combined transcription and speaker classification with queued processing and containerized services for scalable media workflows.",
    tags: ["AWS Transcribe", "S3", "Redis-queue", "Celery", "Docker"],
    links: {},
  },
  {
    number: "08",
    category: "COMPUTER VISION",
    kind: "computer-vision",
    name: "Vision & socket-programming projects",
    summary: "Recognition, detection, and real-time communication",
    description:
      "Prototyped YOLO/CNN object detection, ANPR with Tesseract OCR, sign-language recognition, and a socket-programming video-calling server.",
    tags: ["OpenCV", "YOLO", "CNN", "Tesseract OCR", "Sockets"],
    links: {},
  },
  {
    number: "09",
    category: "PERSONAL PROJECT · IN PROGRESS",
    kind: "video-automation",
    name: "AI Video Generator",
    summary: "Structured scripts into finished videos",
    description:
      "An in-progress automation concept that turns structured JSON scripts into animated, narrated videos with researched imagery, overlays, transitions, and a DaVinci Resolve editing workflow.",
    tags: ["JSON", "Video automation", "DaVinci Resolve"],
    status: "In progress",
    links: {},
  },
];
