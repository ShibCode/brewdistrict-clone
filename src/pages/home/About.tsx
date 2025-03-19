import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const About = () => {
  const wrapper = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapper.current) return;

      const elems = wrapper.current.querySelectorAll(
        ".content-parallax-element",
      );

      gsap.to(elems, {
        y: (i) => {
          return (
            (elems.length - i - elems.length / 2) * (window.innerWidth / -14)
          );
        },
        ease: "none",
        scrollTrigger: {
          trigger: wrapper.current,
          start: "top bottom",
          end: "bottom center",
          scrub: true,
        },
      });
    },
    { dependencies: [], revertOnUpdate: true },
  );

  return (
    <div
      ref={wrapper}
      id="about-section"
      className="flex flex-col items-center gap-[0.25vw] pb-[15vw] pt-[19vw] text-secondary"
    >
      <h2 className="content-parallax-element text-[1.125vw] leading-[1.125vw]">
        ABOUT BREWDISTRICT24
      </h2>

      <h3 className="content-parallax-element max-w-[23em] text-center font-roseford text-[4vw] uppercase leading-[4.375vw]">
        Welcome to the neighborhood. This
        <span className="box-content inline-block max-w-[13em] px-[2.5em] font-sans text-[0.875vw] leading-[0.875vw]">
          A haven for like-hearted people, where we drink, laugh and have good
          conversations
        </span>
        is where we come together
        <span className="box-content inline-block max-w-[4.7em] px-[2.5em] font-sans text-[0.875vw] leading-[0.875vw]">
          Enjoy every given moment
        </span>
        as one.
      </h3>

      <div className="content-parallax-element flex w-full max-w-[64vw] gap-[1vw] font-eczar text-[1vw] leading-[1.75vw]">
        <p className="w-full">
          In good company, we immerse ourselves in ‘gezelligheid’. Together we
          laugh, drink beer and open ourselves up to new surprising experiences.
          We give way to all our senses so we can connect to a world that is
          packed with taste.
        </p>

        <p className="w-full">
          Our classic craft beers are brewed without fuss. With water, grain,
          yeast and hops, we return to the essence where the most diverse and
          authentic flavors are created. Pure and honest. Damn delicious.
        </p>
      </div>

      <div className="content-parallax-element flex w-full max-w-[64vw] flex-col gap-[0.65vw]">
        <div className="h-px w-full bg-current" />

        <svg viewBox="0 0 800 1" className="w-full" preserveAspectRatio="none">
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
    </div>
  );
};

export default About;
