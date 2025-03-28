import HorizontalScale from "../../components/animations/HorizontalScale";
import Fade from "../../components/animations/Fade";
import LocationsMarquee from "./LocationsMarquee";

const LastSection = () => {
  return (
    <section
      id="last-section"
      className="flex flex-col items-center gap-[6vw] overflow-hidden pb-[12vw] pt-[20vw] sm:gap-[4vw] sm:pb-[5vw] sm:pt-[13vw] lg:gap-[2.5vw]"
    >
      <div className="flex w-full max-w-[87vw] flex-col gap-[4vw] sm:max-w-[80vw] sm:flex-row sm:gap-[10vw] lg:max-w-[64vw]">
        <Fade
          as="h2"
          trigger={{ trigger: "#last-section", start: "60% bottom" }}
          className="flex-shrink-0 font-roseford text-[7.6vw] uppercase leading-[1.1] sm:w-[24vw] sm:text-[5vw] lg:text-[4vw]"
        >
          BD24 IN YOUR HOOD?
        </Fade>

        <Fade
          trigger={{ trigger: "#last-section", start: "60% bottom" }}
          gsapTo={{ delay: 0.175 }}
          className="space-y-[3vw] pt-[0.675vw] sm:max-w-[40vw] sm:space-y-[1.5vw] lg:max-w-[24vw] lg:space-y-[1vw]"
        >
          <p className="text-[4.15vw] leading-[1.2] sm:text-[2.2vw] lg:text-[1.125vw]">
            THE SMELL OF FRESHLY BREWED EXCITEMENT IS IN THE AIR
          </p>
          <p className="font-eczar text-[3.45vw] leading-[1.75] sm:text-[1.852vw] lg:text-[1vw]">
            Are you interested in selling our classic craft beers at your
            location? Contact us for more information about our beers, prices
            and possible collaborations. Together we will let your customers
            experience what truly ‘enjoying the moment’ is all about.
          </p>
        </Fade>
      </div>

      <LocationsMarquee />

      <div className="flex w-full max-w-[87vw] flex-col gap-[0.65vw] sm:max-w-[80vw] lg:max-w-[64vw]">
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
