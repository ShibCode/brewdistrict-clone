import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import RoundedText from "../../components/svg/RoundedText";
import { FaArrowDown } from "react-icons/fa6";
import {
  LineStaggerRoot,
  LineStaggerLine,
} from "../../components/animations/LineStagger";
import HorizontalScale from "../../components/animations/HorizontalScale";
import Fade from "../../components/animations/Fade";

const Hero = () => {
  const wrapper = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const para = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const headingLines = wrapper.current!.querySelectorAll("#hero-h1 .line");
      const elems = [...headingLines, line.current, para.current];
      const offset = [-580, -380, -180, -120, -60];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      tl.to(elems, { ease: "none", y: (i) => offset[i] });
    },
    { dependencies: [], revertOnUpdate: true },
  );

  return (
    <section
      id="hero-section"
      ref={wrapper}
      className="relative flex h-screen w-full flex-col items-center justify-center gap-[1vw] pt-[1.1vw] text-center"
    >
      <LineStaggerRoot
        id="hero-h1"
        as="h1"
        gsapTo={{ delay: 0.5 }}
        className="max-w-[75vw] text-[9.5625vw] uppercase leading-[8.125vw]"
      >
        <LineStaggerLine>Classic craft beers,</LineStaggerLine>
        <LineStaggerLine>brewed without</LineStaggerLine>
        <LineStaggerLine className="relative z-10">fuss</LineStaggerLine>
      </LineStaggerRoot>

      <div ref={line} className="h-1 w-full max-w-[550px]">
        <HorizontalScale
          as="svg"
          gsapTo={{ delay: 0.75 }}
          viewBox="0 0 800 1"
          className="h-px w-full"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            strokeWidth="1"
            stroke="currentColor"
            strokeDasharray="3,3"
          >
            <animate
              attributeName="stroke-dashoffset"
              from={0}
              to={100}
              dur={15}
              repeatCount="indefinite"
            />
          </line>
        </HorizontalScale>
      </div>

      <div ref={para} className="z-10">
        <LineStaggerRoot
          as="p"
          gsapTo={{ delay: 0.5 }}
          className="text-[2.6875vw] uppercase leading-[3.125vw]"
        >
          <LineStaggerLine>Pure, honest and damn delicious</LineStaggerLine>
        </LineStaggerRoot>
      </div>

      <Fade
        direction="up"
        gsapTo={{ delay: 1, duration: 0.5 }}
        className="absolute left-[6vw] top-[57%] grid size-[7.75vw] -translate-y-1/2 place-items-center"
      >
        <RoundedText className="rotate-anim absolute inset-0" />
        <FaArrowDown className="text-[2vw]" />
      </Fade>
    </section>
  );
};

export default Hero;
