import { ArrowUpRight } from "lucide-react";
import Styles from "./RecognitionSection.module.scss";

const recognition = [
  { number: "01", title: "Engineering impact", detail: "Recognized for engineering performance & AI adoption, 2024–2026" },
  { number: "02", title: "JPMC Gremmy Award", detail: "Fastest and most successful project go-live, 2023" },
  { number: "03", title: "AWS DeepRacer India", detail: "2nd rank · represented JPMC at AWS Global Summit, 2023" },
  { number: "04", title: "JPMC Code for Good", detail: "Winner · team leader, 2022" },
  { number: "05", title: "Walmart Converge", detail: "Top 3 finalist, 2022" },
  { number: "06", title: "IIT Guwahati TechExpo", detail: "Top 20 finalist, 2022" },
  { number: "07", title: "TechGig Code Gladiator", detail: "Top finalist, 2022" },
  { number: "08", title: "InterviewBit", detail: "Global leaderboard rank 460" },
];

export default function RecognitionSection() {
  return (
    <section className={`recognition-section section-shell mx-auto ${Styles.section}`} aria-label="Recognition">
      <p className="eyebrow section-kicker" data-reveal><span>04</span> OUTSIDE THE DAY JOB</p>
      <div className="recognition-row">
        {recognition.map((item) => (
          <div className={Styles.item} data-reveal key={item.number}>
            <span className="recognition-icon">{item.number}</span>
            <p><strong>{item.title}</strong><br />{item.detail}</p>
            <ArrowUpRight aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}
