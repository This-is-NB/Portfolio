import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Styles from "./ExperienceSection.module.scss";

const roles = [
  {
    period: "JAN 2026 — NOW",
    role: "Software Development Engineer II",
    company: "JPMorgan Chase & Co.",
    location: "Bengaluru, India",
    summary:
      "Technical lead and full-stack developer for DART-SEZ, an enterprise procurement and SEZ compliance workflow platform.",
    highlights: [
      "Led architecture and delivery of a modular platform with 12+ backend modules and configurable workflows for 6+ request types.",
      "Integrated enterprise systems for identity, documents, procurement, and compliance, with resilient API handling and audit trails.",
      "Built role-based React experiences and established Jenkins/Jules CI/CD pipelines; introduced AI-assisted onboarding tools.",
    ],
    markers: ["12+ modules", "6+ workflows", "5+ integrations"],
  },
  {
    period: "JUN 2023 — DEC 2025",
    role: "Software Development Engineer I",
    company: "JPMorgan Chase & Co.",
    location: "Bengaluru, India",
    summary:
      "Delivered full-stack products and backend improvements across Java/Spring services, React and Angular interfaces, databases, and AWS.",
    highlights: [
      "Reduced a data-processing job from 15–16 hours to 2–3 minutes through query optimization and asynchronous processing.",
      "Automated operational workflows with Python scripts, improving reported efficiency by 95%.",
      "Supported cloud deployments and CI/CD with AWS, Jenkins, Terraform, and Docker.",
    ],
    markers: ["15–16 hrs → 2–3 min", "95% efficiency gain"],
  },
  {
    period: "JAN 2023 — JUN 2023",
    role: "Software Development Engineer Intern",
    company: "JPMorgan Chase & Co.",
    location: "Bengaluru, India",
    summary:
      "Started my enterprise software engineering journey, contributing to full-stack delivery and engineering workflows.",
    highlights: [
      "Worked across Java, Spring Boot, React/Angular, SQL, and AWS in production-oriented teams.",
      "Contributed to testing, code reviews, debugging, and application delivery.",
    ],
    markers: ["Full stack", "Enterprise engineering"],
  },
  {
    period: "JUN 2022 — DEC 2022",
    role: "Computer Vision & NLP Junior Data Scientist Intern",
    company: "ProductizeTech",
    location: "Mumbai, India",
    summary:
      "Built applied ML and NLP tools for product discovery, recruitment, and media processing.",
    highlights: [
      "Created ingredient-based recommendations across 10,000+ products and an ATS parser for 1,000+ resumes.",
      "Built asynchronous video transcription and speaker classification using AWS Transcribe, S3, Redis-queue, Celery, and Docker.",
    ],
    markers: ["Computer vision", "NLP", "Applied ML"],
  },
  {
    period: "MAY 2021 — AUG 2021",
    role: "Summer Intern",
    company: "LinuxWorld Informatics Pvt. Ltd.",
    location: "Jaipur, India",
    summary:
      "Explored machine learning, computer vision, and systems programming while leading a five-person learner team.",
    highlights: [
      "Built object-detection, number-plate recognition, and sign-language recognition prototypes.",
      "Developed a socket-programming video-calling server and worked with OpenCV, YOLO, CNNs, and Tesseract OCR.",
    ],
    markers: ["Computer vision", "Team of 5"],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        `.${Styles.progress}`,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: `.${Styles.timeline}`,
            start: "top center",
            end: "bottom center",
            scrub: 0.6,
          },
        },
      );

      gsap.utils
        .toArray<HTMLElement>(`.${Styles.entry}`, sectionRef.current)
        .forEach((entry) => {
          gsap.fromTo(
            entry,
            { autoAlpha: 0, y: 34 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: entry,
                start: "top 84%",
                once: true,
              },
            },
          );
        });
    },
    { scope: sectionRef },
  );

  return (
    <section
      className={`section-shell section-pad ${Styles.section}`}
      id="experience"
      aria-labelledby="experience-title"
      ref={sectionRef}
    >
      <div className={`section-heading ${Styles.heading}`}>
        <div>
          <p className="eyebrow section-kicker"><span>02</span> THE JOURNEY SO FAR</p>
          <h2 id="experience-title">Built over time.<br /><span>Made to matter.</span></h2>
        </div>
        <p className="section-aside">
          From early computer-vision experiments to leading enterprise full-stack
          delivery, each chapter taught me to build with more care and ownership.
        </p>
      </div>

      <div className={Styles.timeline}>
        <div className={Styles.rail} aria-hidden="true">
          <span className={Styles.track} />
          <span className={Styles.progress} />
        </div>
        <ol className={Styles.entries}>
          {roles.map((item, index) => (
            <li className={Styles.entry} key={`${item.company}-${item.period}`}>
              <span className={Styles.node} aria-hidden="true">{`0${index + 1}`}</span>
              <article className={Styles.card}>
                <div className={Styles.cardTop}>
                  <p className="eyebrow">{item.period}</p>
                  <span>{item.location}</span>
                </div>
                <h3>{item.role}</h3>
                <p className={Styles.company}>{item.company}</p>
                <p className={Styles.summary}>{item.summary}</p>
                <ul>
                  {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
                <div className={Styles.markers}>
                  {item.markers.map((marker) => <span key={marker}>{marker}</span>)}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
