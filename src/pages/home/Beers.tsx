import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { models, useModel } from "../../context/ModelProvider";

interface InfoCardProps {
  label: string;
  value: string;
}

const Beers = () => {
  const { activeModel, nextModel, previousModel } = useModel();

  const beerContainer = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const scrollTrigger = {
      trigger: "#hero-section",
      start: "top top",
      endTrigger: "#beers-section",
      end: "bottom bottom",
      scrub: true,
    };

    gsap.fromTo(
      beerContainer.current,
      { y: "-21vw" },
      {
        y: 0,
        ease: "none",
        scrollTrigger,
      }
    );
  }, []);

  return (
    <section
      id="beers-section"
      className="flex flex-col items-center pt-[15vw] gap-[1.5vw]"
    >
      <div id="beers-section-content" className="flex flex-col items-center">
        <div className="flex gap-[6vw]">
          <div className="w-full flex flex-col items-end justify-between text-end gap-[3vw] pb-[2vw] pt-[1vw]">
            <div className="uppercase flex flex-col gap-[1vw]">
              <h2 className="uppercase text-[1.125vw] leading-[1.125vw]">
                Discover Our Beers
              </h2>

              <h3 className="text-secondary text-[4vw] leading-[4.375vw] font-roseford max-w-[25vw]">
                Imperial Stout
              </h3>
              <p className="text-[1.5vw] leading-[1.75vw]">
                ALC. 10% Vol - 330 ML
              </p>
            </div>

            <div className="uppercase space-y-[0.75vw]">
              <h4 className="text-[0.875vw] leading-[0.875vw]">Ingredients</h4>
              <p className="text-[1.5vw] leading-[1.75vw] text-secondary max-w-[16vw]">
                Water, Malt (Pale malt, Cara120, wheat, mroast (650-1300),
                biscuit), Hop (pacific gem), Yeast, Alcohol 10%
              </p>
            </div>
          </div>

          <div
            ref={beerContainer}
            className="w-[20vw] h-[33vw] shrink-0 p-5 relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 173"
              preserveAspectRatio="none"
              className="absolute inset-0 size-full"
              aria-hidden
            >
              <rect
                x="6"
                y="6"
                width="88"
                height="161"
                fill="none"
                stroke="white"
                strokeWidth="0.3"
                rx={16}
              />

              <rect
                x="2"
                y="2"
                width="96"
                height="169"
                fill="none"
                stroke="#F7F7F7"
                strokeWidth="0.4"
                strokeDasharray="2,2"
                opacity={0.3}
                rx={20}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from={0}
                  to={100}
                  dur={30}
                  repeatCount="indefinite"
                />
              </rect>
            </svg>
          </div>

          <div className="w-full flex flex-col justify-between pb-[2vw] pt-[1vw]">
            <div className="space-y-[1.25vw]">
              <h4 className="uppercase text-[1.125vw] leading-[1.125vw]">
                Explore the dark depths of Imperial Stout
              </h4>
              <p className="text-secondary text-[1vw] leading-[1.75vw] font-eczar max-w-[26vw]">
                Is it still raining? No worries. Just take another deep dive
                into this full bodied-beer which delicately hits every side of
                your palette. Pure and honest. Damn delicious. Something about
                the little things in life…
              </p>
            </div>

            <div className="w-full max-w-[350px] flex flex-col">
              <div className="uppercase grid grid-cols-2 gap-10">
                <InfoCard label="Storage Advice" value="8°C - 10°C" />
                <InfoCard label="Color" value="130 EBC" />
                <InfoCard label="Calories" value="160" />
                <InfoCard label="Bitterness" value="21 IBU" />
              </div>

              <p className="text-secondary uppercase text-[0.875vw] leading-[0.875vw] mt-[0.5vw]">
                Contains Gluten
              </p>

              <button className="bg-[#7ECF86] text-black font-freudian text-[0.859vw] h-[2.64vw] px-[1.59vw] rounded-full hover:bg-white transition-all duration-300 mt-[1.5vw]">
                ORDER NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-[0.5vw]">
        <p>
          {models.indexOf(activeModel) + 1}/{models.length}
        </p>

        <div className="flex items-center justify-between w-[20vw] px-[0.5vw]">
          <button
            className="w-[2.5vw] aspect-square border rounded-full grid place-items-center"
            onClick={previousModel}
          >
            <FaArrowLeft className="size-1/2" />
          </button>

          <span className="uppercase text-[1.25vw] font-roseford">
            {activeModel}
          </span>

          <button
            className="w-[2.5vw] aspect-square border rounded-full grid place-items-center"
            onClick={nextModel}
          >
            <FaArrowRight className="size-1/2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Beers;

const InfoCard = ({ label, value }: InfoCardProps) => {
  return (
    <div className="space-y-[0.25vw]">
      <h4 className="text-[0.875vw] leading-[0.875vw]">{label}</h4>
      <p className="text-[1.5vw] leading-[1.75vw] text-secondary max-w-[16vw]">
        {value}
      </p>
    </div>
  );
};
