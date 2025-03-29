const Footer = () => {
  return (
    <footer className="mx-auto flex max-w-[80vw] justify-center pb-[14vw] md:max-w-[64vw] md:pb-[12vw] lg:pb-0">
      <div className="flex w-full flex-col items-center justify-between gap-[1.5vw] py-[1.625vw] font-eczar text-[2.5vw] sm:text-[1.75vw] md:text-[1.25vw] lg:flex-row lg:text-[0.75vw]">
        <div className="flex flex-wrap justify-center gap-[0.5em]">
          <p className="opacity-40">
            © 2025 BrewDistrict24 - All rights reserved
          </p>
          <span aria-hidden>|</span>
          <a href="#" target="_blank">
            Cookies
          </a>
          <span aria-hidden>|</span>
          <a href="#" target="_blank">
            Privacy policy
          </a>
          <span aria-hidden>|</span>
          <a href="#" target="_blank">
            Return policy
          </a>
          <span aria-hidden>|</span>
          <a href="#" target="_blank">
            General conditions
          </a>
        </div>

        <p>
          <span className="opacity-40">Cloned By</span> ShibCode
        </p>
      </div>
    </footer>
  );
};

export default Footer;
