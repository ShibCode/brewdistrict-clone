import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type HorizontalScaleProps<As extends React.ElementType = "div"> =
  PolymorphicProps<
    {
      trigger?: ScrollTrigger.Vars;
      gsapFrom?: gsap.TweenVars;
      gsapTo?: gsap.TweenVars;
    },
    As,
    "div"
  >;

export const HorizontalScale = <As extends React.ElementType = "div">({
  as,
  trigger,
  gsapFrom,
  gsapTo,
  children,
  ...props
}: HorizontalScaleProps<As>) => {
  const Component = as || "div";

  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        elementRef.current,
        {
          clipPath: "polygon(50% -100%, 50% 200%, 50% 200%, 50% -100%)",
          ...gsapFrom,
        },
        {
          clipPath: "polygon(0% -100%, 0% 200%, 100% 200%, 100% -100%)",
          duration: 1,
          ease: "power2.out",
          ...gsapTo,
          scrollTrigger: {
            trigger: elementRef.current,
            start: "bottom bottom",
            ...trigger,
          },
        },
      );
    },
    { dependencies: [], revertOnUpdate: true },
  );

  return (
    <Component ref={elementRef} {...props}>
      {children}
    </Component>
  );
};

export default HorizontalScale;
