import { useRef } from "react";
import { ArrowUpRight, Github, PanelsTopLeft } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Project } from "./data/projects";
import ProjectArtwork from "./ProjectArtwork";
import Styles from "./WorkSection.module.scss";

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const cardRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const xTo = gsap.quickTo(card, "rotationY", { duration: 0.45, ease: "power3" });
      const yTo = gsap.quickTo(card, "rotationX", { duration: 0.45, ease: "power3" });
      const artwork = card.querySelector<HTMLElement>(".project-art");
      if (artwork) {
        gsap.fromTo(
          artwork,
          { autoAlpha: 0.55, scale: 0.94, clipPath: "inset(5% 7% 5% 0)" },
          {
            autoAlpha: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              once: true,
            },
          },
        );
      }
      const onMove = (event: PointerEvent) => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        xTo(x * 7);
        yTo(y * -7);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      return () => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: cardRef },
  );

  return (
    <article
      className={`project-card ${Styles.card}`}
      data-reveal
      ref={cardRef}
    >
      <div className={`project-topline ${Styles.topline}`}>
        <span>{project.number} / {project.category}</span>
        <ArrowUpRight className={`project-arrow ${Styles.arrow}`} aria-hidden="true" />
      </div>
      <ProjectArtwork kind={project.kind} />
      <div className={`project-copy ${Styles.copy}`}>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <p className={`project-description ${Styles.description}`}>{project.description}</p>
        {project.status && <p className={Styles.status}>{project.status}</p>}
        <div className="tag-list">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className={Styles.projectLinks} aria-label={`${project.name} links`}>
          {project.links.demo
            ? <a href={project.links.demo} target="_blank" rel="noreferrer">Demo <ArrowUpRight aria-hidden="true" /></a>
            : <span>ADD DEMO LINK</span>}
          {project.links.source
            ? <a href={project.links.source} target="_blank" rel="noreferrer">Code <Github aria-hidden="true" /></a>
            : <span>ADD CODE LINK</span>}
          {project.links.caseStudy
            ? <a href={project.links.caseStudy} target="_blank" rel="noreferrer">Case study <PanelsTopLeft aria-hidden="true" /></a>
            : <span>ADD CASE STUDY</span>}
        </div>
      </div>
    </article>
  );
}
