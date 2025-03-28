import { useCallback, useEffect, useRef } from "react";
import { imageSequence as imagesSrc } from "./data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ImageSequence = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const activeImage = useRef(0);

  const loadAllImages = () => {
    images.current = [];

    imagesSrc.forEach((src, i) => {
      const image = new Image();
      image.src = src;

      image.addEventListener("load", function handleLoad() {
        images.current[i] = image;
        image.removeEventListener("load", handleLoad);
        renderActiveImage();
      });
    });
  };

  const renderActiveImage = useCallback(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    const canvas = canvasRef.current!;

    const image = images.current[activeImage.current];
    if (!image) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const windowAspect = window.innerWidth / window.innerHeight;
    const imageAspect = image.width / image.height;

    let width, height;
    let dx = 0;
    let dy = 0;

    if (windowAspect > imageAspect) {
      width = canvas.width;
      height = image.height * (width / image.width);
      dy = -(height - window.innerHeight) / 2;
    } else {
      height = canvas.height;
      width = image.width * (height / image.height);
      dx = -(width - window.innerWidth) / 2;
    }

    context.drawImage(image, dx, dy, width, height);
  }, []);

  const handleResize = () => {
    if (!canvasRef.current) return;

    const { width, height } = getComputedStyle(canvasRef.current);

    canvasRef.current.width = parseInt(width);
    canvasRef.current.height = parseInt(height);

    if (images.current.length) renderActiveImage();
  };

  useEffect(() => {
    loadAllImages();

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useGSAP(
    () => {
      if (!canvasRef.current) return;

      const scrollTrigger: ScrollTrigger.Vars = {
        trigger: canvasRef.current,
        start: "top bottom",
        end: "top top",
        scrub: true,
        onUpdate: ({ progress }) => {
          activeImage.current = Math.round(progress * (imagesSrc.length - 1));
          renderActiveImage();
        },
      };

      gsap.fromTo(
        canvasRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "none", scrollTrigger },
      );
    },
    {
      dependencies: [],
      revertOnUpdate: true,
    },
  );

  return (
    <canvas
      ref={canvasRef}
      className="relative h-[90vw] w-full bg-secondary lg:h-screen"
    />
  );
};

export default ImageSequence;
