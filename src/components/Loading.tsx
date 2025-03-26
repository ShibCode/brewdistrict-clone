import { useEffect, useRef } from "react";
import gsap from "gsap";
import { modelColors, useModel } from "../context/ModelProvider";
import { useApp } from "../context/AppProvider";

const Loading = () => {
  const { setIsStarted } = useApp();

  const start = () => setIsStarted(true);

  const { activeModel } = useModel();

  const blackScreen = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = new Image();
    image.src = "/noise.png";
    image.addEventListener("load", () => {
      gsap.to(blackScreen.current, {
        opacity: 0,
        duration: 0.3,
        ease: "none",
        delay: 0.5,
        onComplete: start,
      });
    });
  }, []);

  return (
    <>
      <div ref={blackScreen} className="absolute inset-0 z-40 bg-secondary" />

      <div
        style={{ background: modelColors[activeModel].primary }}
        className="relative isolate h-screen w-full"
      >
        <div
          style={{ backgroundImage: "url(/noise.png" }}
          className="absolute inset-0 -z-10 opacity-20"
        />
      </div>
    </>
  );
};

export default Loading;
