import React from "react";
import Image from "next/image";

const images = [
  { id: 1, img: "/assets/tabletrespo.png" },
  { id: 2, img: "/assets/laprespo.png" },
  { id: 3, img: "/assets/celrespo.png" },
];

const Responsive = () => {
  return (
    <section className="content-center w-full py-20 md:px-10">
      <div className="flex flex-col gap-2 justify-self-end px-4 md:px-0">
        <h1 className="text-center text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
          <span className="bg-green">Completamente</span>{" "}
          <span className="text-green">responsivo</span>.
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row py-20">
        {images.map((images) => (
          <div key={images.id} className="">
            <Image src={images.img} alt="incode" width={1000} height={1000} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Responsive;
