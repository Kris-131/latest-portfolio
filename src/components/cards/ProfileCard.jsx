import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import pictureImg from "../../assets/Portfolio/krish.jpg";
import "./cards.css";

const ProfileCard = () => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    const xTilt = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3.out" });
    const yTilt = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3.out" });
    const glareX = gsap.quickTo(glare, "x", { duration: 0.3, ease: "power2.out" });
    const glareY = gsap.quickTo(glare, "y", { duration: 0.3, ease: "power2.out" });

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      xTilt(((x - cx) / cx) * 14);
      yTilt(-((y - cy) / cy) * 14);
      glareX(x - cx);
      glareY(y - cy);
    };
    const onEnter = () => gsap.to(glare, { opacity: 1, duration: 0.3 });
    const onLeave = () => {
      xTilt(0);
      yTilt(0);
      gsap.to(glare, { opacity: 0, duration: 0.3 });
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="cards-root profile-card-wrap flex justify-center perspective-[1200px]">
      <div
        ref={cardRef}
        className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 via-sky-400/20 to-indigo-500/20 rounded-[2.8rem] blur-3xl opacity-70 group-hover:opacity-100 animate-pulse duration-1000 pointer-events-none"></div>
        <div className="p-2.5 rounded-[2.4rem] bg-slate-100 border border-slate-200 shadow-[0_25px_60px_rgba(194,164,255,0.12)]">
          <div className="relative w-[280px] sm:w-[320px] md:w-[340px] p-3 bg-slate-50 rounded-[calc(2.4rem-0.625rem)] border border-blue-500/20 overflow-hidden shadow-inner">
            <div
              ref={glareRef}
              className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40 opacity-0"
            ></div>
            <div className="absolute top-5 left-5 z-30 px-3 py-1 bg-blue-600 text-white font-mono text-[10px] font-bold tracking-widest rounded-full shadow-lg pointer-events-none">
              AI AGENT DEVELOPER
            </div>
            <img
              src={pictureImg}
              alt="Krish Mavani"
              className="w-full h-[330px] sm:h-[380px] md:h-[400px] object-cover object-[55%_25%] rounded-2xl filter contrast-105 brightness-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out pointer-events-none"
            />
            <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-600 pointer-events-none">
              <span className="text-slate-900 font-bold">KRISH MAVANI</span>
              <span className="text-emerald-600 font-bold">&bull; ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
