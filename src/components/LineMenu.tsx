import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./styles/LineMenu.css";

export type MenuItem = { label: string; id: string; top?: boolean };

// Every section of the portfolio, in page order.
export const MENU_ITEMS: MenuItem[] = [
  { label: "Home", id: "landingDiv", top: true },
  { label: "About", id: "about" },
  { label: "What I Do", id: "whatido" },
  { label: "Career", id: "career" },
  { label: "Tech Stack", id: "techstack" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "cards-projects" },
  { label: "Certificates", id: "cards-certificates" },
  { label: "Contact", id: "contact" },
];

const REACH = 2.4; // how many rows away the hover "magnet" still affects

const LineMenu = ({ onNavigate }: { onNavigate: (item: MenuItem) => void }) => {
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [active, setActive] = useState<string>(MENU_ITEMS[0].id);
  const [expanded, setExpanded] = useState(false); // touch / keyboard toggle
  const rootRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const pointerType = useRef<string>("mouse");

  // Keep the list (Tech Stack is desktop-only) and the active section in sync with scroll.
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      frame++;
      if (frame % 8 !== 0) return;
      const present = MENU_ITEMS.filter((it) => document.getElementById(it.id));
      setItems((prev) =>
        prev.map((i) => i.id).join() === present.map((i) => i.id).join() ? prev : present
      );
      let current = MENU_ITEMS[0].id;
      present.forEach((it) => {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) current = it.id;
      });
      setActive((prev) => (prev === current ? prev : current));
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  // Close the touch-expanded state on outside tap / Escape.
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setExpanded(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setExpanded(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Proportional expansion: rows near the pointer grow the most, like a magnifier.
  const setInfluence = (clientY: number | null) => {
    rowRefs.current.forEach((row) => {
      if (!row) return;
      let p = 0;
      if (clientY !== null) {
        const r = row.getBoundingClientRect();
        const d = Math.abs(clientY - (r.top + r.height / 2)) / r.height;
        p = Math.max(0, 1 - d / REACH);
        p = p * p * (3 - 2 * p); // smoothstep
      }
      row.style.setProperty("--p", p.toFixed(3));
    });
  };

  return (
    <nav
      ref={rootRef}
      className={`line-menu ${expanded ? "is-expanded" : ""}`}
      aria-label="Sections"
      onPointerDownCapture={(e) => (pointerType.current = e.pointerType)}
      onPointerMove={(e) => e.pointerType === "mouse" && setInfluence(e.clientY)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setInfluence(null)}
    >
      <ul>
        {items.map((item, i) => (
          <li
            key={item.id}
            ref={(el) => (rowRefs.current[i] = el)}
            className={active === item.id ? "is-active" : ""}
            style={{ "--i": i } as React.CSSProperties}
          >
            <a
              href={`#${item.id}`}
              data-cursor="disable"
              aria-label={item.label}
              aria-current={active === item.id ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                // On touch the labels are hidden: first tap only reveals them.
                if (pointerType.current !== "mouse" && !expanded) {
                  setExpanded(true);
                  return;
                }
                e.currentTarget.blur();
                setExpanded(false);
                onNavigate(item);
              }}
            >
              <span className="lm-line" />
              <span className="lm-label">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LineMenu;
