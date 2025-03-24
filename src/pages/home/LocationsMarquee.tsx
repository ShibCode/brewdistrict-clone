import { useEffect, useRef } from "react";
import gsap from "gsap";
import { locations } from "./data";
import Fade from "../../components/animations/Fade";

const LocationsMarquee = () => {
  const marquee = useRef<HTMLDivElement>(null);

  const xPercent = useRef(0);
  const loop = useRef<number | null>(null);

  const lastPointerX = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    lastPointerX.current = e.clientX;
  };

  useEffect(() => {
    const moveMarquee = (distance: number) => {
      xPercent.current = gsap.utils.wrap(-100, 0, xPercent.current - distance);
      gsap.set(marquee.current, { xPercent: xPercent.current });
    };

    const tick = () => {
      const unit = 1 / (locations.length * 10);
      moveMarquee(unit);

      loop.current = requestAnimationFrame(tick);
    };

    loop.current = requestAnimationFrame(tick);

    const handlePointerUp = () => (lastPointerX.current = null);

    const handlePointerMove = (e: PointerEvent) => {
      if (lastPointerX.current === null) return;

      const acceleration = gsap.utils.clamp(
        0.005,
        0.03,
        Number(document.body.getAttribute("data-acceleration")),
      );

      const totalDistance = (lastPointerX.current - e.clientX) * acceleration;

      if (isNaN(totalDistance) || !isFinite(totalDistance)) return;

      let moved = 0;

      const innerTick = () => {
        const distance = (totalDistance - moved) * 0.05;
        moveMarquee(distance);
        moved += distance;

        if (Math.abs(totalDistance - moved) < 0.01) {
          gsap.ticker.remove(innerTick);
        }
      };

      gsap.ticker.add(innerTick);

      lastPointerX.current = e.clientX;
    };

    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointermove", handlePointerMove);

    return () => {
      if (loop.current) cancelAnimationFrame(loop.current);

      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <Fade
      trigger={{ trigger: "#last-section", start: "60% bottom" }}
      gsapTo={{ delay: 0.35 }}
      onPointerDown={handlePointerDown}
      className="w-full cursor-grab"
    >
      <div ref={marquee} className="relative flex w-max select-none gap-[5vw]">
        <Strip />
        <Strip className="absolute left-full" aria-hidden />
      </div>
    </Fade>
  );
};

export default LocationsMarquee;

const Strip = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const isClickValid = useRef(false);

  return (
    <div className={`flex gap-[5vw] pl-[5vw] ${className}`} {...props}>
      {locations.map((location, i) => (
        <a
          href="#"
          target="_blank"
          draggable={false}
          onClick={(e) => {
            e.preventDefault();
            if (isClickValid.current) window.open("#", "_blank");
          }}
          onPointerMove={() => (isClickValid.current = false)}
          onPointerDown={() => (isClickValid.current = true)}
          key={i}
          className="flex shrink-0 flex-col gap-[0.4vw] transition-all duration-300 hover:opacity-60"
        >
          <span className="font-roseford text-[2.6875vw] uppercase leading-[3.125vw]">
            {location.name}
          </span>
          <div className="flex gap-[0.6vw]">
            <location.icon className="w-[1.35vw] opacity-40" />
            <span className="text-[0.875vw] uppercase leading-[0.875vw]">
              {location.location}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
};
