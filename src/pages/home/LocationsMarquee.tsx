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

    const slideMarquee = (x: number) => {
      if (lastPointerX.current === null) return;

      const acceleration = gsap.utils.clamp(
        0.005,
        0.03,
        Number(document.body.getAttribute("data-acceleration")),
      );

      const totalDistance = (lastPointerX.current - x) * acceleration;

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

      lastPointerX.current = x;
    };

    const cancelSlide = () => (lastPointerX.current = null);

    const handleMouseMove = (e: MouseEvent) => {
      slideMarquee(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      slideMarquee(e.touches[0].clientX);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("mouseup", cancelSlide);
    document.addEventListener("touchend", cancelSlide);

    return () => {
      if (loop.current) cancelAnimationFrame(loop.current);

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", cancelSlide);
      document.addEventListener("touchend", cancelSlide);
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
        <Strip className="absolute left-full" />
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
    <div
      className={`flex gap-[10vw] pl-[5vw] sm:gap-[5vw] ${className}`}
      {...props}
    >
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
          className="flex shrink-0 flex-col gap-[1vw] transition-all duration-300 hover:opacity-60 sm:gap-[0.4vw]"
        >
          <span className="font-roseford text-[6vw] uppercase leading-[1.2] sm:text-[4vw] lg:text-[2.6875vw]">
            {location.name}
          </span>
          <div className="flex gap-[0.5em] text-[3.45vw] sm:text-[1.85vw] lg:gap-[0.6vw] lg:text-[0.875vw]">
            <location.icon className="w-[1.2em] opacity-40" />
            <span className="uppercase leading-none">{location.location}</span>
          </div>
        </a>
      ))}
    </div>
  );
};
