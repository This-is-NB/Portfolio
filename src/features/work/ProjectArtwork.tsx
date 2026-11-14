import { ArrowUpRight, Sparkles } from "lucide-react";
import type { ProjectKind } from "./data/projects";
import Styles from "./WorkSection.module.scss";

export default function ProjectArtwork({ kind }: { kind: ProjectKind }) {
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

  const art = {
    browser: {
      label: "PYSURF / PRIVATE SESSION",
      lines: ["AD BLOCKING ENABLED", "ZOOM · PRIVATE MODE", "PYQTWEBENGINE"],
    },
    recommendation: {
      label: "PRODUCT MATCH / 10K+",
      lines: ["INGREDIENTS", "SIMILARITY", "RECOMMENDATIONS"],
    },
    "resume-parser": {
      label: "PROFILE MATCH / NLP",
      lines: ["EXPERIENCE", "SKILLS", "JOB DESCRIPTION"],
    },
    transcription: {
      label: "TRANSCRIPTION / QUEUED",
      lines: ["AUDIO → TEXT", "SPEAKER LABELS", "ASYNC WORKER"],
    },
    "computer-vision": {
      label: "VISION / REAL TIME",
      lines: ["DETECT", "CLASSIFY", "RECOGNIZE"],
    },
    "video-automation": {
      label: "SCRIPT → VIDEO",
      lines: ["SCENES", "VOICE + VISUALS", "EDIT / EXPORT"],
    },
  }[kind];

  return (
    <div className={`project-art ${Styles.artwork} ${Styles[`art-${kind}`]}`} aria-hidden="true">
      <div className={Styles.diagram}>
        <span className={Styles.diagramLabel}>{art.label}</span>
        <div className={Styles.diagramFlow}>
          {art.lines.map((line, index) => (
            <div className={Styles.diagramStep} key={line}>
              <span>{`0${index + 1}`}</span>{line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
