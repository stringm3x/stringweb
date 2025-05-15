import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="md:h-52 bg-green flex flex-col md:flex-row px-5 md:px-0 py-8 items-center gap-5 md:justify-around ">
      <div className="md:w-1/3 justify-items-center">
        <Image
          src="/assets/strinnobgblack.png"
          width={160}
          height={500}
          alt="string"
        />
      </div>

      <div className="h-1 w-full md:h-full md:w-1 bg-bg"></div>

      <div className="md:w-1/3 flex flex-col gap-7 items-center">
        <div className="flex flex-row gap-5">
          <a href="https://www.facebook.com/profile.php?id=61576042750915">
            <FaFacebook className="text-bg w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/stringwebmx/">
            <FaInstagram className="text-bg w-6 h-6" />
          </a>
          <a href="https://www.tiktok.com/@stringmx">
            <FaTiktok className="text-bg w-6 h-6" />
          </a>
        </div>
        <h1 className="text-lg text-bg font-bold">Cel. 2222000418</h1>
      </div>

      <div className="h-1 w-full md:h-full md:w-1 bg-bg"></div>

      <div className="md:w-1/3 text-center">
        <h1 className="text-xl text-bg font-bold">
          © 2025. All rights reserved.
        </h1>
        <h1 className="text-xl text-bg font-bold">Philippians 4:13.</h1>
      </div>
    </div>
  );
};

export default Footer;
