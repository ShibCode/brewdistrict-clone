import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Fade from "../../components/animations/Fade";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useGSAP(
    () => {
      gsap.fromTo(
        content.current,
        {
          y: () => {
            let k = 1;
            if (window.innerWidth < 1024) k = 1.5;

            return 0.1 * window.innerWidth * k;
          },
        },
        {
          y: () => {
            let k = 1;
            if (window.innerWidth < 1024) k = 1.5;

            return -0.1 * window.innerWidth * k;
          },
          ease: "none",
          scrollTrigger: {
            trigger: wrapper.current,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        },
      );
    },
    { dependencies: [], revertOnUpdate: true },
  );

  return (
    <section
      ref={wrapper}
      id="newsletter-section"
      className="mx-auto flex max-w-[92vw] justify-center pb-[30vw] pt-[30vw] sm:pb-[20vw] sm:pt-[20vw] lg:max-w-[64vw] lg:pb-[13vw] lg:pt-[16vw]"
    >
      <div
        ref={content}
        className="flex w-full flex-col gap-[5vw] sm:flex-row lg:gap-0"
      >
        <Fade wrapperClassName="w-full sm:w-1/2 lg:pr-[4.5vw]">
          <h2 className="font-roseford text-[7.5vw] uppercase leading-[1.1] sm:text-[5vw] lg:max-w-[7em] lg:text-[4vw]">
            Become part{" "}
            <span className="box-content hidden max-w-[3em] -translate-y-[0.8em] text-center font-sans text-[0.21em] leading-none lg:inline-block">
              Be the first
            </span>{" "}
            of our hood
          </h2>
        </Fade>

        <Fade
          gsapTo={{ delay: 0.15 }}
          wrapperClassName="w-full sm:w-1/2 pt-[1vw]"
          className="flex flex-col gap-[2.5vw] sm:gap-[1.25vw]"
        >
          <p className="font-eczar text-[3.4vw] leading-[1.75] sm:max-w-[33vw] sm:text-[1.85vw] lg:max-w-[26vw] lg:text-[1vw]">
            Only the absolute pioneers who sign up for our newsletter get a
            front row seat, because at BrewDistrict24 we cherish those who
            embrace this adventure with us from the very beginning.
          </p>

          <div className="space-y-[4vw] sm:space-y-[1.25vw]">
            <form
              onSubmit={handleSubmit}
              className="flex items-end gap-[2.5vw]"
            >
              <input
                type="text"
                placeholder="Your email address"
                className="w-full border-b border-current bg-transparent py-[0.3em] font-eczar text-[3vw] text-primary outline-none transition-colors duration-300 placeholder:text-primary placeholder:opacity-40 placeholder-shown:text-[#CB4242] sm:py-[0.7em] sm:text-[1.4vw] lg:max-w-[26vw] lg:text-[0.875vw]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                aria-label="Join our newsletter"
                className="group relative flex size-[1.7em] shrink-0 items-center justify-center overflow-hidden rounded-full text-[5vw] text-secondary transition-colors duration-300 sm:text-[3vw] lg:text-[1.6vw]"
              >
                <div className="absolute inset-0 -z-10 bg-model transition-all duration-300 group-hover:opacity-70" />

                <div
                  className="absolute flex size-full items-center justify-center transition-all duration-300 group-hover:-translate-y-full group-hover:translate-x-full"
                  aria-hidden
                >
                  <FiArrowUpRight strokeWidth={2.5} />
                </div>
                <div
                  className="absolute right-full top-full flex size-full items-center justify-center transition-all duration-300 group-hover:-translate-y-full group-hover:translate-x-full"
                  aria-hidden
                >
                  <FiArrowUpRight strokeWidth={2.5} />
                </div>
              </button>
            </form>

            <p className="pr-1 font-eczar text-[2.5vw] leading-[1.66] sm:max-w-[26vw] sm:text-[1.2vw] lg:text-[0.75vw]">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              {""}
              apply.
            </p>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default Newsletter;
