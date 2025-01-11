import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import LineStaggerIn from "../../components/animations/LineStaggerIn";
import HorizontalScaleOut from "../../components/animations/HorizontalScaleOut";

const Hero = () => {
  const wrapper = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const para = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const headingLines = heading.current!.querySelectorAll(".line");
      const elems = [heading.current, line.current, para.current];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      tl.to(headingLines, {
        ease: "none",
        y: (i) => (headingLines.length - i - 1) * -200,
      });
      tl.to(elems, { ease: "none", y: (i) => (elems.length - i) * -60 }, 0);
    },
    { dependencies: [], revertOnUpdate: true }
  );

  return (
    <section
      id="hero-section"
      ref={wrapper}
      className="h-screen w-full flex flex-col items-center justify-center text-center gap-[0.6vw] pt-[1.1vw]"
    >
      <h1
        ref={heading}
        className="uppercase text-[9.5625vw] leading-[8.125vw] max-w-[75vw]"
      >
        <LineStaggerIn className="line">Classic craft beers,</LineStaggerIn>
        <LineStaggerIn className="line">brewed without</LineStaggerIn>
        <LineStaggerIn className="line">fuss</LineStaggerIn>
      </h1>

      <HorizontalScaleOut
        config={{ delay: 0.75, duration: 1, ease: "power2.out" }}
        className="w-full h-px max-w-[600px]"
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
        className="uppercase text-[2.6875vw] leading-[3.125vw] z-10"
      >
        <LineStaggerIn config={{ stagger: 0.02 }}>
          Pure, honest and damn delicious
        </LineStaggerIn>
      </p>

      <div className="absolute size-[7.6vw] left-0 top-[50vh] z-50">
        {/* <CircularNav
          text="PURE & HONEST • PURE & HONEST • PURE & HONEST •"
          gap={1}
        /> */}
      </div>
    </section>
  );
};

export default Hero;
