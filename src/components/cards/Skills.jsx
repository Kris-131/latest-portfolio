import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projects from './projectsData';

gsap.registerPlugin(ScrollTrigger);

const CARD_OUTER_HEIGHT = 596; // desktop card height incl. outer frame, used for fit-to-viewport scaling

const pad = (n) => String(n).padStart(2, '0');

const InternshipBadge = () => (
  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest uppercase text-blue-700 px-2.5 py-1 rounded-full border border-indigo-500/60 bg-indigo-500/15 shadow-[0_0_14px_rgba(166,139,255,0.25)]">
    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
    INTERNSHIP
  </span>
);

// Shared card content (desktop + mobile). `compact` tightens spacing for mobile.
const ProjectCardContent = ({ project, index, compact = false }) => (
  <>
    <div className="flex items-start justify-between gap-2 relative z-10">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          {project.category}
        </span>
        {project.internship && <InternshipBadge />}
      </div>
      <span className="text-xs font-mono text-slate-400 whitespace-nowrap">
        [ {pad(index + 1)} / {pad(projects.length)} ]
      </span>
    </div>

    <div className="relative z-10 space-y-2">
      <h3 className={`${compact ? 'text-xl' : 'text-[26px] leading-[1.1]'} font-black text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors duration-300`}>
        {project.title}
      </h3>
      <p className={`${compact ? 'text-xs' : 'text-[12.5px]'} text-slate-600 font-normal leading-relaxed`}>
        {project.description}
      </p>
    </div>

    <div className="relative z-10 flex flex-wrap gap-1.5">
      {project.technologies.map((tech) => (
        <span
          key={tech}
          className="text-[10.5px] font-mono text-slate-800 bg-white border border-slate-200 px-2.5 py-[3px] rounded-full group-hover:border-blue-300 transition-colors"
        >
          {tech}
        </span>
      ))}
    </div>

    <div className="relative z-10 pt-3 border-t border-slate-200 space-y-2.5">
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
        {project.features.map((feature) => (
          <li key={feature} className="flex items-start gap-1.5 text-[10.5px] leading-snug text-slate-500">
            <span className="mt-[5px] w-1 h-1 rotate-45 bg-blue-500 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {project.details && (
        <div className="rounded-xl border border-blue-200/70 bg-blue-50/60 px-3 py-2">
          <p className="text-[9.5px] font-mono font-bold tracking-widest uppercase text-blue-700 mb-1">
            {project.details.label}
          </p>
          <ul className="space-y-0.5">
            {project.details.items.map((item) => (
              <li key={item.name} className="flex items-baseline gap-2 text-[10.5px] leading-snug text-slate-500">
                <span className="font-mono font-bold text-blue-700 w-6 shrink-0">{item.key}</span>
                <span>
                  <span className="text-slate-800">{item.name}</span> &middot; {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </>
);

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  const handleMobileScroll = (e) => {
    const container = e.target;
    const first = container.firstElementChild;
    const gap = parseFloat(getComputedStyle(container).columnGap) || 16;
    const step = (first ? first.offsetWidth : container.offsetWidth * 0.85) + gap;
    const idx = Math.round(container.scrollLeft / step);
    if (idx >= 0 && idx < projects.length) setActiveMobileIdx(idx);
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        // Shrink the whole card stack on short viewports so the taller cards always fit.
        const fitScale = () => Math.min(1, (window.innerHeight - 24) / CARD_OUTER_HEIGHT);
        let currentP = 0;

        const updateCards = (p) => {
          currentP = p;
          const fit = fitScale();
          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            const offset = i - p;
            const radius = 1800;
            const angle = offset * 18;
            const rad = angle * Math.PI / 180;
            const x = Math.sin(rad) * radius;
            const y = radius - (Math.cos(rad) * radius);
            const z = -Math.abs(offset) * 50;
            const scale = Math.max(0.4, 1 - Math.abs(offset) * 0.15) * fit;
            const opacity = Math.max(0.1, 1 - Math.abs(offset) * 0.3);

            gsap.set(card, {
              x, y, z, scale,
              rotationZ: angle,
              rotationY: 0,
              opacity,
              zIndex: Math.round(100 - Math.abs(offset) * 10)
            });
          });

          bgRefs.current.forEach((bg, i) => {
            if (!bg) return;
            const itemOpacity = Math.max(0, 1 - Math.abs(i - p));
            gsap.set(bg, { opacity: itemOpacity });
            if (textRefs.current[i]) gsap.set(textRefs.current[i], { opacity: itemOpacity });
          });
        };

        updateCards(0);

        // Scroll distance is derived from the number of cards, so the last card is always reachable.
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${(projects.length - 1) * 100}%`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateCards(self.progress * (projects.length - 1))
        });

        const onResize = () => updateCards(currentP);
        window.addEventListener('resize', onResize);
        return () => {
          window.removeEventListener('resize', onResize);
          st.kill();
        };
      });

      mm.add("(max-width: 768px)", () => {
        cardsRef.current.forEach((card) => {
          if (card) gsap.set(card, { clearProps: "all" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cards-projects"
      ref={sectionRef}
      className="relative w-full min-h-screen md:min-h-[100dvh] bg-slate-50 text-slate-900 overflow-hidden flex flex-col items-center justify-center select-none border-t border-slate-200 py-16 md:py-0"
    >
      {/* Background Vignettes (Desktop 3D) */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
        {projects.map((_, i) => (
          <div
            key={i}
            ref={el => bgRefs.current[i] = el}
            className="absolute inset-0 opacity-0 bg-gradient-to-tr from-blue-50/50 via-slate-50 to-white"
          />
        ))}
      </div>

      {/* Massive Background Typography (Desktop) */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center z-0 pointer-events-none">
        {projects.map((_, i) => (
          <h1
            key={`text-${i}`}
            ref={el => textRefs.current[i] = el}
            className="absolute text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter"
            style={{
              WebkitTextStroke: `2px ${i % 2 === 0 ? 'rgba(194,164,255,0.12)' : 'rgba(251,141,255,0.10)'}`,
              opacity: 0
            }}
          >
            PROJECTS
          </h1>
        ))}
      </div>

      {/* Mobile-Friendly Header */}
      <div className="md:hidden w-full px-6 mb-8 text-left z-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono uppercase tracking-widest text-blue-700 shadow-sm mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
          <span>PROJECTS</span>
          <span className="text-slate-400">&bull;</span>
          <span>FEATURED WORK</span>
        </div>
        <h2 className="text-3xl font-black text-slate-950 tracking-tight">
          AI SYSTEMS &amp; <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
            ENGINEERING PROJECTS.
          </span>
        </h2>
        <p className="text-xs font-mono text-slate-500 mt-2">
          Swipe horizontally to explore projects &rarr;
        </p>
      </div>

      {/* DESKTOP 3D Perspective Carousel — original scroll animation preserved */}
      <div className="hidden md:flex relative w-full h-full items-center justify-center z-10 [transform-style:preserve-3d]">
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={el => cardsRef.current[i] = el}
            className={`absolute shrink-0 w-[460px] p-2 rounded-[2.4rem] bg-slate-100 border shadow-[0_20px_50px_rgba(0,0,0,0.06)] group hover:border-blue-500/60 transition-colors duration-500 ${project.internship ? 'border-indigo-500/35' : 'border-slate-200'}`}
          >
            <div className="relative w-full h-[580px] rounded-[calc(2.4rem-0.5rem)] px-8 py-8 bg-slate-50/80 backdrop-blur-2xl border border-slate-100 flex flex-col justify-between gap-3 overflow-hidden shadow-inner">
              <ProjectCardContent project={project} index={i} />
              <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-blue-600 group-hover:shadow-[0_0_15px_#c2a4ff] transition-all" />
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE Swipeable Card Container */}
      <div className="md:hidden w-full flex flex-col z-10">
        <div
          className="w-full flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-6 scrollbar-none touch-pan-x"
          onScroll={handleMobileScroll}
          style={{ scrollBehavior: 'smooth' }}
        >
          {projects.map((project, i) => (
            <div
              key={`mobile-${project.id}`}
              className={`shrink-0 w-[84vw] max-w-[340px] snap-center rounded-3xl bg-slate-100 p-6 border shadow-lg flex flex-col gap-4 ${project.internship ? 'border-indigo-500/35' : 'border-slate-200'}`}
            >
              <ProjectCardContent project={project} index={i} compact />
            </div>
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {projects.map((_, i) => (
            <div
              key={projects[i].id}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeMobileIdx === i ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
