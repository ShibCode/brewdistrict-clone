import { useRef } from "react";
import { modelColors, useModel } from "../../context/ModelProvider";
import useStageEffect from "../../hooks/useStageEffect";
import gsap from "gsap";

const Background = () => {
  const { activeModel } = useModel();

  const wrapper = useRef<HTMLDivElement>(null);
  const circle1 = useRef<HTMLDivElement>(null);
  const circle2 = useRef<HTMLDivElement>(null);

  useStageEffect(
    () => {
      gsap.set(wrapper.current, {
        background: modelColors[activeModel].primary,
      });
    },
    () => {
      gsap.fromTo(
        circle1.current,
        { scale: 0 },
        { scale: 1, duration: 0.7, ease: "none" }
      );

      gsap.fromTo(
        circle2.current,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.7,
          delay: 0.3,
          ease: "none",
          onComplete: () => {
            gsap.set(wrapper.current, {
              background: modelColors[activeModel].primary,
            });
          },
        }
      );
    },
    [activeModel]
  );

  return (
    <div ref={wrapper} className="absolute inset-0 isolate -z-10">
      <div
        style={{ backgroundImage: "url(/noise.png" }}
        className="absolute inset-0 opacity-20 z-10"
      />

      <div className="sticky top-0 overflow-hidden w-full h-screen grid place-items-center">
        <div
          ref={circle1}
          style={{ background: modelColors[activeModel].primary }}
          className="absolute h-[300%] aspect-square rounded-[50%] brightness-75"
        ></div>

        <div
          ref={circle2}
          style={{ background: modelColors[activeModel].primary }}
          className="absolute h-[300%] aspect-square rounded-[50%]"
        ></div>
      </div>
    </div>
  );
};

export default Background;
