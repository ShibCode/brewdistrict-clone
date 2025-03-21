import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import LineStaggerIn from "../../components/animations/LineStaggerIn";
import HorizontalScaleOut from "../../components/animations/HorizontalScaleOut";
import RoundedText from "../../components/svg/RoundedText";
import { FaArrowDown } from "react-icons/fa6";
import FadeUp from "../../components/animations/FadeUp";

const Hero = () => {
  const wrapper = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const para = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const headingLines = heading.current!.querySelectorAll(".line");
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
      <h1
        ref={heading}
        className="max-w-[75vw] text-[9.5625vw] uppercase leading-[8.125vw]"
      >
        <LineStaggerIn className="line">Classic craft beers,</LineStaggerIn>
        <LineStaggerIn className="line">brewed without</LineStaggerIn>
        <LineStaggerIn className="line relative z-10">fuss</LineStaggerIn>
      </h1>

      <HorizontalScaleOut
        config={{ delay: 0.75, duration: 1, ease: "power2.out" }}
        className="h-px w-full max-w-[600px]"
      >
        <div ref={line}>
          <svg
            viewBox="0 0 800 1"
            className="w-full"
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
          </svg>
        </div>
      </HorizontalScaleOut>

      <p
        ref={para}
        className="z-10 text-[2.6875vw] uppercase leading-[3.125vw]"
      >
        <LineStaggerIn config={{ stagger: 0.02 }}>
          Pure, honest and damn delicious
        </LineStaggerIn>
      </p>

      <FadeUp
        config={{ delay: 1 }}
        className="absolute left-[6vw] top-[57%] grid size-[7.75vw] -translate-y-1/2 place-items-center"
      >
        <RoundedText className="rotate-anim absolute inset-0" />
        <FaArrowDown className="text-[2vw]" />
      </FadeUp>
    </section>
  );
};

export default Hero;
