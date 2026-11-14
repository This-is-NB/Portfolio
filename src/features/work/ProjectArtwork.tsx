import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Project } from "./data/projects";
import Styles from "./WorkSection.module.scss";

export default function ProjectArtwork({ kind }: { kind: Project["kind"] }) {
  if (kind === "workflow") {
    return (
      <div className={`project-art dart-art ${Styles.artwork}`} aria-hidden="true">
        <div className={`art-window ${Styles.window}`}>
          <span className="window-dot" /><span className="window-dot" /><span className="window-dot" />
          <div className="art-window-title">DART<span> / </span>SEZ</div>
          <div className="art-row art-row-long" /><div className="art-row art-row-mid" /><div className="art-row art-row-short" />
          <div className="art-check">✓</div>
        </div>
        <span className="art-note">WORKFLOW / 001</span>
      </div>
    );
  }
  if (kind === "performance") {
    return (
      <div className={`project-art speed-art ${Styles.artwork}`} aria-hidden="true">
        <div className="speed-label">QUERY<br />OPTIMIZATION</div>
        <div className="speed-before"><span>15–16</span><small>HOURS</small></div>
        <div className="speed-line" />
        <div className="speed-after"><span>2–3</span><small>MINUTES</small></div>
        <ArrowUpRight className="speed-spark" />
      </div>
    );
  }
  if (kind === "machine-learning") {
    return (
      <div className={`project-art ml-art ${Styles.artwork}`} aria-hidden="true">
        <div className="ml-orbit ml-orbit-a" /><div className="ml-orbit ml-orbit-b" />
        <div className="ml-center">ML<span>+</span></div>
        <div className="ml-chip ml-chip-one">LEARN</div><div className="ml-chip ml-chip-two">BUILD</div><div className="ml-chip ml-chip-three">SHARE</div>
        <Sparkles className="ml-star" />
      </div>
    );
  }
  throw new Error(`Unknown project artwork kind: ${kind satisfies never}`);
}
