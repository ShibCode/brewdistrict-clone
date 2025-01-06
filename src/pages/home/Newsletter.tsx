import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

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
        }
      );
    },
    { dependencies: [], revertOnUpdate: true }
  );

  return (
    <section
      ref={wrapper}
      className="relative bg-secondary pt-[16vw] pb-[13vw] flex justify-center"
    >
      <div ref={content} className="flex w-full">
        <div className="flex justify-end w-full pr-[4.5vw]">
          <h2 className="text-[4vw] leading-[4.375vw] uppercase font-roseford max-w-[7em]">
            Become part
            <span className="text-[0.875vw] leading-[0.875vw] font-sans inline-block max-w-[3em] text-center px-[2.25em] box-content -translate-y-[0.8em]">
              Be the first
            </span>
            of our hood
          </h2>
        </div>

        <div className="w-full flex flex-col gap-[1.25vw] pt-[1vw]">
          <p className="font-eczar text-[1vw] leading-[1.75vw] max-w-[26vw]">
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
                className="bg-transparent border-b border-current text-[0.875vw] h-[2.5vw] font-eczar placeholder:text-primary placeholder:opacity-40 outline-none text-primary placeholder-shown:text-[#CB4242] transition-colors duration-300 w-full max-w-[26vw]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                aria-label="Join our newsletter"
                className="bg-[#7ECF86] hover:bg-[#7ECF86]/70 transition-colors duration-300 text-secondary size-[2.75vw] rounded-full flex justify-center items-center text-[1.6vw] relative group overflow-hidden"
              >
                <div
                  className="absolute size-full flex justify-center items-center group-hover:translate-x-full group-hover:-translate-y-full transition-all duration-300"
                  aria-hidden
                >
                  <FiArrowUpRight strokeWidth={2.5} />
                </div>
                <div
                  className="absolute size-full flex justify-center items-center right-full top-full group-hover:translate-x-full group-hover:-translate-y-full transition-all duration-300"
                  aria-hidden
                >
                  <FiArrowUpRight strokeWidth={2.5} />
                </div>
              </button>
            </form>

            <p className="font-eczar text-[0.75vw] leading-[1.25vw] max-w-[26vw] pr-1">
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
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
