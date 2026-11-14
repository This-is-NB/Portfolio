import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import SiteHeader from "../../features/navigation/SiteHeader";
import HeroSection from "../../features/hero/HeroSection";
import PrinciplesSection from "../../features/principles/PrinciplesSection";
import WorkSection from "../../features/work/WorkSection";
import ExperienceSection from "../../features/experience/ExperienceSection";
import AboutSection from "../../features/about/AboutSection";
import RecognitionSection from "../../features/recognition/RecognitionSection";
import ContactSection from "../../features/contact/ContactSection";
import SiteFooter from "../../features/footer/SiteFooter";
import Styles from "./HomePage.module.scss";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.visibilityState === "hidden"
      ) {
        return;
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]", pageRef.current).forEach(
        (element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 38, rotateX: -4, transformOrigin: "50% 100%" },
            {
              autoAlpha: 1,
              y: 0,
              rotateX: 0,
              duration: 0.9,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            },
          );
        },
      );
    },
    { scope: pageRef },
  );

  return (
    <div className={Styles.page} ref={pageRef}>
      <SiteHeader />
      <main id="top">
        <HeroSection />
        <PrinciplesSection />
        <WorkSection />
        <ExperienceSection />
        <AboutSection />
        <RecognitionSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
