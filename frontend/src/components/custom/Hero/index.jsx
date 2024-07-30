import React, { useState } from "react";
import todoO from "@/assets/todo-o.png";
import sloganImage from "@/assets/studying.png";
import { IoMenu } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [isActiveNavDropDown, setIsActiveNavDropDown] = useState(false);

  const handleOnSelectNavDropDown = () => {
    setIsActiveNavDropDown(!isActiveNavDropDown);
  };
  return (
    <div className="flex w-full h-[288px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] bg-white">
      <div className="flex w-full h-full bg-[#FDF6F6] rounded-br-full shadow-2xl">
        <div className="flex flex-col gap-2 w-full">
          <div className="grid grid-cols-12 w-full mt-5">
            {/* logo section start */}
            <div className="col-span-3 flex items-center">
              <div className="ml-[20%] p-2">
                <img
                  src={todoO}
                  className="h-[50px] md:h[70px] lg:h-[80px] drop-shadow-2xl"
                />
              </div>
            </div>
            {/* logo section end */}

            {/* nav section start */}
            <div className="col-span-9 flex items-center justify-end">
              <div className="mr-[20px] w-full relative">
                {/* navbar button for smaller screen- start */}
                <div className="sm:hidden justify-end flex">
                  <IoMenu
                    className="text-3xl"
                    onClick={handleOnSelectNavDropDown}
                  />
                </div>

                {isActiveNavDropDown && (
                  <div className="flex flex-col bg-[#002C54] bg-opacity-50 rounded-xl text-white/90 w-52 justify-end items-start absolute right-0 p-4 gap-5 sm:hidden">
                    <div className="text-lg hover:text-[#C5001A] active:scale-95">
                      Home
                    </div>
                    <div className="text-lg hover:text-[#C5001A] active:scale-95">
                      Features
                    </div>
                    <div className="text-lg hover:text-[#C5001A] active:scale-95">
                      Teams
                    </div>
                    <div className="text-lg hover:text-[#C5001A] active:scale-95">
                      Resources
                    </div>
                    <div className="text-lg hover:text-[#C5001A] active:scale-95">
                      Pricing
                    </div>
                    <hr className="" />
                    <div className="text-lg hover:text-[#C5001A] active:scale-95">
                      Login
                    </div>
                    <div className="text-lg hover:text-[#C5001A] active:scale-95">
                      Signup
                    </div>
                  </div>
                )}
                {/* navbar button for smaller screen- end */}

                {/* navbar for screen above md- start */}
                <div className="hidden sm:block">
                  <div className="grid grid-cols-12 gap-5 w-full">
                    <div className="col-span-9 flex justify-evenly items-center gap-2">
                      <div className="text-sm lg:text-lg text-[#002C54]">
                        Home
                      </div>
                      <div className="text-sm lg:text-lg text-[#002C54]">
                        Features
                      </div>
                      <div className="text-sm lg:text-lg text-[#002C54]">
                        Teams
                      </div>
                      <div className="text-sm lg:text-lg text-[#002C54]">
                        Resources
                      </div>
                      <div className="text-sm lg:text-lg text-[#002C54]">
                        Pricing
                      </div>
                    </div>
                    <div className="col-span-3 flex justify-evenly gap-2 items-center">
                      <Link to={"/auth"} className="text-sm lg:text-lg text-[#002C54]">
                        Login
                      </Link>
                      <div className=" text-[#002C54]">
                        <Button className="rounded-full sm:w-16 sm:h-8 lg:w-28 shadow-xl text-sm lg:text-lg lg:h-10 mr-4 bg-[#C5001A] hover:bg-[#A80015] active:scale-95 transition-all ease-in-out"
                          onClick={() => {
                            navigate("/auth")
                          }}
                        >
                          Signup
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* navbar for screen above md- end */}
            </div>
            {/* nav section end */}
          </div>

          {/* hero section start */}
          <div className="grid grid-cols-12 h-full">
            <div className="col-span-12 sm:col-span-8 grid grid-rows-auto gap-4 p-4">
              <div className="w-full mx-auto flex items-center justify-start">
                <h1 className="text-xl  sm:w-[80%] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-left">
                  Now organizing your task and life, made easy.
                </h1>
              </div>
              <div className="w-full mx-auto flex items-start justify-start">
                <h3 className="text-xs w-[60%] sm:w-[80%] sm:text-base md:text-lg lg:text-xl text-left">
                  Simplify life for both you and your team. The world's #1 task
                  manager and to-do list app.
                </h3>
              </div>
              <div className="w-full mx-auto flex items-start justify-start md:justify-center">
                <Button className="rounded-full w-20 h-8 text-xs sm:w-28 sm:h-10 sm:text-lg md:w-32 md:h-12 md:text-xl lg:w-40 lg:h-14 lg:text-2xl xl:w-48 xl:h-16 xl:text-3xl  mr-4 shadow-xl  bg-[#C5001A] hover:bg-[#A80015] active:scale-95 transition-all ease-in-out"
                 onClick={() => {
                  navigate("/auth")
                }}
                >
                  Start Now
                </Button>
              </div>
            </div>

            {/* image section for screen mode than md- start */}
            <div className="col-span-4 hidden sm:block">
              <img
                src={sloganImage}
                className="sm:h-[150px] md:h-[200px] lg:h-[250px] xl:h-[340px] drop-shadow-2xl object-contain"
              />
            </div>
            {/* image section for screen mode than md- end */}
          </div>
          {/* hero section end */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
