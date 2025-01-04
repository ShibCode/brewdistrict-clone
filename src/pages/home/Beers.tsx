import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface InfoCardProps {
  label: string;
  value: string;
}

const Beers = () => {
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
      { y: "-30vh" },
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
      className="flex items-center justify-center h-screen pt-[5vw]"
    >
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
          className="w-[20vw] aspect-[0.578] shrink-0 p-5 relative"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 173"
            preserveAspectRatio="none"
            className="absolute inset-0"
            aria-hidden
          >
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
              className=""
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

          <div className="w-full h-full border border-[#F7F7F7] rounded-[60px]"></div>
        </div>

        <div className="w-full flex flex-col justify-between pb-[2vw] pt-[1vw]">
          <div className="space-y-[1.25vw]">
            <h4 className="uppercase text-[1.125vw] leading-[1.125vw]">
              Explore the dark depths of Imperial Stout
            </h4>
            <p className="text-secondary text-[1vw] leading-[1.75vw] font-eczar max-w-[26vw]">
              Is it still raining? No worries. Just take another deep dive into
              this full bodied-beer which delicately hits every side of your
              palette. Pure and honest. Damn delicious. Something about the
              little things in life…
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
