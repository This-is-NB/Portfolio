export type Project = {
  number: string;
  category: string;
  kind: "workflow" | "performance" | "machine-learning";
  name: string;
  summary: string;
  description: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    number: "01",
    category: "PLATFORM ENGINEERING",
    kind: "workflow",
    name: "DART-SEZ",
    summary: "Enterprise workflow platform",
    description:
      "Helping simplify complex operational workflows through reliable software and thoughtful automation.",
    tags: ["Platform", "Automation", "Enterprise"],
  },
  {
    number: "02",
    category: "PERFORMANCE",
    kind: "performance",
    name: "From hours to minutes",
    summary: "Database performance improvement",
    description:
      "Reworked a slow data-processing path, taking a job from 15–16 hours down to just 2–3 minutes.",
    tags: ["Databases", "Performance"],
  },
  {
    number: "03",
    category: "MACHINE LEARNING",
    kind: "machine-learning",
    name: "ML Made Easy",
    summary: "Making machine learning approachable",
    description:
      "A learning project that reached the Walmart Converge finals and was featured at IIT Guwahati TechExpo.",
    tags: ["Machine learning", "Education", "Finalist"],
  },
];
