import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { modelDetails, models, useModel } from "../../context/ModelProvider";
import Fade from "../../components/animations/Fade";

interface InfoCardProps {
  label: string;
  value: string;
}

const Beers = () => {
  const { activeModel, nextModel, previousModel } = useModel();

  useGSAP(
    () => {
      const scrollTrigger = {
        trigger: "#hero-section",
        start: "top top",
        endTrigger: "#beers-section",
        end: "bottom bottom",
        scrub: true,
      };

      gsap.fromTo(
        "#beer-container",
        { y: "-21vw" },
        {
          y: 0,
          ease: "none",
          scrollTrigger,
        },
      );
    },
    { dependencies: [], revertOnUpdate: true },
  );

  return (
    <section
      id="beers-section"
      className="flex flex-col items-center gap-[1.5vw] pt-[15vw]"
    >
      <div id="beers-section-content" className="flex flex-col items-center">
        <div className="flex gap-[6vw]">
          <div className="flex w-full flex-col items-end justify-between gap-[3vw] pb-[2vw] pt-[1vw] text-end">
            <Fade className="flex flex-col gap-[1vw] uppercase">
              <h2 className="text-[1.125vw] uppercase leading-[1.125vw]">
                Discover Our Beers
              </h2>

              <h3 className="max-w-[25vw] font-roseford text-[4vw] leading-[4.375vw] text-secondary">
                {modelDetails[activeModel].name}
              </h3>
              <p className="text-[1.5vw] leading-[1.75vw]">
                ALC. 10% Vol - 330 ML
              </p>
            </Fade>

            <Fade className="space-y-[0.75vw] uppercase">
              <h4 className="text-[0.875vw] leading-[0.875vw]">Ingredients</h4>
              <p className="max-w-[16vw] text-[1.5vw] leading-[1.75vw] text-secondary">
                Water, Malt (Pale malt, Cara120, wheat, mroast (650-1300),
                biscuit), Hop (pacific gem), Yeast, Alcohol 10%
              </p>
            </Fade>
          </div>

          <Fade
            wrapperId="beer-container"
            direction="down"
            trigger={{ trigger: "#beers-section", start: "top bottom" }}
            className="relative h-[33vw] w-[20vw] shrink-0"
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
          </Fade>

          <div className="flex w-full flex-col justify-between pb-[2vw] pt-[1vw]">
            <Fade className="space-y-[1.25vw]">
              <h4 className="text-[1.125vw] uppercase leading-[1.125vw]">
                Explore the dark depths of Imperial Stout
              </h4>
              <p className="max-w-[26vw] font-eczar text-[1vw] leading-[1.75vw] text-secondary">
                Is it still raining? No worries. Just take another deep dive
                into this full bodied-beer which delicately hits every side of
                your palette. Pure and honest. Damn delicious. Something about
                the little things in life…
              </p>
            </Fade>

            <Fade className="flex w-full max-w-[350px] flex-col">
              <div className="grid grid-cols-2 gap-10 uppercase">
                <InfoCard label="Storage Advice" value="8°C - 10°C" />
                <InfoCard label="Color" value="130 EBC" />
                <InfoCard label="Calories" value="160" />
                <InfoCard label="Bitterness" value="21 IBU" />
              </div>

              <p className="mt-[0.5vw] text-[0.875vw] uppercase leading-[0.875vw] text-secondary">
                Contains Gluten
              </p>

              <button className="font-freudian mt-[1.5vw] h-[2.64vw] rounded-full bg-[#7ECF86] px-[1.59vw] text-[0.859vw] text-black transition-all duration-300 hover:bg-white">
                ORDER NOW
              </button>
            </Fade>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-[0.5vw]">
        <p>
          {models.indexOf(activeModel) + 1}/{models.length}
        </p>

        <div className="flex w-[20vw] items-center justify-between px-[0.5vw]">
          <button
            className="grid aspect-square w-[2.5vw] place-items-center rounded-full border"
            onClick={previousModel}
          >
            <FaArrowLeft className="size-1/2" />
          </button>

          <span className="font-roseford text-[1.25vw] uppercase">
            {activeModel}
          </span>

          <button
            className="grid aspect-square w-[2.5vw] place-items-center rounded-full border"
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
      <p className="max-w-[16vw] text-[1.5vw] leading-[1.75vw] text-secondary">
        {value}
      </p>
    </div>
  );
};
