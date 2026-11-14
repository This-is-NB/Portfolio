import { ArrowUpRight } from "lucide-react";
import { projects } from "./data/projects";
import ProjectCard from "./ProjectCard";
import Styles from "./WorkSection.module.scss";

export default function WorkSection() {
  return (
    <section
      className={`work-section section-shell section-pad mx-auto ${Styles.section}`}
      id="work"
      aria-labelledby="work-title"
    >
      <div className={`section-heading ${Styles.heading}`} data-reveal>
        <div>
          <p className="eyebrow section-kicker"><span>01</span> SELECTED WORK</p>
          <h2 id="work-title">Useful things,<br /><span>built with intent.</span></h2>
        </div>
        <p className="section-aside">
          A few examples of making software work harder, faster, and more clearly.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.number} />
        ))}
      </div>
      <a className={Styles.allWork} href="mailto:namanbansal7274@gmail.com">
        Have a project in mind? <ArrowUpRight aria-hidden="true" />
      </a>
    </section>
  );
}
