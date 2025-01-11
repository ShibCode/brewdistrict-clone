import gsap from "gsap";
import React, { useEffect, useRef } from "react";

interface HorizontalScaleOutProps {
  children: React.ReactNode;
  className?: string;
  config?: gsap.TweenVars;
}

const HorizontalScaleOut = ({
  children,
  className = "",
  config = {},
}: HorizontalScaleOutProps) => {
  const elemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elemRef.current) return;

    gsap.fromTo(
      elemRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ...config,
      }
    );
  }, []);

  return (
    <div
      ref={elemRef}
      style={{ transform: "scaleX(0)" }}
      className={`${className}`}
    >
      {children}
    </div>
  );
};

export default HorizontalScaleOut;
