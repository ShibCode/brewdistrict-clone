import Hero from "./Hero";
import Beers from "./Beers";
import Model from "./Model";
import About from "./About";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Newsletter from "./Newsletter";
import ImageSequence from "./ImageSequence";

const Home = () => {
  const block1 = useRef<HTMLDivElement>(null);
  const block2 = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      setTimeout(() => {
        gsap.to(block1.current, {
          y: () => `${window.innerHeight * 0.4}`,
          ease: "none",
          scrollTrigger: {
            trigger: block1.current,
            start: "bottom bottom",
            end: () => `+=${window.innerHeight}`,
            scrub: true,
          },
        });
        gsap.to(block2.current, {
          y: () => `${window.innerHeight * 0.4}`,
          ease: "none",
          scrollTrigger: {
            trigger: block2.current,
            start: "bottom bottom",
            end: () => `+=${window.innerHeight}`,
            scrub: true,
          },
        });
      }, 1000);
    },

    { dependencies: [], revertOnUpdate: true }
  );

  return (
    <>
      <div
        ref={block1}
        id="block1"
        style={{ backgroundColor: "rgb(174, 102, 103)" }}
        className="relative isolate pb-[15vh]"
      >
        <div
          style={{ backgroundImage: "url(/noise.png" }}
          className="absolute inset-0 opacity-20 -z-10"
        />

        <Model />

        <Hero />
        <Beers />
      </div>

      <div ref={block2} className="relative">
        <About />
      </div>

      <Newsletter />
      <ImageSequence />
    </>
  );
};

export default Home;
