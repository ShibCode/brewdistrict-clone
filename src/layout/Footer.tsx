const Footer = () => {
  return (
    <footer className="flex justify-center">
      <div className="flex w-[90%] max-w-[1280px] justify-between py-8">
        <div className="flex gap-[0.5em] font-eczar text-[0.75vw]">
          <p className="opacity-40">
            © 2025 BrewDistrict24 - All rights reserved
          </p>
          <span aria-hidden>|</span>
          <ul className="flex gap-[0.5em]">
            <li>Cookies</li>
            <span aria-hidden>|</span>
            <li>Privacy policy</li>
            <span aria-hidden>|</span>
            <li>Return policy</li>
            <span aria-hidden>|</span>
            <li>General conditions</li>
          </ul>
        </div>

        <p className="font-eczar text-[0.75vw]">
          <span className="opacity-40">Cloned By</span> ShibCode
        </p>
      </div>
    </footer>
  );
};

export default Footer;
