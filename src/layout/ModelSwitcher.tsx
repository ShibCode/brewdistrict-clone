import { useEffect, useRef } from "react";
import { useModel } from "../context/ModelProvider";
import gsap from "gsap";

const ModelSwitcher = () => {
  const { nextModel } = useModel();

  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.to(button.current, { opacity: 1, delay: 1.25 });
  }, []);

  return (
    <button
      ref={button}
      onClick={nextModel}
      style={{ opacity: 0 }}
      className="group fixed bottom-0 right-1/2 z-50 flex aspect-square w-[44vw] translate-x-1/2 translate-y-[65%] flex-col items-center justify-center rounded-full pb-[26vw] text-[3.5vw] transition-colors duration-300 sm:w-[33vw] sm:pb-[20vw] sm:text-[2.6vw] lg:bottom-auto lg:right-0 lg:top-1/2 lg:w-[12.5vw] lg:-translate-y-1/2 lg:translate-x-[58%] lg:pb-0 lg:pl-[0.4vw] lg:pr-[7vw] lg:text-[1.25vw] xl:text-[1vw]"
    >
      <div className="absolute inset-0 rounded-full bg-model transition-all duration-300 group-hover:-translate-y-[3%] group-hover:lg:-translate-x-[4%] group-hover:lg:translate-y-0" />

      <div className="relative overflow-hidden">
        <div className="translate-anim absolute inset-0 flex justify-end">
          <div className="grid size-full shrink-0 place-items-center">
            <svg viewBox="0 0 13.63 13.63" className="w-[0.9em]">
              <polygon points="8.79 5.37 13.52 1.16 10.45 .48 3.85 7.08 6.56 7.39 1.2 13.58 11.29 5.78 8.79 5.37"></polygon>
              <path d="m12.46,3.95c-.25.1-.38.4-.27.65.9,2.18.4,4.66-1.27,6.33-1.55,1.55-3.82,2.1-5.91,1.42-.27-.08-.54.06-.63.32-.08.26.06.54.32.63.7.23,1.41.33,2.11.33,1.78,0,3.51-.7,4.81-2,1.95-1.95,2.54-4.86,1.48-7.42-.1-.26-.4-.38-.65-.27Z"></path>
              <path d="m1.79,11.15c.11,0,.21-.03.3-.1.22-.17.26-.48.09-.7-1.76-2.3-1.54-5.59.51-7.64,1.39-1.39,3.38-1.98,5.31-1.58.27.06.54-.12.59-.39s-.12-.54-.39-.59C5.95-.33,3.62.36,1.99,2-.42,4.41-.67,8.26,1.4,10.95c.1.13.25.2.4.2Z"></path>
            </svg>
          </div>

          <div className="size-full shrink-0" />
          <div className="size-full shrink-0" />
          <div className="size-full shrink-0" />
          <div className="size-full shrink-0" />

          <div className="grid size-full shrink-0 place-items-center">
            <svg viewBox="0 0 13.63 13.63" className="w-[0.9em]">
              <polygon points="8.79 5.37 13.52 1.16 10.45 .48 3.85 7.08 6.56 7.39 1.2 13.58 11.29 5.78 8.79 5.37"></polygon>
              <path d="m12.46,3.95c-.25.1-.38.4-.27.65.9,2.18.4,4.66-1.27,6.33-1.55,1.55-3.82,2.1-5.91,1.42-.27-.08-.54.06-.63.32-.08.26.06.54.32.63.7.23,1.41.33,2.11.33,1.78,0,3.51-.7,4.81-2,1.95-1.95,2.54-4.86,1.48-7.42-.1-.26-.4-.38-.65-.27Z"></path>
              <path d="m1.79,11.15c.11,0,.21-.03.3-.1.22-.17.26-.48.09-.7-1.76-2.3-1.54-5.59.51-7.64,1.39-1.39,3.38-1.98,5.31-1.58.27.06.54-.12.59-.39s-.12-.54-.39-.59C5.95-.33,3.62.36,1.99,2-.42,4.41-.67,8.26,1.4,10.95c.1.13.25.2.4.2Z"></path>
            </svg>
          </div>
        </div>

        <svg viewBox="0 0 19.26 37.44" className="w-[1.56em]">
          <path d="m2.82,34.83l.99,2.6h11.67l.97-2.6c.68-.12,1.31-.44,1.81-.94.65-.65,1-1.51,1-2.42V7.08c0-.48-.28-.89-.69-1.1l-1.58-3.08c.26-.31.42-.74.4-1.22.02-.9-.53-1.64-1.27-1.68H3.03c-.72.04-1.27.78-1.25,1.66-.01.52.16.99.46,1.3l-1.55,3.02c-.41.21-.69.62-.69,1.1v24.38c0,1.68,1.22,3.08,2.82,3.37Zm1.68,1.6l-.59-1.54h11.44l-.57,1.54H4.51ZM1,7.08c0-.14.11-.25.25-.25h16.76c.14,0,.25.11.25.25v22.79H1V7.08ZM3.05,1h13.05c.11,0,.31.26.3.66v.03c0,.4-.19.66-.27.66H3.08c-.11,0-.31-.26-.29-.69,0-.4.19-.66.27-.66Zm.11,2.36h12.95l1.27,2.48H1.89l1.27-2.48ZM1,30.87h17.26v.59c0,.65-.25,1.26-.71,1.72-.46.46-1.07.71-1.72.71H3.43c-1.34,0-2.43-1.09-2.43-2.43v-.59Z"></path>
        </svg>
      </div>

      <svg viewBox="0 0 35.8 7.7" className="w-[2.4em]">
        <path d="m28.51,1.65l1.25-.72c.24-.14.32-.44.18-.68-.14-.24-.45-.32-.68-.18l-2.62,1.51c-.24.14-.32.44-.18.68,0,0,0,0,0,0,.03.07.08.13.14.18l2.62,2.05c.09.07.2.11.31.11.15,0,.29-.07.39-.19.17-.22.13-.53-.08-.7l-1.34-1.05c4.9.61,6.24,1.46,6.3,1.72-.19.81-6.16,2.32-16.9,2.32S1.19,5.19,1,4.39c.06-.27,1.38-1.11,6.2-1.72l-1.32,1.04c-.22.17-.25.48-.08.7.1.13.25.19.39.19.11,0,.22-.04.31-.11l2.62-2.05c.06-.05.1-.11.14-.18,0,0,0,0,0,0,.14-.24.05-.54-.18-.68L6.45.07c-.24-.14-.54-.06-.68.18-.14.24-.05.54.18.68l1.27.73C2.43,2.25,0,3.17,0,4.39c0,.68.57,1.68,5.52,2.49,3.31.54,7.71.83,12.38.83s9.07-.29,12.38-.83c4.94-.8,5.52-1.8,5.52-2.49,0-1.23-2.46-2.15-7.29-2.74Z"></path>
      </svg>
    </button>
  );
};

export default ModelSwitcher;
