import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoadingProps {
  start: () => void;
}

const Loading = ({ start }: LoadingProps) => {
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
      <div ref={blackScreen} className="bg-secondary absolute inset-0 z-10" />

      <div
        style={{ backgroundColor: "rgb(174, 102, 103)" }}
        className="w-full h-screen relative isolate"
      >
        <div
          style={{ backgroundImage: "url(/noise.png" }}
          className="absolute inset-0 opacity-20 -z-10"
        />
      </div>
    </>
  );
};

export default Loading;
