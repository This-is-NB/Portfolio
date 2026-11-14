import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
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
      <div className="project-topline">
        <span>{project.number} / {project.category}</span>
        <ArrowUpRight className={`project-arrow ${Styles.arrow}`} aria-hidden="true" />
      </div>
      <ProjectArtwork kind={project.kind} />
      <div className="project-copy">
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <p className="project-description">{project.description}</p>
        <div className="tag-list">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
    </article>
  );
}
