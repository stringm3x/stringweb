import LetterGlitch from "../UI/letterglitch";

const Hero = () => {
  return (
    <div id="inicio" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="font-anton text-9xl md:text-[300px] lg:text-[400px] xl:text-[500px] text-white">
          STRING
        </h1>
      </div>
    </div>
  );
};

export default Hero;
