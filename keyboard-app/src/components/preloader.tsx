import { createContext, useContext } from "react";

// The original site gates the keyboard's reveal animation behind its page
// preloader. Here the host page controls it: `isLoading` stays true until the
// keyboard section scrolls into view, then the reveal plays.
type PreloaderContextType = { isLoading: boolean; loadingPercent: number; bypassLoading: () => void };
export const preloaderContext = createContext<PreloaderContextType>({
  isLoading: true, loadingPercent: 0, bypassLoading: () => {},
});
export const usePreloader = () => useContext(preloaderContext);
