import HorizontalScale from "../../components/animations/HorizontalScale";
import Fade from "../../components/animations/Fade";
import LocationsMarquee from "./LocationsMarquee";

const LastSection = () => {
  return (
    <section
      id="last-section"
      className="flex flex-col items-center gap-[2.5vw] overflow-hidden pb-[5vw] pt-[13vw]"
    >
      <div className="flex w-full max-w-[64vw]">
        <Fade
          as="h2"
          trigger={{ trigger: "#last-section", start: "60% bottom" }}
          className="max-w-[24vw] flex-shrink-0 font-roseford text-[4vw] uppercase leading-[4.375vw]"
        >
          BD24 IN YOUR HOOD?
        </Fade>

        <Fade
          trigger={{ trigger: "#last-section", start: "60% bottom" }}
          gsapTo={{ delay: 0.175 }}
          className="max-w-[24vw] space-y-[1vw] pt-[0.675vw]"
        >
          <p className="text-[1.125vw] leading-[1.125vw]">
            THE SMELL OF FRESHLY BREWED EXCITEMENT IS IN THE AIR
          </p>
          <p className="font-eczar text-[1vw] leading-[1.75vw]">
            Are you interested in selling our classic craft beers at your
            location? Contact us for more information about our beers, prices
            and possible collaborations. Together we will let your customers
            experience what truly ‘enjoying the moment’ is all about.
          </p>
        </Fade>
      </div>

      <LocationsMarquee />

      <div className="flex w-full max-w-[64vw] flex-col gap-[0.65vw]">
        <HorizontalScale
          trigger={{ trigger: "#last-section", start: "60% bottom" }}
          gsapTo={{ delay: 0.525 }}
          className="h-px w-full bg-current"
        />

        <HorizontalScale
          as="svg"
          trigger={{ trigger: "#last-section", start: "60% bottom" }}
          gsapTo={{ delay: 0.7 }}
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

export default LastSection;
