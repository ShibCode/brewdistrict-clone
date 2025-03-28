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
      className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between transition-all duration-500 [--k:3.5vw] min-[450px]:[--k:3vw] xs:[--k:2.5vw] md:[--k:1.9vw] lg:[--k:1.4vw] xl:[--k:1.2vw] 2xl:[--k:1vw] ${
        isScrolled
          ? "h-[calc(5.56*var(--k))] bg-black/5 backdrop-blur-[12px] xs:h-[calc(3.85*var(--k))]"
          : "h-[calc(5.56*var(--k))] bg-black/0"
      }`}
    >
      <div
        className={`absolute bottom-0 h-px bg-primary transition-all duration-500 ${
          isScrolled ? "left-0 w-[50vw]" : "left-[1.7vw] w-[35vw] md:w-[40vw]"
        }`}
      />
      <div
        className={`absolute bottom-0 h-px bg-primary transition-all duration-500 ${
          isScrolled ? "right-0 w-[50vw]" : "right-[1.7vw] w-[35vw] md:w-[40vw]"
        }`}
      />

      <div
        style={{ gap: "calc(2 * var(--k))", width: "calc(41 * var(--k))" }}
        className="flex h-full items-center"
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
          className="font-freudian rounded-full bg-model text-black transition-all duration-300 hover:bg-primary lg:hidden"
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
        className={`absolute left-1/2 top-0 -translate-x-1/2 scale-75 py-1.5 transition-all duration-500 before:absolute before:-z-10 before:aspect-square before:w-full before:bg-black before:transition-all before:duration-500 after:absolute after:bottom-[calc(16.2*var(--k))] after:left-1/2 after:-z-10 after:aspect-square after:-translate-x-1/2 after:bg-black after:transition-all after:duration-500 xs:bottom-0 xs:top-[unset] xs:translate-y-1/2 xs:py-5 lg:scale-100 ${
          isScrolled
            ? "w-[calc(5.95*var(--k))] xs:w-[calc(3.73*var(--k))]"
            : "w-[calc(5.95*var(--k))] before:opacity-0 after:opacity-0"
        }`}
      >
        <Logo />
      </a>

      <div
        style={{ gap: "calc(2 * var(--k))", width: "calc(41 * var(--k))" }}
        className="flex h-full items-center justify-end"
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
          className="font-freudian hidden rounded-full bg-model text-black transition-all duration-300 hover:bg-primary lg:block"
        >
          ORDER NOW
        </button>

        <button
          style={{
            width: "calc(2.6 * var(--k))",
            height: "calc(2.6 * var(--k))",
            fontSize: "calc(1.2 * var(--k))",
          }}
          className="flex items-center justify-center rounded-full border border-primary transition-all duration-300 hover:opacity-60"
        >
          <IoIosCart />
        </button>

        <button
          style={{
            fontSize: "calc(1 * var(--k))",
            gap: "calc(0.8 * var(--k))",
          }}
          className="font-freudian flex items-center transition-all duration-300 hover:opacity-60"
        >
          <span className="hidden xs:inline">MENU</span>

          <svg
            style={{ width: "calc(1.8 * var(--k))" }}
            viewBox="0 0 30 24"
            fill="white"
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
