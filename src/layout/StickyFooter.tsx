import Bolt from "../components/svg/Bolt";
import { useModel } from "../context/ModelProvider";
import useStageEffect from "../hooks/useStageEffect";

const StickyFooter = () => {
  const { activeModel } = useModel();

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

  return (
    <div className="fixed bottom-0 z-50 flex w-full justify-between px-[1.7vw] pb-[1.5vw]">
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
