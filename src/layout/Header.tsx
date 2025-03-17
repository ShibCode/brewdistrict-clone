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
      style={{
        paddingInline: "calc(1.7 * var(--k))",
      }}
      className={`flex justify-between items-center fixed top-0 left-0 w-full transition-all duration-500 z-50 [--k:3.5vw] min-[450px]:[--k:3vw] xs:[--k:2.5vw] md:[--k:1.9vw] lg:[--k:1.4vw] xl:[--k:1.2vw] 2xl:[--k:1vw] ${
        isScrolled
          ? "bg-black/5 backdrop-blur-[12px] h-[calc(5.56*var(--k))] xs:h-[calc(3.85*var(--k))]"
          : "bg-black/0 h-[calc(5.56*var(--k))]"
      }`}
    >
      <div
        className={`absolute h-px bg-primary bottom-0 transition-all duration-500 ${
          isScrolled ? "left-0 w-[50vw]" : "left-[1.7vw] w-[35vw] md:w-[40vw]"
        }`}
      />
      <div
        className={`absolute h-px bg-primary bottom-0 transition-all duration-500 ${
          isScrolled ? "right-0 w-[50vw]" : "right-[1.7vw] w-[35vw] md:w-[40vw]"
        }`}
      />

      <div
        style={{ gap: "calc(2 * var(--k))", width: "calc(41 * var(--k))" }}
        className="flex items-center h-full"
      >
        <a
          href="#top"
          style={{ fontSize: "calc(1 * var(--k))" }}
          className="font-freudian hidden xs:block"
        >
          HOME
        </a>

        <button
          style={{
            fontSize: "calc(0.859 * var(--k))",
            height: "calc(3.07em)",
            paddingInline: "calc(1.85em)",
          }}
          className="bg-model text-black font-freudian rounded-full hover:bg-primary transition-all duration-300 lg:hidden"
        >
          ORDER NOW
        </button>

        <div
          style={{
            gap: "calc(2 * var(--k))",
            fontSize: "calc(0.9 * var(--k))",
          }}
          className="hidden lg:flex"
        >
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
        className={`py-1.5 xs:py-5 absolute left-1/2 -translate-x-1/2 top-0 xs:top-[unset] xs:bottom-0 xs:translate-y-1/2 transition-all duration-500 before:absolute before:w-full before:aspect-square before:-z-10 before:bg-black after:absolute after:aspect-square after:-z-10 after:bg-black after:bottom-[calc(16.2*var(--k))] after:left-1/2 after:-translate-x-1/2 before:transition-all before:duration-500 after:transition-all after:duration-500 scale-75 lg:scale-100 ${
          isScrolled
            ? "w-[calc(5.95*var(--k))] xs:w-[calc(3.73*var(--k))]"
            : "before:opacity-0 after:opacity-0 w-[calc(5.95*var(--k))]"
        }`}
      >
        <Logo />
      </a>

      <div
        style={{ gap: "calc(2 * var(--k))", width: "calc(41 * var(--k))" }}
        className="flex justify-end items-center h-full"
      >
        <ClickTheCan
          style={{ width: "calc(3.33 * var(--k))" }}
          className="hidden lg:block"
        />

        <button
          style={{
            fontSize: "calc(0.859 * var(--k))",
            height: "calc(3.07em)",
            paddingInline: "calc(1.85em)",
          }}
          className="bg-model text-black font-freudian rounded-full hover:bg-primary transition-all duration-300 hidden lg:block"
        >
          ORDER NOW
        </button>

        <button
          style={{
            width: "calc(2.6 * var(--k))",
            height: "calc(2.6 * var(--k))",
            fontSize: "calc(1.2 * var(--k))",
          }}
          className="border border-primary rounded-full flex justify-center items-center hover:opacity-60 transition-all duration-300"
        >
          <IoIosCart />
        </button>

        <button
          style={{
            fontSize: "calc(1 * var(--k))",
            gap: "calc(0.66 * var(--k))",
          }}
          className="font-freudian flex hover:opacity-60 transition-all duration-300 items-center"
        >
          <span className="hidden xs:inline">MENU</span>

          <svg
            style={{ width: "calc(1.6 * var(--k))" }}
            height="24"
            viewBox="0 0 30 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="30" height="2" />
            <rect y="10" width="30" height="2" />
            <rect y="20" width="30" height="2" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
