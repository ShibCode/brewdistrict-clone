import Hero from "./Hero";
import Beers from "./Beers";
import Model from "./Model";

const Home = () => {
  return (
    <>
      <div
        style={{ backgroundColor: "rgb(174, 102, 103)" }}
        className="relative isolate"
      >
        <div
          style={{ backgroundImage: "url(/noise.png" }}
          className="absolute inset-0 opacity-20 -z-10"
        />

        <Model />

        <Hero />
        <Beers />
      </div>
    </>
  );
};

export default Home;
