import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import Styles from "./ContactSection.module.scss";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.visibilityState === "hidden"
      ) {
        return;
      }
      const links = gsap.utils.toArray<HTMLElement>(
        `.${Styles.contactLink}`,
        sectionRef.current,
      );
      gsap.fromTo(
        links,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      className={`contact-section section-shell mx-auto ${Styles.section}`}
      id="contact"
      aria-labelledby="contact-title"
      ref={sectionRef}
    >
      <div className={`contact-orbit ${Styles.orbit}`} aria-hidden="true">
        <span>LET’S BUILD SOMETHING GOOD</span>
      </div>
      <div className={`contact-stamp ${Styles.stamp}`} aria-hidden="true">
        <span>AVAILABLE<br />FOR A CHAT</span><ArrowUpRight />
      </div>
      <div className={`contact-copy ${Styles.copy}`} data-reveal>
        <p className="eyebrow"><span>05</span> HAVE A GOOD ONE IN MIND?</p>
        <h2 id="contact-title">Let’s make<br /><span>it happen.</span></h2>
        <a className={`contact-email ${Styles.email} ${Styles.contactLink}`} href="mailto:namanbansal7274@gmail.com">
          namanbansal7274@gmail.com <ArrowUpRight aria-hidden="true" />
        </a>
        <div className="contact-links">
          <a className={Styles.contactLink} href="https://www.linkedin.com/in/namanbansa1" target="_blank" rel="noreferrer">
            LinkedIn <Linkedin aria-hidden="true" />
          </a>
          <a className={Styles.contactLink} href="https://github.com/This-is-NB" target="_blank" rel="noreferrer">
            GitHub <Github aria-hidden="true" />
          </a>
          <a className={Styles.contactLink} href="tel:+917657972048">+91 76579 72048</a>
        </div>
      </div>
    </section>
  );
}
