import { ArrowUpRight } from "lucide-react";
import Styles from "./AboutSection.module.scss";

const skills = [
  "Java",
  "Python",
  "SQL",
  "Spring",
  "Backend systems",
  "Data workflows",
  "Automation",
  "Machine learning",
];

export default function AboutSection() {
  return (
    <section
      className={`about-section section-shell section-pad mx-auto ${Styles.section}`}
      id="about"
      aria-labelledby="about-title"
    >
      <div className={`about-intro ${Styles.intro}`} data-reveal>
        <p className="eyebrow section-kicker"><span>02</span> A LITTLE ABOUT ME</p>
        <h2 id="about-title">Curious by nature.<br /><span>Engineer by craft.</span></h2>
        <p>
          I enjoy taking messy, time-consuming problems and turning them into
          clear, maintainable software. My work spans backend systems, databases,
          and automation—with a steady focus on the people who use them.
        </p>
        <a className="text-link" href="https://www.linkedin.com/in/namanbansa1" target="_blank" rel="noreferrer">
          More about my journey <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className={`about-details ${Styles.details}`} data-reveal>
        <div className="experience-block">
          <p className="eyebrow detail-label">EXPERIENCE</p>
          <div className="experience-item">
            <span className="experience-date">JAN 2023 — NOW</span>
            <div>
              <h3>JPMorgan Chase</h3>
              <p>Software Development Engineer II <span>·</span> Jan 2026 — now</p>
              <p>Software Development Engineer I <span>·</span> Jan 2023 — Dec 2025</p>
            </div>
            <ArrowUpRight className="experience-mark" aria-hidden="true" />
          </div>
        </div>
        <div className="skills-block">
          <p className="eyebrow detail-label">TOOLS OF THE TRADE</p>
          <div className="skill-chips">
            {skills.map((skill) => (
              <span
                className={Styles.skill}
                data-reveal
                key={skill}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="education-block">
          <p className="eyebrow detail-label">EDUCATION</p>
          <div className="education-item">
            <h3>Thapar Institute of Engineering &amp; Technology</h3>
            <p>B.E. Electronics Instrumentation &amp; Control Engineering <span>·</span> CGPA 8.14</p>
          </div>
        </div>
      </div>
    </section>
  );
}
