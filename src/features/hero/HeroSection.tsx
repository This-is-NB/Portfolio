import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import PortraitStage, { type CharacterMotion } from "../../components/PortraitStage";
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
  const motion = useRef<CharacterMotion>({
    wave: 0,
    walk: 0,
    run: 0,
    sit: 0,
    moonwalk: 0,
    turn: 0,
  });

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

      const allowedPoses = new Set<keyof CharacterMotion>([
        "wave",
        "walk",
        "run",
        "sit",
        "moonwalk",
      ]);
      gsap.utils
        .toArray<HTMLElement>("[data-pose]", heroRef.current)
        .forEach((beat) => {
          const pose = beat.dataset.pose as keyof CharacterMotion;
          if (!allowedPoses.has(pose)) return;
          const active: Partial<CharacterMotion> =
            pose === "moonwalk"
              ? { moonwalk: 1, turn: 0.62 }
              : { [pose]: 1 };
          const neutral: Partial<CharacterMotion> =
            pose === "moonwalk"
              ? { moonwalk: 0, turn: 0 }
              : { [pose]: 0 };

          const beatTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: beat,
              start: "top center",
              end: "bottom center",
              scrub: 0.7,
            },
          });
          beatTimeline
            .to(motion.current, { ...neutral, duration: 0.16 }, 0)
            .to(
              motion.current,
              { ...active, duration: 0.3, ease: "power2.out" },
              0.2,
            )
            .to(motion.current, { ...active, duration: 0.2 }, 0.5)
            .to(
              motion.current,
              { ...neutral, duration: 0.3, ease: "power2.inOut" },
              0.7,
            );
        });

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
      className={`hero section-shell mx-auto ${Styles.hero} ${Styles.scrollStory}`}
      aria-labelledby="hero-title"
      ref={heroRef}
    >
      <div className={`hero-copy ${Styles.copy}`}>
        <p className={`eyebrow ${Styles.eyebrow}`}>
          <span className="availability-dot" /> SOFTWARE ENGINEER
          <span className="eyebrow-divider">/</span> BENGALURU, INDIA
        </p>
        <h2 id="hero-greeting" className={Styles.title}>
          <AnimatedName name="Hi, I'm" />
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
          <a className="text-link" href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noreferrer">
            Resume <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <div className={`hero-meta ${Styles.meta}`}>
          <span>NOW AT <strong>JPMORGAN CHASE</strong></span>
          <span className="meta-separator" aria-hidden="true" />
          <span>SCROLL TO EXPLORE <ArrowDown aria-hidden="true" /></span>
        </div>
      </div>
      <PortraitStage motion={motion} />
      <div className={Styles.story} aria-label="Scroll through a few things I like to build">
        <article className={Styles.storyBeat} data-pose="walk" data-reveal>
          <span className={Styles.storyIndex}>01 / FIND THE RHYTHM</span>
          <h3>Walk before<br />you run.</h3>
          <p>Start with the real problem. Make the smallest useful thing. Then keep moving.</p>
        </article>
        <article className={Styles.storyBeat} data-pose="run" data-reveal>
          <span className={Styles.storyIndex}>02 / PICK UP SPEED</span>
          <h3>Make it<br />move.</h3>
          <p>Good engineering turns slow, fragile workflows into something people can rely on.</p>
        </article>
        <article className={Styles.storyBeat} data-pose="sit" data-reveal>
          <span className={Styles.storyIndex}>03 / MAKE ROOM</span>
          <h3>Pause.<br />Think it through.</h3>
          <p>Clarity comes from stepping back, asking better questions, and designing for the long run.</p>
        </article>
        <article className={Styles.storyBeat} data-pose="moonwalk" data-reveal>
          <span className={Styles.storyIndex}>04 / TAKE THE UNEXPECTED ROUTE</span>
          <h3>Build with<br />a little wonder.</h3>
          <p>From enterprise systems to experiments, I like finding a more human way through the problem.</p>
          <a className={Styles.storyLink} href="#work">
            See what I have been working on <ArrowDownRight aria-hidden="true" />
          </a>
        </article>
      </div>
      <a className={`scroll-cue ${Styles.scrollCue}`} href="#work">
        <span className={Styles.scrollIndicator} /> SCROLL TO EXPLORE
      </a>
    </section>
  );
}
