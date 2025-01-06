import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

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

  const split = (text: string) => {
    return text.split("").map((char, index) => {
      return (
        <span key={index} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

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
        <span className="inline-block line">
          {split("Classic craft beers,")}
        </span>
        <span className="inline-block line">{split("brewed without")}</span>
        <span className="inline-block line">{split("fuss")}</span>
      </h1>

      <div ref={line} className="h-px w-full flex justify-center">
        <svg width="600" height="2" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="0"
            y1="0"
            x2="600"
            y2="0"
            stroke="#fff"
            strokeWidth="1"
            strokeDasharray="3,3"
          >
            <animate
              attributeName="stroke-dashoffset"
              from={0}
              to={100}
              dur={10}
              repeatCount="indefinite"
            />
          </line>
        </svg>
      </div>

      <p
        ref={para}
        className="uppercase text-[2.6875vw] leading-[3.125vw] z-10"
      >
        Pure, honest and damn delicious
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
