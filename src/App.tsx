import { useEffect, useRef } from "react";
import Header from "./layout/Header";
import Home from "./pages/home";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "lenis";
import Loading from "./components/Loading";
import Footer from "./layout/Footer";
import ModelSwitcher from "./layout/ModelSwitcher";
import StickyFooter from "./layout/StickyFooter";
import { useApp } from "./context/AppProvider";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const { isStarted } = useApp();

  const lastX = useRef(0);
  const lastVelocityX = useRef(0);
  const lastTime = useRef(0);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.5 });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();

      if (lastX.current !== null && lastTime.current !== null) {
        const deltaTime = now - lastTime.current;

        const velocityX = (e.clientX - lastX.current) / deltaTime;
        const accelerationX = (velocityX - lastVelocityX.current) / deltaTime;

        document.body.setAttribute(
          "data-acceleration",
          Math.abs(accelerationX).toString(),
        );

        lastVelocityX.current = velocityX;
      }

      lastTime.current = now;
      lastX.current = e.clientX;
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <>
      <Header />
      <StickyFooter />

      {isStarted ? (
        <>
          <ModelSwitcher />
          <main>
            <Home />
          </main>
          <Footer />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default App;
