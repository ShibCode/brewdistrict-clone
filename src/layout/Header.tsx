import Logo from "../components/svg/Logo";
import { IoIosCart } from "react-icons/io";
import { useEffect, useState } from "react";
import ClickTheCan from "../components/svg/ClickTheCan";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaUntappd,
} from "react-icons/fa6";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`px-[1.7vw] flex justify-between items-center fixed top-0 left-0 w-full transition-all duration-500 z-50 ${
        isScrolled
          ? "h-[3.85vw] bg-black/5 backdrop-blur-[12px]"
          : "h-[5.56vw] bg-black/0"
      }`}
    >
      <div
        className={`absolute h-px bg-white bottom-0 transition-all duration-500 ${
          isScrolled ? "left-0 w-[50vw]" : "left-[1.7vw] w-[40vw]"
        }`}
      />
      <div
        className={`absolute h-px bg-white bottom-0 transition-all duration-500 ${
          isScrolled ? "right-0 w-[50vw]" : "right-[1.7vw] w-[40vw]"
        }`}
      />

      <div className="flex gap-[2vw] items-center w-[41vw] h-full">
        <a href="#top" className="font-freudian text-[1vw]">
          HOME
        </a>

        <div className="flex gap-[2vw] text-[0.9vw]">
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaLinkedinIn />
          </a>
          <a href="#">
            <FaFacebookF />
          </a>
          <a href="#">
            <FaUntappd />
          </a>
        </div>
      </div>

      <a
        href="#"
        className={`text-white py-5 absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 transition-all duration-500 before:absolute before:w-full before:aspect-square before:-z-10 before:bg-black after:absolute after:w-[23.5%] after:aspect-square after:-z-10 after:bg-black after:bottom-[16.2%] after:left-1/2 after:-translate-x-1/2 before:transition-all before:duration-500 after:transition-all after:duration-500 ${
          isScrolled
            ? "w-[3.73vw]"
            : "w-[5.95vw] before:opacity-0 after:opacity-0"
        }`}
      >
        <Logo />
      </a>

      <div className="flex justify-end gap-10 items-center w-[41vw] h-full">
        <ClickTheCan className="fill-white w-[3.33vw]" />

        <button className="bg-model text-black font-freudian text-[0.859vw] h-[2.64vw] px-[1.59vw] rounded-full hover:bg-white transition-all duration-300">
          ORDER NOW
        </button>

        <button className="size-10 border border-white rounded-full text-[19px] flex justify-center items-center hover:opacity-60 transition-all duration-300">
          <IoIosCart />
        </button>

        <button className="font-freudian text-[1vw] flex gap-[0.66vw] hover:opacity-60 transition-all duration-300 items-center">
          <span>MENU</span>

          <div className="flex flex-col gap-[7px] -translate-y-[15%]">
            <div className="w-[30px] h-0.5 bg-white" />
            <div className="w-[30px] h-0.5 bg-white" />
            <div className="w-[30px] h-0.5 bg-white" />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
