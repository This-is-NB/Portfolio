import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import PortraitStage from "../../components/PortraitStage";
import Styles from "./HeroSection.module.scss";

const firstName = "Naman";
const lastName = "Bansal";


function AnimatedName({ name, className }: { name: string; className?: string }) {
  return (
    <span className={className} aria-label={name}>
      {Array.from(name).map((letter, index) => (
        <span
          aria-hidden="true"
          className={Styles.letter}
          key={`${letter}-${index}`}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.visibilityState === "hidden"
      ) {
        return;
      }
      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
      timeline
        .fromTo(
          `.${Styles.eyebrow}`,
          { autoAlpha: 0, y: 20, letterSpacing: "0.35em" },
          { autoAlpha: 1, y: 0, letterSpacing: "0.19em", duration: 0.8 },
        )
        .fromTo(
          `.${Styles.letter}`,
          { yPercent: 120, rotateX: -75, autoAlpha: 0 },
          {
            yPercent: 0,
            rotateX: 0,
            autoAlpha: 1,
            duration: 1.15,
            stagger: { each: 0.045, from: "start" },
          },
          "-=0.4",
        )
        .fromTo(
          `.${Styles.copyLine}`,
          { y: 24, autoAlpha: 0, filter: "blur(8px)" },
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.12,
          },
          "-=0.55",
        )
        .fromTo(
          `.${Styles.actions}`,
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7 },
          "-=0.35",
        )
        .fromTo(
          `.${Styles.meta}`,
          { autoAlpha: 0, x: -18 },
          { autoAlpha: 1, x: 0, duration: 0.65 },
          "-=0.25",
        );

      gsap.to(`.${Styles.scrollIndicator}`, {
        x: 12,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: heroRef },
  );

  return (
    <section
      className={`hero section-shell mx-auto ${Styles.hero}`}
      aria-labelledby="hero-title"
      ref={heroRef}
    >
      <div className={`hero-copy ${Styles.copy}`}>
        <p className={`eyebrow ${Styles.eyebrow}`}>
          <span className="availability-dot" /> SOFTWARE ENGINEER
          <span className="eyebrow-divider">/</span> BENGALURU, INDIA
        </p>
        <h2 id="hero-title" className={Styles.title}>
          <AnimatedName name="Hi,&nbsp; I'm" />
          <br />
        </h2>
        <h1 id="hero-title" className={Styles.title}>
          <AnimatedName name={firstName} />
          <br />
          <AnimatedName name={lastName} className={Styles.lastName} />
          <span className={`title-period ${Styles.titlePeriod}`}>.</span>
        </h1>
        <p className={`hero-role ${Styles.copyLine}`}>
          Software engineer<br />
          building <span>better systems.</span>
        </p>
        <p className={`hero-intro ${Styles.copyLine}`}>
          I turn complex, time-consuming problems into dependable software that
          makes a measurable difference.
        </p>
        <div className={`hero-actions ${Styles.actions}`}>
          <a className="button button-dark" href="#work">
            Explore my work <ArrowDownRight aria-hidden="true" />
          </a>
          <a className="text-link" href="mailto:namanbansal7274@gmail.com">
            Say hello <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <div className={`hero-meta ${Styles.meta}`}>
          <span>NOW AT <strong>JPMORGAN CHASE</strong></span>
          <span className="meta-separator" aria-hidden="true" />
          <span>SCROLL TO EXPLORE <ArrowDown aria-hidden="true" /></span>
        </div>
      </div>
      <PortraitStage />
      <a className={`scroll-cue ${Styles.scrollCue}`} href="#work">
        <span className={Styles.scrollIndicator} /> SCROLL TO EXPLORE
      </a>
    </section>
  );
}
