import { Sparkles } from "lucide-react";
import Styles from "./PrinciplesSection.module.scss";

const principles = ["MAKE IT WORK", "MAKE IT CLEAR", "MAKE IT LAST"];

export default function PrinciplesSection() {
  return (
    <div className={`principles-band ${Styles.band}`} aria-label="Engineering principles">
      <div className={Styles.track}>
        {[0, 1].map((copy) => (
          <div className={Styles.group} aria-hidden={copy === 1} key={copy}>
            {principles.map((principle) => (
              <span className={Styles.item} key={principle}>
                <Sparkles aria-hidden="true" />
                {principle}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
