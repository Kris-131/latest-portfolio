import { StrictMode, useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import KeyboardScene from "./components/keyboard/keyboard-scene";
import { preloaderContext } from "./components/preloader";
import { setSceneStatus } from "./lib/scene-health";
import "./index.css";

const embedded = window.parent !== window;
const MAX_DPR = 2;

function App() {
  // Standalone: reveal at once. Embedded: wait for the host to say the section is in view.
  const [revealed, setRevealed] = useState(!embedded);
  const bypassLoading = useCallback(() => {}, []);

  useEffect(() => { setSceneStatus("loading"); }, []);

  useEffect(() => {
    if (!embedded) return;
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (!data || typeof data !== "object") return;
      if (data.type === "skill-keyboard:reveal") setRevealed(true);
      // Keys pressed while the host page has focus are forwarded here.
      if (data.type === "skill-keyboard:key" && typeof data.code === "string") {
        window.dispatchEvent(new KeyboardEvent(data.down ? "keydown" : "keyup", {
          code: data.code, key: data.key, bubbles: true, cancelable: true,
          ctrlKey: !!data.ctrlKey, metaKey: !!data.metaKey, altKey: !!data.altKey,
        }));
      }
    };
    window.addEventListener("message", onMessage);
    // Let the host cursor follow the pointer while it is over this frame.
    const move = (event: PointerEvent) =>
      window.parent.postMessage({ type: "skill-keyboard:pointer", x: event.clientX, y: event.clientY }, window.location.origin);
    window.addEventListener("pointermove", move, { passive: true });
    window.parent.postMessage({ type: "skill-keyboard:ready" }, window.location.origin);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  const value = useMemo(() => ({ isLoading: !revealed, loadingPercent: revealed ? 100 : 0, bypassLoading }), [revealed, bypassLoading]);
  return (
    <preloaderContext.Provider value={value}>
      <div id="skills"><KeyboardScene maxDpr={MAX_DPR} /></div>
    </preloaderContext.Provider>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
