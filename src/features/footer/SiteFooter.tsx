import { ArrowUp, Sparkles } from "lucide-react";
import Styles from "./SiteFooter.module.scss";

export default function SiteFooter() {
  return (
    <footer className={`site-footer section-shell mx-auto ${Styles.footer}`}>
      <a className="footer-brand" href="#top" aria-label="Naman Bansal, back to top">
        nb<span>.</span>
      </a>
      <p>Designed and built with care <Sparkles aria-hidden="true" /> Bengaluru, India</p>
      <a href="#top">BACK TO TOP <ArrowUp aria-hidden="true" /></a>
      <span className="footer-year">© {new Date().getFullYear()} NAMAN BANSAL</span>
    </footer>
  );
}
