import { useRef } from "react";
import Bolt from "../components/svg/Bolt";
import { useModel } from "../context/ModelProvider";
import useStageEffect from "../hooks/useStageEffect";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useApp } from "../context/AppProvider";

const StickyFooter = () => {
  const { isStarted } = useApp();
  const { activeModel } = useModel();

  const wrapper = useRef<HTMLDivElement>(null);

  useStageEffect(
    () => {},
    () => {
      const bolts = document.querySelectorAll(".bolt");
      bolts?.forEach((bolt) => {
        bolt.classList.add("shake");
        setTimeout(() => bolt.classList.remove("shake"), 900);
      });
    },
    [activeModel],
  );

  useGSAP(
    () => {
      if (!isStarted) return;

      gsap.fromTo(
        wrapper.current,
        { color: "white" },
        {
          color: "black",
          duration: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: "#about-section",
            start: () => `top 100%-=${window.innerWidth * 0.0225}px`,
            end: () => `bottom 100%-=${window.innerWidth * 0.0225}px`,
            toggleActions: "play reverse play reverse",
          },
        },
      );
    },
    { dependencies: [isStarted], revertOnUpdate: true },
  );

  return (
    <div
      ref={wrapper}
      className="fixed bottom-0 z-30 flex w-full justify-between px-[1.7vw] pb-[1.5vw]"
    >
      <div className="flex gap-[1.25vw]">
        <div className="bolt">
          <Bolt className="w-[6.25vw] text-model transition-colors duration-300" />
        </div>
        <span className="text-[0.875vw] leading-[0.875vw]">
          ENJOY <br /> THE MOMENT
        </span>
      </div>

      <div className="flex gap-[1.25vw]">
        <span className="text-end text-[0.875vw] leading-[0.875vw]">
          NOT 18 <br /> NO ALCOHOL
        </span>
        <div className="bolt">
          <Bolt className="w-[6.25vw] -scale-x-100 text-model transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
};

export default StickyFooter;
