import { ArrowUpRight } from "lucide-react";
import Styles from "./RecognitionSection.module.scss";

const recognition = [
  { number: "01", title: "AWS DeepRacer", detail: "2nd place, India" },
  { number: "02", title: "Code for Good", detail: "Winner & team lead, 2022" },
  { number: "03", title: "JPMC Gremmy", detail: "Recognized contributor" },
];

export default function RecognitionSection() {
  return (
    <section className={`recognition-section section-shell mx-auto ${Styles.section}`} aria-label="Recognition">
      <p className="eyebrow section-kicker" data-reveal><span>03</span> OUTSIDE THE DAY JOB</p>
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
