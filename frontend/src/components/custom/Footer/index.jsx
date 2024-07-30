import React from "react";
import todoO from "@/assets/todo-o.png";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="relative overflow-hidden mt-40 ">
      <div className="absolute inset-0 bg-gradient-to-t from-[#002C54] to-transparent opacity-50"></div>
      <div className="relative z-10 mt-20">
        <div className="flex flex-col md:grid grid-cols-12">
          {/* section 1 start */}
          <div className="col-span-4 flex flex-col justify-center items-center gap-5 md:justify-start md:items-start md:mx-auto mb-10">
            <img
              src={todoO}
              className="h-[50px] sm:h-[70px] md:h-[40px] lg:h-[80px] drop-shadow-2xl"
            />
            <h3 className="text-sm sm:text-base md:text-xs  lg:text-base xl:text-xl italic text-[#002C54] text-opacity-80">Join us to organize your task easily with todo-o.</h3>
          </div>
          {/* section 1 end */}
          {/* section 2 start */}
          <div className="col-span-4 grid grid-cols-12 text-xl font-bold m-2 text-[#002C54] text-opacity-80">
            <div className="col-span-6 flex flex-col gap-2">
              <h3 className="">Features</h3>
              <div className="p-2 flex flex-col gap-4 text-base font-semibold">
              <span>How It Works</span>
              <span>For Teams</span>
              <span>Pricing</span>
              </div>
            </div>
            <div className="col-span-6 flex flex-col gap-2">
              <h3 className="">Resources</h3>
              <div className="p-2 flex flex-col gap-4 text-base font-semibold">
              <span>Download App</span>
              <span>Help Center</span>
              <span>Productivity Tips</span>
              </div>
            </div>
          </div>
          {/* section 2 end */}
          {/* section 3 start */}
          <div className="col-span-4 grid grid-cols-12 text-xl font-bold m-2 text-[#002C54] text-opacity-80">
            <div className="col-span-6 flex flex-col gap-2">
              <h3 className="">Company</h3>
              <div className="p-2 flex flex-col gap-4 text-base font-semibold">
              <span>About us</span>
              <span>Career</span>
              <span>Inspiration Hub</span>
              <span>Press</span>
              </div>
            </div>
            <div className="col-span-6 flex flex-col gap-2">
              <h3 className="">Social</h3>
              <div className="p-2 flex flex-col gap-4 text-md font-semibold">
              <span><FaFacebook/></span>
              <span>< FaInstagram/></span>
              <span><FaTwitter/></span>
              <span><FaYoutube/></span>
              </div>
            </div>
          </div>
          {/* section 3 end */}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold p-2 text-[#002C54] text-opacity-90">Todo-O</h3>
        <p className="text-sm  sm:text-base  p-2 text-[#002C54] text-opacity-90">Security I Privacy I Terms @ todo-o.com</p>
      </div>
    </div>
  );
};

export default Footer;
