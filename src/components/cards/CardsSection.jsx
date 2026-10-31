import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { smoother } from "../Navbar";
import Skills from "./Skills";
import Certificates from "./Certificates";
import "./cards.css";

const CardsSection = () => {
  useEffect(() => {
    // In-page links (#cards-projects, #cards-certificates, #top) go through ScrollSmoother
    const root = document.getElementById("cards-root");
    if (!root) return;

    const onClick = (e) => {
      const anchor = e.target.closest("a");
      const href = anchor && anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      e.preventDefault();
      if (!smoother) return;
      if (href === "#" || href === "#top") {
        smoother.scrollTo(0, true);
        return;
      }
      const target = root.querySelector(href);
      if (target) smoother.scrollTo(target, true, "top top");
    };
    root.addEventListener("click", onClick);

    // Re-measure pins/triggers once layout + the photo have settled
    const t = setTimeout(() => ScrollTrigger.refresh(), 800);
    const img = root.querySelector("img");
    const onImg = () => ScrollTrigger.refresh();
    if (img) img.addEventListener("load", onImg);

    return () => {
      clearTimeout(t);
      root.removeEventListener("click", onClick);
      if (img) img.removeEventListener("load", onImg);
    };
  }, []);

  return (
    <div
      id="cards-root"
      className="cards-root relative w-full overflow-x-clip bg-white text-slate-900 selection:bg-blue-600 selection:text-white"
    >
      <Skills />
      <Certificates />
    </div>
  );
};

export default CardsSection;
