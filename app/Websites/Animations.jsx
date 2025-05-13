import React from "react";
import TextPressure from "../UI/TextPressure";

const Animations = () => {
  return (
    <div className="h-auto py-20 flex flex-col gap-5">
      <div className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center">
        <h1 >
          No hay limites para soñar en
        </h1>
        <h1><span className="text-green">LA WEBSITE</span> de tus <span className="w-full bg-green">sueños</span></h1>
      </div>

      <div>
        <TextPressure
          text="Hello!"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#ffffff"
          strokeColor="#ff0000"
          minFontSize={36}
        />
      </div>

      <h1 className="font-anton text-end text-xl lg:text-3xl">Con animaciones</h1>
    </div>
  );
};

export default Animations;
