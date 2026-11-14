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
          <h2 id="work-title">A few things<br /><span>built to matter.</span></h2>
        </div>
        <p className="section-aside">
          A tour through the systems, tools, and experiments I have made useful.
          Each one started with a real problem to solve.
        </p>
      </div>
      <div className={`project-grid ${Styles.projects}`}>
        {projects.map((project) => (
          <ProjectCard project={project} key={project.number} />
        ))}
      </div>
      <a className={Styles.allWork} href="mailto:namanbansal7274@gmail.com">
        Want a link or more context? Get in touch <ArrowUpRight aria-hidden="true" />
      </a>
      <p className={Styles.editHint}>Project links can be added in <code>src/features/work/data/projects.ts</code>.</p>
    </section>
  );
}
