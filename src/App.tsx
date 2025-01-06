import { useEffect, useRef } from "react";
import Header from "./layout/Header";
import Home from "./pages/home";
import ReactLenis, { LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const App = () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      options={{ autoRaf: true, lerp: 0.09, wheelMultiplier: 1.5 }}
      ref={lenisRef}
    >
      <Header />

      <main>
        <Home />
      </main>
    </ReactLenis>
  );
};

export default App;
