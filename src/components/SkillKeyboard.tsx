import { useEffect, useRef, useState } from "react";
import "./styles/SkillKeyboard.css";

/**
 * The interactive 3D skill keyboard. It is a self-contained build (see
 * /keyboard-app) served from /skill-keyboard/ and shown in a frame, so it can
 * use its own React / three.js versions without touching the character scene.
 */
const FRAME_SRC = "/skill-keyboard/index.html";

const SkillKeyboard = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = useState(false);
  const frameReady = useRef(false);
  const inView = useRef(false);
  const revealed = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const post = (message: Record<string, unknown>) =>
      frameRef.current?.contentWindow?.postMessage(message, window.location.origin);
    const tryReveal = () => {
      if (revealed.current || !frameReady.current || !inView.current) return;
      revealed.current = true;
      post({ type: "skill-keyboard:reveal" });
    };

    // Load the keyboard shortly before it scrolls into view.
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          preload.disconnect();
        }
      },
      { rootMargin: "100% 0px" }
    );
    preload.observe(section);

    // Play the keys' reveal animation once the section is on screen.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        tryReveal();
      },
      { threshold: 0.35 }
    );
    visibility.observe(section);

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.source !== frameRef.current?.contentWindow) return;
      const data = event.data;
      if (!data || typeof data !== "object") return;
      if (data.type === "skill-keyboard:ready") {
        frameReady.current = true;
        tryReveal();
      }
      // Keep the site's custom cursor following the mouse over the frame.
      if (data.type === "skill-keyboard:pointer") {
        const rect = frameRef.current!.getBoundingClientRect();
        document.dispatchEvent(
          new MouseEvent("mousemove", {
            clientX: rect.left + data.x,
            clientY: rect.top + data.y,
            bubbles: true,
          })
        );
      }
    };

    // Typing a key while the section is on screen presses the matching keycap.
    const forwardKey = (down: boolean) => (event: KeyboardEvent) => {
      if (!inView.current || !frameReady.current || event.repeat) return;
      const target = event.target as Element | null;
      if (target?.closest?.("input, textarea, select, [contenteditable]")) return;
      post({
        type: "skill-keyboard:key",
        down,
        code: event.code,
        key: event.key,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        altKey: event.altKey,
      });
    };
    const onDown = forwardKey(true);
    const onUp = forwardKey(false);

    window.addEventListener("message", onMessage);
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      preload.disconnect();
      visibility.disconnect();
      window.removeEventListener("message", onMessage);
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  return (
    <div className="skill-keyboard" id="skills" ref={sectionRef}>
      <h2>
        My Skills
        <span>(hint: press a key)</span>
      </h2>
      {mounted && (
        <iframe
          ref={frameRef}
          src={FRAME_SRC}
          title="Interactive skill keyboard"
          className="skill-keyboard-frame"
        />
      )}
    </div>
  );
};

export default SkillKeyboard;
