import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type FadeProps<As extends React.ElementType = "div"> =
  React.HTMLAttributes<HTMLDivElement> & {
    as?: As;
    direction?: "up" | "down";
    trigger?: ScrollTrigger.Vars;
    gsapFrom?: gsap.TweenVars;
    gsapTo?: gsap.TweenVars;
    wrapperClassName?: string;
    wrapperId?: string;
  };

const Fade = <As extends React.ElementType = "div">({
  as,
  children,
  direction = "up",
  trigger,
  gsapFrom,
  gsapTo,
  wrapperClassName,
  wrapperId,
  className,
  ...props
}: FadeProps<As>) => {
  const Component = as || "div";

  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        innerRef.current,
        {
          opacity: 0,
          y: 100 * (direction === "up" ? 1 : -1),
          ...gsapFrom,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          ...gsapTo,
          scrollTrigger: {
            trigger: outerRef.current,
            start: "bottom bottom",
            ...trigger,
          },
        },
      );
    },
    { dependencies: [], revertOnUpdate: true },
  );

  return (
    <Component ref={outerRef} id={wrapperId} className={wrapperClassName}>
      <span ref={innerRef} className={`inline-block ${className}`} {...props}>
        {children}
      </span>
    </Component>
  );
};

export default Fade;
