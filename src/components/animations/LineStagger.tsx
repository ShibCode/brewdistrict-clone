import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type LineStaggerRootProps<As extends React.ElementType = "div"> =
  PolymorphicProps<
    {
      trigger?: ScrollTrigger.Vars;
      gsapFrom?: gsap.TweenVars;
      gsapTo?: gsap.TweenVars;
    },
    As,
    "div"
  >;

export const LineStaggerRoot = <As extends React.ElementType = "div">({
  as,
  trigger,
  gsapFrom,
  gsapTo,
  children,
  ...props
}: LineStaggerRootProps<As>) => {
  const Component = as || "div";

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const lines = innerRef.current!.querySelectorAll(".line");

      lines.forEach((line) => {
        const chars = line.querySelectorAll("span");

        gsap.fromTo(
          chars,
          { opacity: 0, y: "-0.75em", ...gsapFrom },
          {
            opacity: 1,
            y: 0,
            stagger: 0.0225,
            duration: 0.3,
            ease: "power1.out",
            ...gsapTo,
            scrollTrigger: {
              trigger: outerRef.current,
              start: "bottom bottom",
              ...trigger,
            },
          },
        );
      });
    },
    { dependencies: [], revertOnUpdate: true },
  );

  return (
    <Component ref={outerRef} {...props}>
      <span ref={innerRef} className="flex flex-col">
        {children}
      </span>
    </Component>
  );
};

type LineStaggerLineProps = Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "children"
> & { children: string };

export const LineStaggerLine = ({
  className,
  children,
  ...props
}: LineStaggerLineProps) => {
  return (
    <span className={`line ${className}`} {...props}>
      {children.split("").map((char, i) => (
        <Char key={i} char={char} />
      ))}
    </span>
  );
};

const Char = ({ char }: { char: string }) => {
  return (
    <span className="inline-block will-change-transform">
      {char === " " ? "\u00A0" : char}
    </span>
  );
};
