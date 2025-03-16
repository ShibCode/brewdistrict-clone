import { useEffect, useState } from "react";
import Header from "./layout/Header";
import Home from "./pages/home";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "lenis";
import Loading from "./components/Loading";
import Footer from "./layout/Footer";
import ModelSwitcher from "./layout/ModelSwitcher";

const App = () => {
  const [isStarted, setIsStarted] = useState(false);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.5 });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }, []);

  const start = () => {
    setIsStarted(true);
  };

  return (
    <>
      <Header />
      <ModelSwitcher />

      {isStarted ? (
        <>
          <main>
            <Home />
          </main>
          <Footer />
        </>
      ) : (
        <Loading start={start} />
      )}
    </>
  );
};

export default App;
