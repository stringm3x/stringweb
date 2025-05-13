import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="h-52 bg-green flex flex-row py-8 items-center justify-around ">
      <div className="w-1/3 justify-items-center">
        <Image
          src="/assets/strinnobgblack.png"
          width={160}
          height={500}
          alt="string"
        />
      </div>

      <div className="h-full w-1 bg-bg"></div>

      <div className="w-1/3 justify-items-center">
        <h1 className="text-xl text-bg font-bold">Cel. 2222000418</h1>
      </div>

      <div className="h-full w-1 bg-bg"></div>

      <div className="w-1/3 text-center">
        <h1 className="text-xl text-bg font-bold">
          © 2025. All rights reserved.
        </h1>
        <h1 className="text-xl text-bg font-bold">Philippians 4:13.</h1>
      </div>
    </div>
  );
};

export default Footer;
