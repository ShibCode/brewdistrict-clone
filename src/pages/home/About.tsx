import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Fade from "../../components/animations/Fade";
import {
  LineStaggerLine,
  LineStaggerRoot,
} from "../../components/animations/LineStagger";
import HorizontalScale from "../../components/animations/HorizontalScale";

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
          let k = 1;
          if (window.innerWidth < 1024) k = 1.4;

          return (
            (elems.length - i - elems.length / 2 + 1) *
            ((window.innerWidth * k) / -18)
          );
        },
        ease: "none",
        scrollTrigger: {
          trigger: "#about-heading",
          endTrigger: wrapper.current,
          start: "top bottom",
          end: "bottom center",
          scrub: 1,
        },
      });
    },
    { dependencies: [], revertOnUpdate: true },
  );

  return (
    <section
      ref={wrapper}
      id="about-section"
      className="flex flex-col items-center gap-[3vw] pb-[35vw] pt-[46vw] text-secondary sm:gap-[1.5vw] sm:pb-[24vw] sm:pt-[28vw] lg:gap-[0.25vw] lg:pb-[15vw] lg:pt-[19vw]"
    >
      <LineStaggerRoot
        id="about-heading"
        as="h2"
        className="content-parallax-element text-[4.1vw] leading-none sm:text-[2.22vw] lg:text-[1.125vw]"
      >
        <LineStaggerLine>ABOUT BREWDISTRICT24</LineStaggerLine>
      </LineStaggerRoot>

      <Fade
        wrapperId="about-big-p"
        as="p"
        wrapperClassName="content-parallax-element max-w-[15em] lg:max-w-[23em] text-center font-roseford text-[7.5vw] sm:text-[5vw] lg:text-[4vw] uppercase leading-[1.1]"
      >
        Welcome to the neighborhood. <br className="lg:hidden" /> This{" "}
        <Fade
          as="span"
          trigger={{ trigger: "#about-big-p" }}
          gsapFrom={{ y: 50 }}
          gsapTo={{ delay: 0.25 }}
          className="box-content hidden max-w-[13em] px-[0.5em] font-sans text-[0.875vw] leading-[0.875vw] lg:inline-block"
        >
          A haven for like-hearted people, where we drink, laugh and have good
          conversations
        </Fade>{" "}
        is where we come together{" "}
        <Fade
          as="span"
          trigger={{ trigger: "#about-big-p" }}
          gsapFrom={{ y: 50 }}
          gsapTo={{ delay: 0.45 }}
          className="box-content hidden max-w-[4.7em] px-[0.5em] font-sans text-[0.875vw] leading-[0.875vw] lg:inline-block"
        >
          Enjoy every given moment
        </Fade>{" "}
        as one.
      </Fade>

      <div className="content-parallax-element flex w-full max-w-[88vw] flex-col gap-[3vw] font-eczar text-[3.48vw] leading-[1.75] sm:max-w-[80vw] sm:flex-row sm:text-[1.85vw] lg:max-w-[64vw] lg:gap-[1vw] lg:text-[1vw]">
        <Fade as="p" wrapperClassName="w-full">
          In good company, we immerse ourselves in ‘gezelligheid’. Together we
          laugh, drink beer and open ourselves up to new surprising experiences.
          We give way to all our senses so we can connect to a world that is
          packed with taste.
        </Fade>

        <Fade as="p" gsapTo={{ delay: 0.2 }} wrapperClassName="w-full">
          Our classic craft beers are brewed without fuss. With water, grain,
          yeast and hops, we return to the essence where the most diverse and
          authentic flavors are created. Pure and honest. Damn delicious.
        </Fade>
      </div>

      <div className="content-parallax-element flex w-full max-w-[88vw] flex-col gap-[0.65vw] sm:max-w-[80vw] lg:max-w-[64vw]">
        <HorizontalScale
          trigger={{ start: "bottom 75%" }}
          className="h-px w-full bg-current"
        />

        <HorizontalScale
          as="svg"
          gsapTo={{ delay: 0.2 }}
          trigger={{ start: "bottom 75%" }}
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
        </HorizontalScale>
      </div>
    </section>
  );
};

export default About;
