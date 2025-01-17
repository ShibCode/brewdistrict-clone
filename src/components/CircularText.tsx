// import gsap from "gsap";
// import React, { useEffect, useMemo, useRef } from "react";

// interface CircularNavProps {
//   text: string;
//   links: { label: string }[];
//   gap?: number;
// }

// const CircularNav = ({ text, links, gap = 0 }: CircularNavProps) => {
//   const circle = useRef<HTMLDivElement>(null);
//   const container = useRef<HTMLDivElement>(null);

//   const rotation = useRef(0);

//   const totalLength = useMemo(
//     () => text.split(" ").reduce((curr, acc) => curr + acc.length, 0),
//     []
//   );

//   useEffect(() => {
//     const accumulateWidth = (chars: Element[]) => {
//       return chars.reduce((acc, curr) => acc + curr.clientWidth, 0);
//     };

//     const words = [...document.querySelectorAll(".link-word")];
//     const chars = [...document.querySelectorAll<HTMLSpanElement>(".link-char")];

//     const handleResize = () => {
//       if (!circle.current || !container.current) return;

//       const totalWidth = accumulateWidth(chars);
//       const fontSize = parseInt(
//         getComputedStyle(circle.current).fontSize.split("px")[0]
//       );

//       const radius = circle.current.clientWidth / 2 - fontSize / 2;

//       const offset = 0;

//       chars.reduce(
//         (acc, curr) => {
//           const rawAngleDeg = (acc.width / totalWidth) * 360 + offset;

//           const angleDeg = ((rawAngleDeg % 360) + 360) % 360;
//           const angleRad = angleDeg * (Math.PI / 180);

//           curr.style.translate = `${radius * Math.sin(angleRad)}px ${
//             -radius * Math.cos(angleRad)
//           }px`;

//           curr.style.rotate = `${angleDeg}deg`;

//           return { ...acc, width: acc.width + curr.clientWidth };
//         },
//         { width: 0 }
//       );
//     };

//     handleResize();

//     // const rotate = () => {
//     //   const currentRotation = Number(
//     //     container.current.style.rotate.split("deg")[0]
//     //   );

//     //   container.current.style.rotate = `${
//     //     currentRotation + (rotation.current - currentRotation) * 0.2
//     //   }deg`;

//     //   words.reduce((start, word, i) => {
//     //     const wordLength = links[i].label.length;
//     //     const lengthFactor = wordLength / totalLength;

//     //     const adjustedStart = ((start % 1) + 1) % 1;
//     //     const adjustedEnd = (((start + lengthFactor) % 1) + 1) % 1;

//     //     const rawCurrentRotation = Number(
//     //       container.current.style.rotate.split("deg")[0]
//     //     );
//     //     const currentRotation =
//     //       360 - (((rawCurrentRotation % 360) + 360) % 360);

//     //     if (adjustedEnd < adjustedStart) {
//     //       if (
//     //         currentRotation > 180 &&
//     //         currentRotation >= adjustedStart * 360 &&
//     //         (currentRotation <= adjustedEnd * 360 ||
//     //           currentRotation <= adjustedEnd * 360 + 360)
//     //       ) {
//     //         word.style.opacity = "1";
//     //       } else if (
//     //         currentRotation <= 180 &&
//     //         (currentRotation >= adjustedStart * 360 ||
//     //           currentRotation >= adjustedStart * 360 - 360) &&
//     //         currentRotation <= adjustedEnd * 360
//     //       ) {
//     //         word.style.opacity = "1";
//     //       } else word.style.opacity = "0.25";

//     //       return start + lengthFactor;
//     //     }

//     //     if (
//     //       currentRotation >= adjustedStart * 360 &&
//     //       currentRotation <= adjustedEnd * 360
//     //     ) {
//     //       word.style.opacity = "1";
//     //     } else word.style.opacity = "0.25";

//     //     return start + lengthFactor;
//     //   }, -(links[0].label.length / totalLength) * 0.5);

//     //   requestAnimationFrame(rotate);
//     // };

//     // requestAnimationFrame(rotate);

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <div className="w-full h-full overflow-hidden relative">
//       <div
//         ref={circle}
//         className="w-full aspect-square absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[1vw]"
//       >
//         <div
//           ref={container}
//           className="flex justify-center items-center w-full h-full"
//         >
//           {text.split(" ").map((word, i) => (
//             <div
//               key={i}
//               className="absolute flex justify-center items-center link-word cursor-pointer transition-opacity duration-300"
//             >
//               {word.split("").map((char, j) => (
//                 <span
//                   key={j}
//                   className="absolute leading-none link-char flex justify-center items-center w-[1em]"
//                 >
//                   {char}
//                 </span>
//               ))}

//               {new Array(gap).fill(0).map((_, i) => (
//                 <span
//                   key={i}
//                   className="absolute leading-none link-char w-[1em] flex justify-center items-center"
//                 ></span>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CircularNav;
