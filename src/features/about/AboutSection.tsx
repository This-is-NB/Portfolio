import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import Styles from "./AboutSection.module.scss";

const skillGroups = [
  {
    name: "LANGUAGES",
    skills: ["Java", "Python", "C/C++", "JavaScript", "TypeScript", "SQL"],
  },
  {
    name: "FRONTEND",
    skills: ["React", "Angular", "React Query", "Zustand", "HTML/CSS"],
  },
  {
    name: "BACKEND",
    skills: ["Spring Boot", "Spring WebFlux", "REST APIs", "WebClient", "Flux", "CompletableFuture", "JDBC", "Hibernate", "Hibernate Envers", "Camunda BPMN", "Flask"],
  },
  {
    name: "DATABASES",
    skills: ["MySQL", "PostgreSQL", "AWS Aurora PostgreSQL", "MongoDB"],
  },
  {
    name: "CLOUD & DEVOPS",
    skills: ["AWS EC2", "S3", "Lambda", "RDS", "Jenkins", "Terraform", "Docker", "CI/CD", "Git", "Postman", "IntelliJ"],
  },
  {
    name: "ARCHITECTURE & ENGINEERING",
    skills: ["Microservices", "Hexagonal architecture", "Workflow automation", "RBAC", "Audit trails", "Schema management", "API integration", "Async programming", "Code reviews"],
  },
  {
    name: "TESTING",
    skills: ["JUnit", "Mockito", "Jest"],
  },
  {
    name: "ML & SPECIALIZED",
    skills: ["Computer vision", "NLP", "OpenCV", "YOLO", "CNN", "Tesseract OCR", "Cosine similarity", "PyQt5", "PyQtWebEngine", "PyCaret", "Streamlit", "AutoVIZ", "AWS Transcribe", "Redis-queue", "Celery", "Socket programming"],
  },
];

export default function AboutSection() {
  return (
    <section
      className={`about-section section-shell section-pad mx-auto ${Styles.section}`}
      id="about"
      aria-labelledby="about-title"
    >
      <div className={`about-intro ${Styles.intro}`} data-reveal>
        <p className="eyebrow section-kicker"><span>03</span> A LITTLE ABOUT ME</p>
        <h2 id="about-title">Curious by nature.<br /><span>Engineer by craft.</span></h2>
        <p>
          I’m a software engineer in Bengaluru with 3+ years of experience building
          enterprise full-stack systems. I enjoy taking messy, time-consuming
          problems and turning them into clear, maintainable software—from
          workflow platforms and backend performance to useful developer tools.
        </p>
        <p>
          I care about thoughtful architecture, measurable outcomes, and making
          complex systems easier for the people who depend on them.
        </p>
        <a
          className={`text-link ${Styles.resumeLink}`}
          href={`${import.meta.env.BASE_URL}resume.pdf`}
          target="_blank"
          rel="noreferrer"
        >
          View my resume <ArrowDownToLine aria-hidden="true" />
        </a>
        <a className="text-link" href="https://www.linkedin.com/in/namanbansa1" target="_blank" rel="noreferrer">
          Connect on LinkedIn <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className={`about-details ${Styles.details}`} data-reveal>
        <div className="skills-block">
          <p className="eyebrow detail-label">WHAT I WORK WITH</p>
          <div className={Styles.skillGroups}>
            {skillGroups.map((group) => (
              <div className={Styles.skillGroup} key={group.name}>
                <p className="eyebrow">{group.name}</p>
                <div className="skill-chips">
                  {group.skills.map((skill) => (
                    <span className={Styles.skill} key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="education-block">
          <p className="eyebrow detail-label">EDUCATION</p>
          <div className="education-item">
            <h3>Thapar Institute of Engineering &amp; Technology</h3>
            <p>B.E. Electronics Instrumentation &amp; Control Engineering <span>·</span> 2019–2023 <span>·</span> CGPA 8.14</p>
          </div>
          <div className={Styles.earlierEducation}>
            <p>S.D. Public School, Narwana <span>·</span> Class XII, 75.67% (2018–2019)</p>
            <p>Maharaja Agarsain Public School, New Delhi <span>·</span> Class X, 8.8 CGPA (2016–2017)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
