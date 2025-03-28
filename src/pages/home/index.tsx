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
import LastSection from "./LastSection";

const Home = () => {
  const canvas1Wrapper = useRef<HTMLDivElement>(null);
  const canvas1 = useRef<HTMLDivElement>(null);
  const canvas2 = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(canvas2.current, { y: -window.innerHeight });

      new ScrollTrigger({
        trigger: "#about-section",
        start: "top 30%",
        onEnter: () => {
          gsap.to(canvas1Wrapper.current, {
            y: window.innerHeight,
            duration: 1,
            delay: 0.125,
            ease: "power3.out",
          });
          gsap.to(canvas2.current, {
            y: 0,
            duration: 1,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(canvas1Wrapper.current, {
            y: 0,
            duration: 1,
            ease: "power3.out",
          });
          gsap.to(canvas2.current, {
            y: -window.innerHeight,
            delay: 0.125,
            duration: 1,
            ease: "power3.out",
          });
        },
      });

      gsap.to("#block1", {
        y: () => `${window.innerWidth * 0.225}`,
        ease: "none",
        scrollTrigger: {
          trigger: "#block1",
          start: "bottom bottom",
          end: () => `+=${window.innerHeight}`,
          scrub: 1,
        },
      });
      gsap.to("#block2", {
        y: () => {
          let k = 1;
          if (window.innerWidth < 640) k = 3;
          else if (window.innerWidth < 1024) k = 2;

          return window.innerWidth * 0.225 * k;
        },
        ease: "none",
        scrollTrigger: {
          trigger: "#block2",
          start: "bottom bottom",
          end: () => `+=${window.innerHeight}`,
          scrub: 1,
        },
      });

      new ScrollTrigger({
        trigger: canvas1Wrapper.current,
        start: "top top",
        endTrigger: "#beers-section-content",
        end: "50% center",
        pinType: "transform",
        pin: canvas1.current,
      });
    },

    { dependencies: [], revertOnUpdate: true },
  );

  return (
    <>
      <div className="relative overflow-y-clip">
        <div id="block1" className="relative isolate overflow-y-clip pb-[20vh]">
          <Background />

          <div
            ref={canvas1Wrapper}
            className="pointer-events-none absolute z-10 mt-[22.5vw] h-screen w-full lg:mt-0"
          >
            <div ref={canvas1} className="relative size-full">
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
            className="absolute left-0 top-0 h-full w-full"
          >
            <div
              ref={canvas2}
              className="sticky top-0 z-10 flex h-screen w-full items-center justify-center opacity-60 blur-[20px]"
            >
              <Model />
            </div>
          </div>

          <div className="overflow-hidden bg-primary">
            <div id="block2" className="relative z-10">
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
      <LastSection />
    </>
  );
};

export default Home;
