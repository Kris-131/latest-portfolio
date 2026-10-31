import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  // The AI & ML card sizes itself to its own content instead of using a
  // fixed percentage of the box. We measure the content and hand the height
  // to CSS through the --fit-h variable.
  const fitInnerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const inner = fitInnerRef.current;
    const card = containerRef.current[1];
    if (!inner || !card) return;
    const measure = () => {
      const h = inner.offsetHeight;
      if (h > 0) card.style.setProperty("--fit-h", `${Math.ceil(h)}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(inner);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO" id="whatido">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-grow what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>AI AGENT</h3>
              <h4>Description</h4>
              <p>
                I design and build AI agents that plan, use tools and act on their own:
                from knowledge-based chat assistants and multi-agent workflows
                to FastAPI backends and React interfaces that put them to work.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Python</div>
                <div className="what-tags">LangGraph</div>
                <div className="what-tags">FastAPI</div>
                <div className="what-tags">ChromaDB</div>
                <div className="what-tags">n8n</div>
                <div className="what-tags">Docker</div>
                <div className="what-tags">Kubernetes</div>
                <div className="what-tags">Supabase</div>
                <div className="what-tags">Prompt Engineering</div>
                <div className="what-tags">WhatsApp API</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-fit what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <div className="what-fit-inner" ref={fitInnerRef}>
                <h3>AI &amp; ML</h3>
                <h4>Description</h4>
                <p>
                  I'm studying AI &amp; ML and turning it into projects, like a
                  text-to-3D model built on OpenAI's Shap-E during a hackathon.
                </p>
                <h5>Skillset & tools</h5>
                <div className="what-content-flex">
                  <div className="what-tags">AI &amp; ML</div>
                  <div className="what-tags">Python</div>
                  <div className="what-tags">Shap-E</div>
                  <div className="what-tags">Blender</div>
                  <div className="what-tags">Problem Solving</div>
                </div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
