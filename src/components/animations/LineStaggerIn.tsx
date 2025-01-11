import gsap from "gsap";
import { useEffect, useRef } from "react";

const split = (text: string) => {
  return text.split("").map((char, index) => {
    return (
      <span
        style={{ opacity: 0 }}
        key={index}
        className="inline-block will-change-transform"
      >
        {char === " " ? "\u00A0" : char}
      </span>
    );
  });
};

interface LineStaggerInProps {
  children: string;
  className?: string;
  config?: gsap.TweenVars;
}

const LineStaggerIn = ({
  children,
  className = "",
  config = {},
}: LineStaggerInProps) => {
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;

    const chars = lineRef.current.querySelectorAll("span");

    gsap.fromTo(
      chars,
      { opacity: 0, y: "-0.75em" },
      {
        opacity: 1,
        y: 0,
        stagger: 0.0225,
        delay: 0.5,
        duration: 0.3,
        ease: "power1.out",
        ...config,
      }
    );
  }, []);

  return (
    <span ref={lineRef} className={`inline-block ${className}`}>
      {split(children)}
    </span>
  );
};

export default LineStaggerIn;
