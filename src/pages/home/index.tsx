import Hero from "./Hero";
import Beers from "./Beers";
import Model from "./Model";
import About from "./About";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Newsletter from "./Newsletter";
import ImageSequence from "./ImageSequence";
import { ScrollTrigger } from "gsap/all";
import Background from "./Background";

const Home = () => {
  const block1 = useRef<HTMLDivElement>(null);
  const block2 = useRef<HTMLDivElement>(null);
  const canvas1 = useRef<HTMLDivElement>(null);
  const canvas2 = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(canvas2.current, { y: -window.innerHeight });

      new ScrollTrigger({
        trigger: "#about-section",
        start: "top 25%",
        onEnter: () => {
          gsap.to(canvas1.current, {
            y: window.innerHeight,
            duration: 1,
            ease: "power3.out",
          });
          gsap.to(canvas2.current, {
            y: 0,
            duration: 1,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(canvas1.current, {
            y: 0,
            duration: 1,
            ease: "power3.out",
          });
          gsap.to(canvas2.current, {
            y: -window.innerHeight,
            duration: 1,
            ease: "power3.out",
          });
        },
      });

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
      <div className="overflow-y-clip relative">
        <div
          ref={block1}
          id="block1"
          className="isolate relative pb-[15vh] overflow-y-clip"
        >
          <Background />

          <div className="h-[200vh] absolute w-full left-0 top-0">
            <div
              ref={canvas1}
              className="sticky top-0 w-full h-screen z-10 flex justify-center items-center"
            >
              <Model />
            </div>
          </div>

          <Hero />
          <Beers />
        </div>

        <div style={{ clipPath: "polygon(0 0, 0% 100%, 100% 100%, 100% 0%)" }}>
          <div
            id="canvas2-scrollarea"
            style={{ clipPath: "polygon(0 0, 0% 100%, 100% 100%, 100% 0%)" }}
            className="absolute w-full h-full left-0 top-0"
          >
            <div
              ref={canvas2}
              className="sticky top-0 w-full h-screen z-10 flex justify-center items-center blur-[20px] opacity-60"
            >
              <Model />
            </div>
          </div>

          <div className="bg-primary overflow-hidden">
            <div ref={block2} id="block2" className="relative z-10">
              <About />
            </div>
          </div>

          <div className="bg-secondary">
            <div className="relative z-10">
              <Newsletter />
            </div>
          </div>
        </div>
      </div>

      <ImageSequence />
    </>
  );
};

export default Home;
