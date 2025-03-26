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
        { y: "10vw" },
        {
          y: "-10vw",
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
      className="mx-auto flex max-w-[64vw] justify-center pb-[13vw] pt-[16vw]"
    >
      <div ref={content} className="flex w-full">
        <Fade wrapperClassName="w-1/2 pr-[4.5vw]">
          <h2 className="max-w-[7em] font-roseford text-[4vw] uppercase leading-[4.375vw]">
            Become part
            <span className="box-content inline-block max-w-[3em] -translate-y-[0.8em] px-[2.25em] text-center font-sans text-[0.875vw] leading-[0.875vw]">
              Be the first
            </span>
            of our hood
          </h2>
        </Fade>

        <Fade
          gsapTo={{ delay: 0.15 }}
          wrapperClassName="w-1/2 pt-[1vw]"
          className="flex flex-col gap-[1.25vw]"
        >
          <p className="max-w-[26vw] font-eczar text-[1vw] leading-[1.75vw]">
            Only the absolute pioneers who sign up for our newsletter get a
            front row seat, because at BrewDistrict24 we cherish those who
            embrace this adventure with us from the very beginning.
          </p>

          <div className="space-y-[1.25vw]">
            <form
              onSubmit={handleSubmit}
              className="flex items-end gap-[2.5vw]"
            >
              <input
                type="text"
                placeholder="Your email address"
                className="h-[2.5vw] w-full max-w-[26vw] border-b border-current bg-transparent font-eczar text-[0.875vw] text-primary outline-none transition-colors duration-300 placeholder:text-primary placeholder:opacity-40 placeholder-shown:text-[#CB4242]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                aria-label="Join our newsletter"
                className="group relative flex size-[2.75vw] shrink-0 items-center justify-center overflow-hidden rounded-full text-[1.6vw] text-secondary transition-colors duration-300"
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

            <p className="max-w-[26vw] pr-1 font-eczar text-[0.75vw] leading-[1.25vw]">
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
