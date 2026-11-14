import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Styles from "./SiteHeader.module.scss";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${Styles.header}`}>
      <a className="brand" href="#top" aria-label="Naman Bansal, home">
        <span className="brand-mark">nb<span>.</span></span>
        <span className="brand-caption">SOFTWARE<br />ENGINEER</span>
      </a>
      <button
        className={`menu-toggle ${Styles.menuToggle}`}
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-nav"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span className="sr-only">Toggle navigation</span>
      </button>
      <nav
        className={`primary-nav ${Styles.nav}${menuOpen ? ` is-open ${Styles.navOpen}` : ""}`}
        id="primary-nav"
        aria-label="Main navigation"
      >
        <a href="#work" onClick={closeMenu}>Work</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
        <a className={`nav-link ${Styles.talkLink}`} href="mailto:namanbansal7274@gmail.com">
          Let’s talk <ArrowUpRight aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
