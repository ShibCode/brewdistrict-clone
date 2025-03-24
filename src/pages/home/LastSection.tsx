import { useEffect, useRef } from "react";
import Cup from "../../components/svg/Cup";
import gsap from "gsap";

const marqueeData = [
  {
    title: "Proeflokaal Van Horst",
    category: "Horst",
    icon: Cup,
  },
  {
    title: "Proeflokaal Van Horst",
    category: "Horst",
    icon: Cup,
  },
  {
    title: "Proeflokaal Van Horst",
    category: "Horst",
    icon: Cup,
  },
  {
    title: "Proeflokaal Van Horst",
    category: "Horst",
    icon: Cup,
  },
];

const LastSection = () => {
  const marqueeWrapper = useRef<HTMLDivElement>(null);
  const marquee = useRef<HTMLDivElement>(null);

  const xPercent = useRef(0);
  const loop = useRef<number | null>(null);

  const lastPointerX = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    lastPointerX.current = e.clientX;
    document.body.style.cursor = "grabbing !important";
  };

  useEffect(() => {
    const moveMarquee = (distance: number) => {
      xPercent.current = gsap.utils.wrap(-100, 0, xPercent.current - distance);
    };

    const tick = () => {
      const unit = 1 / (marqueeData.length * 10);
      moveMarquee(unit);

      gsap.set(marquee.current, { xPercent: xPercent.current });

      loop.current = requestAnimationFrame(tick);
    };

    loop.current = requestAnimationFrame(tick);

    const handlePointerUp = () => (lastPointerX.current = null);

    const handlePointerMove = (e: PointerEvent) => {
      if (lastPointerX.current === null) return;

      const totalDistance = (lastPointerX.current - e.clientX) * 0.01;
      let moved = 0;

      const innerTick = () => {
        const distance = (totalDistance - moved) * 0.1;
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
    <section className="flex flex-col items-center gap-[2vw] pb-[5vw] pt-[13vw]">
      <div className="flex w-full max-w-[64vw]">
        <h2 className="w-[6em] flex-shrink-0 font-roseford text-[4vw] uppercase leading-[4.375vw]">
          BD24 IN YOUR HOOD?
        </h2>

        <div className="space-y-[1vw] pt-[0.675vw]">
          <p className="text-[1.125vw] leading-[1.125vw]">
            THE SMELL OF FRESHLY BREWED EXCITEMENT IS IN THE AIR
          </p>
          <p className="font-eczar text-[1vw] leading-[1.75vw]">
            Are you interested in selling our classic craft beers at your
            location? Contact us for more information about our beers, prices
            and possible collaborations. Together we will let your customers
            experience what truly ‘enjoying the moment’ is all about.
          </p>
        </div>
      </div>

      <div
        onPointerDown={handlePointerDown}
        ref={marqueeWrapper}
        className="w-full cursor-grab"
      >
        <div
          ref={marquee}
          className="relative flex w-max select-none gap-[5vw]"
        >
          <Strip />
          <Strip className="absolute left-full" />
        </div>
      </div>
    </section>
  );
};

export default LastSection;

const Strip = ({ className }: { className?: string }) => {
  return (
    <div className={`flex gap-[5vw] pl-[5vw] ${className}`}>
      {marqueeData.map((item, i) => (
        <div key={i} className="flex shrink-0 flex-col gap-[0.4vw]">
          <span className="font-roseford text-[2.6875vw] uppercase leading-[3.125vw]">
            {item.title}
          </span>
          <div className="flex gap-[0.6vw]">
            <item.icon className="w-[1.35vw] opacity-40" />
            <span className="text-[0.875vw] uppercase leading-[0.875vw]">
              {item.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
