import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// All certificates live here, as cards inside the folder reveal.
// To add one: drop the image in /public/certificates and add an entry below.
const certificatesData = [
  {
    title: "AWS Academy Cloud Foundations",
    category: "Training Badge \u2022 20 course hours",
    issuer: "AWS Academy",
    date: "Mar 29, 2026",
    description: "Graduate-level foundations in AWS cloud computing, completed with a digital badge.",
    tag: "CLOUD",
    image: "/certificates/aws-cloud-foundations.jpg",
    verifyUrl: "https://www.credly.com/go/jftGBu1n"
  },
  {
    title: "Data Analytics & Visualization",
    category: "Job Simulation",
    issuer: "Accenture \u00b7 Forage",
    date: "Feb 23, 2024",
    description: "Project understanding, data cleaning & modeling, visualization & storytelling, and a client presentation.",
    tag: "DATA",
    image: "/certificates/accenture-data-analytics.jpg"
  },
  {
    title: "Machine Learning for Data Science Projects",
    category: "Professional Course",
    issuer: "IBM SkillsBuild",
    date: "Sep 15, 2025",
    description: "Satisfied the requirements for applying machine learning in data science projects.",
    tag: "ML",
    image: "/certificates/ibm-ml-data-science.jpg",
    verifyUrl: "https://www.credly.com/badges/abb93e0e-d041-4174-9402-4e2bad6898a6"
  },
  {
    title: "Gen AI Study Jams",
    category: "Certificate of Completion",
    issuer: "Google Developer Groups \u00b7 PP Savani University",
    date: "Jan 27, 2025",
    description: "Completed the generative AI study jam covering core generative AI skills and tools.",
    tag: "GEN AI",
    image: "/certificates/gen-ai-study-jams.jpg"
  },
  {
    title: "TechSprint 36-Hour Hackathon",
    category: "Participation \u2022 Tech Globe Fest 2.0",
    issuer: "GDG & EBC \u00b7 PP Savani University",
    date: "Jan 9\u201310, 2026",
    description: "Took part in a 36-hour coding marathon, building a solution as part of a team.",
    tag: "HACKATHON",
    image: "/certificates/techsprint-hackathon.jpg"
  },
  {
    title: "ECHELON 2026",
    category: "Participation \u2022 Cybersecurity x AI",
    issuer: "SVNIT Surat \u00b7 ISEA \u00b7 ACM",
    date: "Jan 17, 2026",
    description: "Recognized for outstanding contribution and dedication shown in ECHELON 2026.",
    tag: "SECURITY",
    image: "/certificates/echelon-2026.jpg"
  }
];

const CertLightbox = ({ cert, onClose }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Portal to <body> so position:fixed is not affected by ScrollSmoother's transforms
  return createPortal(
    <div
      className="cards-root fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
    >
      <div
        className="relative w-full max-w-4xl max-h-full flex flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-2xl font-black text-slate-950 tracking-tight">{cert.title}</h3>
            <p className="text-xs md:text-sm text-slate-500 font-mono">{cert.issuer} &middot; {cert.date}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-full px-4 py-1.5 bg-slate-100 border border-slate-200 text-slate-800 font-mono text-xs"
          >
            Close
          </button>
        </div>
        <img
          src={cert.image}
          alt={`${cert.title} certificate`}
          className="w-full max-h-[75vh] object-contain rounded-2xl border border-slate-200 bg-slate-100"
        />
        {cert.verifyUrl && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start rounded-full px-4 py-1.5 bg-blue-600 text-slate-50 font-mono text-xs"
          >
            Verify credential
          </a>
        )}
      </div>
    </div>,
    document.body
  );
};

const CertActions = ({ cert, onOpen, size = 'sm' }) => {
  const pad = size === 'sm' ? 'px-3.5 py-1 text-[11px]' : 'px-4 py-1.5 text-xs';
  return (
    <div className="flex items-center gap-2.5 pt-0.5">
      <button
        type="button"
        className={`rounded-full ${pad} bg-blue-600 hover:bg-blue-700 text-slate-50 font-mono uppercase tracking-wider pointer-events-auto shadow-sm`}
        onClick={(e) => { e.stopPropagation(); onOpen(cert); }}
      >
        View certificate
      </button>
      {cert.verifyUrl && (
        <a
          href={cert.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded-full ${pad} bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 font-mono uppercase tracking-wider pointer-events-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          Verify
        </a>
      )}
    </div>
  );
};

const Certificates = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const [openCert, setOpenCert] = useState(null);

  const handleMobileScroll = (e) => {
    const container = e.target;
    const cardWidth = container.offsetWidth * 0.85;
    const idx = Math.round(container.scrollLeft / cardWidth);
    if (idx >= 0 && idx < certificatesData.length) setActiveMobileIdx(idx);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set([folderBackRef.current, folderFrontRef.current], {
          xPercent: -50,
          yPercent: -50
        });
        gsap.set(folderFrontRef.current, { transformOrigin: "bottom center" });

        // 3-top / 3-bottom grid for six certificates
        const getGridPos = (index) => ({
          xCol: (index % 3) - 1,
          yRow: index < 3 ? -0.55 : 0.55
        });

        cardsRef.current.forEach((card) => {
          if (card) {
            gsap.set(card, {
              xPercent: -50,
              yPercent: -50,
              rotation: gsap.utils.random(-6, 6),
              scale: 0.85,
              x: 0,
              y: 0,
            });
          }
        });

        let floatTween;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            end: "bottom 50%",
            toggleActions: "play reverse play reverse",
            onEnter: () => { if (floatTween) floatTween.kill(); },
            onEnterBack: () => { if (floatTween) floatTween.kill(); },
            onLeave: () => { if (floatTween) floatTween.kill(); },
            onLeaveBack: () => { if (floatTween) floatTween.kill(); }
          },
          onComplete: () => {
            floatTween = gsap.to(cardsRef.current, {
              y: "+=12",
              rotation: "+=1",
              duration: 3.5,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
              stagger: { amount: 1.5, from: "random" }
            });
          }
        });

        // 1. Folder opens
        tl.to(folderFrontRef.current, {
          rotationX: -130,
          duration: 1.2,
          ease: "power3.inOut"
        });

        // 2. Certificates rise up
        tl.to(cardsRef.current, {
          y: -140,
          scale: 0.9,
          zIndex: 70,
          duration: 0.6,
          stagger: 0.04,
          ease: "back.out(1.2)"
        }, "-=0.6");

        // 3. Certificates spread into the grid
        tl.to(cardsRef.current, {
          x: (i) => {
            const w = Math.max(...cardsRef.current.map(c => c?.offsetWidth || 0)) || 360;
            return getGridPos(i).xCol * (w + 40);
          },
          y: (i) => {
            const h = Math.max(...cardsRef.current.map(c => c?.offsetHeight || 0)) || 260;
            return getGridPos(i).yRow * (h + 40);
          },
          rotation: () => gsap.utils.random(-3, 3),
          scale: 1,
          duration: 1.4,
          stagger: { amount: 0.4, from: "center" },
          ease: "expo.out"
        }, "-=0.2")
        .to([folderBackRef.current, folderFrontRef.current], {
          opacity: 0.12,
          scale: 0.92,
          duration: 1.2,
          ease: "power2.out"
        }, "<");
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cards-certificates"
      ref={containerRef}
      className="bg-white min-h-screen relative font-sans overflow-hidden text-slate-900 w-full flex flex-col items-center justify-center py-20 md:py-40 select-none border-t border-slate-200"
    >
      {/* Background Title Watermark (Desktop) */}
      <div className="hidden md:flex absolute top-10 left-0 w-full items-start justify-center pointer-events-none z-0">
        <h1 className="text-[13vw] font-black text-slate-900/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          CERTIFICATES
        </h1>
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-[#c2a4ff]/10 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Mobile Header */}
      <div className="md:hidden w-full px-6 mb-8 text-left z-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono uppercase tracking-widest text-blue-700 shadow-sm mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
          <span>CERTIFICATES</span>
          <span className="text-slate-400">&bull;</span>
          <span>{certificatesData.length} EARNED</span>
        </div>
        <h2 className="text-3xl font-black text-slate-950 tracking-tight">
          CERTIFICATES &amp; <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
            ACHIEVEMENTS.
          </span>
        </h2>
        <p className="text-xs font-mono text-slate-500 mt-2">
          Swipe horizontally to view certificates &rarr;
        </p>
      </div>

      {/* DESKTOP 3D Perspective Folder */}
      <div className="hidden md:flex mt-12 relative w-full max-w-7xl h-full items-center justify-center perspective-[2000px] z-10">
        <div className="relative w-0 h-0 transform-style-3d">

          {/* Folder Back */}
          <div
            ref={folderBackRef}
            className="absolute w-[32vw] max-w-[380px] aspect-video bg-slate-100/90 rounded-[24px] border border-blue-500/20 shadow-[0_20px_50px_rgba(194,164,255,0.12)] flex items-center justify-center"
            style={{ zIndex: 5 }}
          >
            <div className="absolute -top-6 left-6 w-32 h-8 bg-slate-200/80 rounded-t-xl border-t border-blue-500/20" />
          </div>

          {/* Desktop Certificate Cards */}
          {certificatesData.map((cert, i) => (
            <div
              key={`desktop-cert-${i}`}
              ref={el => cardsRef.current[i] = el}
              className="absolute w-[33vw] max-w-[380px] aspect-[16/11] will-change-transform"
              style={{ zIndex: 10 + i }}
            >
              <div className="w-full h-full rounded-[24px] border border-slate-200 bg-slate-100/95 backdrop-blur-2xl shadow-[0_20px_45px_rgba(0,0,0,0.06)] transition-all duration-500 group hover:scale-[1.04] hover:border-blue-500 hover:shadow-[0_30px_70px_rgba(194,164,255,0.2)] hover:-translate-y-2 relative z-10 p-5 md:p-6 flex flex-col justify-between">

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {cert.tag}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{cert.date}</span>
                </div>

                <div className="space-y-1 my-1">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    {cert.category}
                  </div>
                  <h3 className="text-lg lg:text-xl font-black text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {cert.title}
                  </h3>
                  <div className="text-[11px] font-mono text-blue-700">{cert.issuer}</div>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-100 mt-auto">
                  <CertActions cert={cert} onOpen={setOpenCert} />
                </div>

                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-blue-600 group-hover:shadow-[0_0_15px_#c2a4ff] transition-all" />
              </div>
            </div>
          ))}

          {/* Folder Front Flap */}
          <div
            ref={folderFrontRef}
            className="absolute w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-slate-200 rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.08)] flex flex-col justify-end p-6 border-t border-blue-500/30">
              <div className="w-20 h-1.5 bg-slate-400/40 rounded-full mx-auto mb-2" />
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE Swipeable Cards */}
      <div className="md:hidden w-full flex flex-col z-10">
        <div
          className="w-full flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-6 scrollbar-none touch-pan-x"
          onScroll={handleMobileScroll}
          style={{ scrollBehavior: 'smooth' }}
        >
          {certificatesData.map((cert, i) => (
            <div
              key={`mobile-cert-${i}`}
              className="shrink-0 w-[84vw] max-w-[340px] snap-center rounded-3xl bg-slate-100 p-6 border border-slate-200 shadow-lg flex flex-col justify-between min-h-[380px]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  {cert.tag}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{cert.date}</span>
              </div>

              <div className="space-y-2 my-auto">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  {cert.category}
                </div>
                <h3 className="text-2xl font-black text-slate-950 tracking-tight">
                  {cert.title}
                </h3>
                <div className="text-xs font-mono text-blue-700">{cert.issuer}</div>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <CertActions cert={cert} onOpen={setOpenCert} size="md" />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {certificatesData.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeMobileIdx === i ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300'}`}
            />
          ))}
        </div>
      </div>

      {openCert && <CertLightbox cert={openCert} onClose={() => setOpenCert(null)} />}
    </section>
  );
};

export default Certificates;
