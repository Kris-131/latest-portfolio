// import { useEffect } from "react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { gsap } from "gsap";
// import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
// import { TbNotes } from "react-icons/tb";
// import HoverLinks from "./HoverLinks";
// import LineMenu, { MenuItem } from "./LineMenu";
// import "./styles/Navbar.css";

// gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
// export let smoother: ScrollSmoother;

// const Navbar = () => {
//   useEffect(() => {
//     smoother = ScrollSmoother.create({
//       wrapper: "#smooth-wrapper",
//       content: "#smooth-content",
//       smooth: 1.7,
//       speed: 1.7,
//       effects: true,
//       autoResize: true,
//       ignoreMobileResize: true,
//     });

//     smoother.scrollTop(0);
//     smoother.paused(true);

//     window.addEventListener("resize", () => {
//       ScrollSmoother.refresh(true);
//     });
//   }, []);

//   const goTo = (item: MenuItem) => {
//     if (!smoother) return;
//     if (item.top) {
//       smoother.scrollTo(0, true);
//       return;
//     }
//     smoother.scrollTo(`#${item.id}`, true, "top top");
//   };

//   return (
//     <>
//       <div className="header">
//         <a href="/#" className="navbar-title" data-cursor="disable">
//           Krish
//         </a>
//         <a
//           href="mailto:krishmavani982@gmail.com"
//           className="navbar-connect"
//           data-cursor="disable"
//         >
//           krishmavani982@gmail.com
//         </a>
//         <a
//           className="resume-button"
//           href="/resume.pdf"
//           target="_blank"
//           rel="noopener noreferrer"
//           data-cursor="disable"
//         >
//           <HoverLinks text="RESUME" />
//           <span>
//             <TbNotes />
//           </span>
//         </a>
//       </div>

//       <LineMenu onNavigate={goTo} />

//       <div className="landing-circle1"></div>
//       <div className="landing-circle2"></div>
//       <div className="nav-fade"></div>
//     </>
//   );
// };

// export default Navbar;




import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import { TbNotes } from "react-icons/tb";
import HoverLinks from "./HoverLinks";
import LineMenu, { MenuItem } from "./LineMenu";
import "./styles/Navbar.css";

// Register official GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Export smoother for use in other components
export let smoother: ScrollSmoother | null = null;

const Navbar = () => {
  useEffect(() => {
    // Prevent duplicate instances
    smoother?.kill();

    const instance = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother = instance;

    instance.scrollTop(0);
    instance.paused(true);

    // Cleanup when component unmounts
    return () => {
      instance.kill();

      if (smoother === instance) {
        smoother = null;
      }
    };
  }, []);

  const goTo = (item: MenuItem) => {
    if (!smoother) return;

    if (item.top) {
      smoother.scrollTo(0, true);
      return;
    }

    smoother.scrollTo(`#${item.id}`, true, "top top");
  };

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Krish
        </a>

        <a
          href="mailto:krishmavani982@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          krishmavani982@gmail.com
        </a>

        <a
          className="resume-button"
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="disable"
        >
          <HoverLinks text="RESUME" />

          <span>
            <TbNotes />
          </span>
        </a>
      </div>

      <LineMenu onNavigate={goTo} />

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
