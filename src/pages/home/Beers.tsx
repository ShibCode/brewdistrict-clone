import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import {
  modelDetails,
  models,
  ModelType,
  useModel,
} from "../../context/ModelProvider";
import Fade from "../../components/animations/Fade";
import IconButton from "../../components/ui/IconButton";
import { cloneElement, useRef } from "react";
import usePrevious from "../../hooks/usePrevious";
import useStageEffect from "../../hooks/useStageEffect";

const Beers = () => {
  const { previousModel, nextModel } = useModel();

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
      className="flex flex-col items-center pt-[15vw]"
    >
      <Fade
        className="relative z-10 lg:hidden"
        trigger={{ start: "center 25%" }}
      >
        <SlideTransition
          inFrom={(dir) => ({ x: 30 * dir, opacity: 0 })}
          inTo={() => ({ x: 0, opacity: 1, duration: 0.25, delay: 0.63 })}
          outFrom={() => ({ x: 0, opacity: 1 })}
          outTo={(dir) => ({ x: -30 * dir, opacity: 0, duration: 0.25 })}
          className="flex h-[18.72vw] w-[75vw] items-center overflow-visible"
        >
          {({ activeModel }) => (
            <div className="text-center font-roseford text-[10.4vw] uppercase leading-[0.9] text-secondary">
              <div className="translate-y-[0.5em]">
                {modelDetails[activeModel].name}
              </div>
            </div>
          )}
        </SlideTransition>
      </Fade>

      <div id="beers-section-content" className="flex flex-col items-center">
        <div className="flex items-center gap-[3vw] sm:gap-[6vw] lg:items-stretch">
          <div className="hidden w-full flex-col items-end justify-between gap-[3vw] pb-[2vw] pt-[1vw] text-end lg:flex">
            <Fade className="flex w-[25vw] flex-col gap-[1vw] uppercase">
              <SlideTransition
                inFrom={(dir) => ({ x: 30 * dir, opacity: 0 })}
                inTo={() => ({ x: 0, opacity: 1, duration: 0.25, delay: 0.63 })}
                outFrom={() => ({ x: 0, opacity: 1 })}
                outTo={(dir) => ({ x: -30 * dir, opacity: 0, duration: 0.25 })}
                className="overflow-visible"
              >
                {({ activeModel }) => (
                  <div>
                    <h2 className="text-[1.125vw] uppercase leading-[1.125vw]">
                      Discover Our Beers
                    </h2>

                    <h3 className="font-roseford text-[4vw] leading-[4.375vw] text-secondary">
                      {modelDetails[activeModel].name}
                    </h3>
                    <p className="text-[1.5vw] leading-[1.75vw]">
                      ALC. 10% Vol - 330 ML
                    </p>
                  </div>
                )}
              </SlideTransition>
            </Fade>

            <Fade>
              <SlideTransition
                inFrom={(dir) => ({ x: 30 * dir, opacity: 0 })}
                inTo={() => ({ x: 0, opacity: 1, duration: 0.25, delay: 0.67 })}
                outFrom={() => ({ x: 0, opacity: 1 })}
                outTo={(dir) => ({ x: -30 * dir, opacity: 0, duration: 0.25 })}
                className="flex items-end overflow-visible"
              >
                {({ activeModel }) => (
                  <div className="space-y-[0.75vw] uppercase">
                    <h4 className="text-[0.875vw] leading-[0.875vw]">
                      Ingredients
                    </h4>
                    <p className="max-w-[16vw] text-[1.5vw] leading-[1.75vw] text-secondary">
                      {modelDetails[activeModel].ingredients}
                    </p>
                  </div>
                )}
              </SlideTransition>
            </Fade>
          </div>

          <button
            onClick={previousModel}
            className="rounded-full border border-primary p-[1.5em] text-[3.5vw] lg:hidden"
          >
            <FaArrowLeft />
          </button>

          <Fade
            wrapperId="beer-container"
            direction="down"
            trigger={{ trigger: "#beers-section", start: "top bottom" }}
            className="relative h-[90.75vw] w-[55vw] shrink-0 sm:h-[82.5vw] sm:w-[50vw] lg:h-[33vw] lg:w-[20vw]"
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

          <button
            onClick={nextModel}
            className="rounded-full border border-primary p-[1.5em] text-[3.5vw] lg:hidden"
          >
            <FaArrowRight />
          </button>

          <div className="hidden w-full flex-col justify-between pb-[2vw] pt-[1vw] lg:flex">
            <Fade>
              <SlideTransition
                inFrom={(dir) => ({ x: 30 * dir, opacity: 0 })}
                inTo={() => ({ x: 0, opacity: 1, duration: 0.25, delay: 0.71 })}
                outFrom={() => ({ x: 0, opacity: 1 })}
                outTo={(dir) => ({ x: -30 * dir, opacity: 0, duration: 0.25 })}
                className="overflow-visible"
              >
                {({ activeModel }) => (
                  <div className="space-y-[1.25vw]">
                    <h4 className="text-[1.125vw] uppercase leading-[1.125vw]">
                      {modelDetails[activeModel].slogan}
                    </h4>
                    <p className="max-w-[26vw] font-eczar text-[1vw] leading-[1.75vw] text-secondary">
                      {modelDetails[activeModel].description}
                    </p>
                  </div>
                )}
              </SlideTransition>
            </Fade>

            <Fade className="w-full max-w-[350px]">
              <SlideTransition
                inFrom={(dir) => ({ x: 30 * dir, opacity: 0 })}
                inTo={() => ({ x: 0, opacity: 1, duration: 0.25, delay: 0.75 })}
                outFrom={() => ({ x: 0, opacity: 1 })}
                outTo={(dir) => ({ x: -30 * dir, opacity: 0, duration: 0.25 })}
                className="overflow-visible"
              >
                {({ activeModel }) => (
                  <div className="flex flex-col">
                    <div className="grid grid-cols-2 gap-[1.5vw] uppercase">
                      <InfoCard
                        label="Storage Advice"
                        value={modelDetails[activeModel].storageAdvice}
                      />
                      <InfoCard
                        label="Color"
                        value={modelDetails[activeModel].color}
                      />
                      <InfoCard
                        label="Calories"
                        value={modelDetails[activeModel].calories}
                      />
                      <InfoCard
                        label="Bitterness"
                        value={modelDetails[activeModel].bitterness}
                      />
                    </div>

                    <p className="mt-[1vw] text-[0.875vw] uppercase leading-[0.875vw] text-secondary">
                      Contains Gluten
                    </p>

                    <button className="font-freudian mt-[1.5vw] h-[2.64vw] rounded-full bg-model px-[1.59vw] text-[0.859vw] text-black transition-all duration-300 hover:bg-white">
                      ORDER NOW
                    </button>
                  </div>
                )}
              </SlideTransition>
            </Fade>
          </div>
        </div>
      </div>

      <Fade className="lg:hidden">
        <SlideTransition
          inFrom={(dir) => ({ x: 30 * dir, opacity: 0 })}
          inTo={() => ({ x: 0, opacity: 1, duration: 0.25, delay: 0.63 })}
          outFrom={() => ({ x: 0, opacity: 1 })}
          outTo={(dir) => ({ x: -30 * dir, opacity: 0, duration: 0.25 })}
          className="overflow-visible"
        >
          {() => (
            <div>
              <button className="font-freudian -translate-y-[calc(50%+4vw)] rounded-full bg-model px-[3em] py-[0.8em] text-[3vw] text-black transition-all duration-300 hover:bg-white sm:-translate-y-[calc(50%+3.5vw)] sm:text-[1.7vw] lg:text-[0.859vw]">
                ORDER NOW
              </button>
            </div>
          )}
        </SlideTransition>
      </Fade>

      <ModelSlider />
    </section>
  );
};

export default Beers;

interface InfoCardProps {
  label: string;
  value: string;
}

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

type ChildrenVariables = {
  activeIndex: number;
  activeModel: ModelType;
};

type SlideTransitionProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  children: ({
    activeIndex,
    activeModel,
  }: ChildrenVariables) => React.ReactElement;
  inFrom?: (direction: 1 | -1) => gsap.TweenVars;
  inTo?: (direction: 1 | -1) => gsap.TweenVars;
  outFrom?: (direction: 1 | -1) => gsap.TweenVars;
  outTo?: (direction: 1 | -1) => gsap.TweenVars;
};

const SlideTransition = ({
  children,
  className = "",
  inFrom = (dir) => ({ xPercent: 100 * dir }),
  inTo = () => ({ xPercent: 0 }),
  outFrom = () => ({ xPercent: 0 }),
  outTo = (dir) => ({ xPercent: -100 * dir }),
  ...props
}: SlideTransitionProps) => {
  const { activeModel } = useModel();

  const activeIndex = models.indexOf(activeModel);
  const previousIndex = usePrevious(activeIndex) || 0;

  const wrapper = useRef<HTMLDivElement>(null);

  useStageEffect(
    () => {
      const slides = wrapper.current?.querySelectorAll(
        "[data-slide-transition=true]",
      );
      if (!slides) return;

      const initial = inFrom(1);
      gsap.set([slides[0], slides[2]], initial);
    },
    () => {
      const slides = wrapper.current?.querySelectorAll(
        "[data-slide-transition=true]",
      );

      if (!slides) return;

      const difference = Math.abs(activeIndex - previousIndex);

      let direction: 1 | -1 = -1;

      if (
        (activeIndex > previousIndex && difference === 1) ||
        (previousIndex > activeIndex && difference > 1)
      ) {
        direction = 1;
      }

      const parsedInFrom = inFrom(direction);
      const parsedInTo = inTo(direction);
      const parsedOutFrom = outFrom(direction);
      const parsedOutTo = outTo(direction);

      const slideIn = slides[1];
      const slideOut = slides[direction === 1 ? 0 : 2];
      const slideIdle = slides[direction === 1 ? 2 : 0];

      gsap.fromTo(slideIn, parsedInFrom, parsedInTo);
      gsap.fromTo(slideOut, parsedOutFrom, parsedOutTo);
      gsap.set(slideIdle, parsedInFrom);
    },
    [activeIndex],
  );

  const addToIndex = (increment: number) =>
    gsap.utils.wrap(0, models.length, activeIndex + increment);

  return (
    <div
      ref={wrapper}
      className={`relative flex overflow-hidden ${className}`}
      {...props}
    >
      {cloneElement(
        children({
          activeIndex: addToIndex(-1),
          activeModel: models[addToIndex(-1)],
        }),
        {
          "data-slide-transition": true,
          style: { width: "100%", position: "absolute", pointerEvents: "none" },
        },
      )}
      {cloneElement(
        children({
          activeIndex: addToIndex(0),
          activeModel: models[addToIndex(0)],
        }),
        {
          "data-slide-transition": true,
          style: { width: "100%" },
        },
      )}
      {cloneElement(
        children({
          activeIndex: addToIndex(1),
          activeModel: models[addToIndex(1)],
        }),
        {
          "data-slide-transition": true,
          style: { width: "100%", position: "absolute", pointerEvents: "none" },
        },
      )}
    </div>
  );
};

const ModelSlider = () => {
  const { activeModel, nextModel, previousModel } = useModel();

  const activeIndex = models.indexOf(activeModel);

  return (
    <div className="hidden flex-col items-center gap-[0.3vw] lg:flex">
      <p>
        {activeIndex + 1}/{models.length}
      </p>

      <div className="flex w-[20vw] items-center justify-between px-[0.5vw]">
        <IconButton
          gap={1}
          className="w-[2.5vw] border border-primary hover:border-model"
          onClick={previousModel}
        >
          <FaArrowLeft className="size-1/2" />
        </IconButton>

        <SlideTransition
          style={{
            maskImage:
              "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #000000 3.125vw, #000000 calc(100% - 3.125vw), rgba(0, 0, 0, 0) 100%)",
          }}
          className="flex-grow"
        >
          {({ activeIndex }) => (
            <div className="flex h-[2.5vw] w-full items-center justify-center text-center font-roseford text-[1.25vw] uppercase leading-none">
              <span className="w-[7em]">
                {modelDetails[models[activeIndex]].name}
              </span>
            </div>
          )}
        </SlideTransition>

        <IconButton
          direction="right"
          gap={1}
          className="w-[2.5vw] border border-primary hover:border-model"
          onClick={nextModel}
        >
          <FaArrowRight className="size-1/2" />
        </IconButton>
      </div>
    </div>
  );
};
