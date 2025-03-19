import gsap from "gsap";
import React, { useEffect, useRef } from "react";

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  config?: gsap.TweenVars;
}

const FadeUp = ({ children, className = "", config = {} }: FadeUpProps) => {
  const elemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elemRef.current) return;

    gsap.fromTo(
      elemRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        ...config,
      },
    );
  }, []);

  return (
    <div ref={elemRef} style={{ opacity: 0 }} className={`${className}`}>
      {children}
    </div>
  );
};

export default FadeUp;
