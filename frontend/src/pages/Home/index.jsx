import Footer from "@/components/custom/Footer";
import Hero from "@/components/custom/Hero";
import React from "react";
import LightBulb from "@/assets/lightbulb.png";
import Creative from "@/assets/creativity.png";
import Story from "@/assets/drawing.png"
import Study from "@/assets/studying.png"
const Home = () => {
  return (
    <>
      <Hero />
      <div className="grid mt-10 bg-white  h-full  p-2">
        {/* item 1 start */}
        <div className="grid grid-rows-12 md:flex gap-2">
          {/* image section start */}
          <div className="row-span-4 md:w-[40%] flex justify-center items-center">
            <img
              src={Story}
              className="h-[120px] sm:h-[160px] md:h[180px] lg:h-[200px] xl:h-[250px] drop-shadow-2xl"
            />
          </div>
          {/* image section end */}

          {/* text area start */}
          <div className="row-span-8 md:w-[60%] grid grid-rows-12 justify-start items-center">
            <div className="row-span-2">
             <h3 className="text-xl sm:text-2xl font-semibold text-orange-600"> Transform Thoughts Into Actionable Tasks</h3>
            </div>
            <div className="row-span-4">
              <h6 className="text-2xl sm:text-3xl font-bold text-[#002C54]">Transform Your Thoughts Into Actionable Tasks. Start Each Day With
              A Clear Vision Of What You Want To Accomplish.</h6>
            </div>
            <div className="row-span-6">
              <p className="text-lg sm:text-xl font-semibold text-[#002C54]">Capture New Ideas: <span className="text-sm sm:text-lg italic font-light sm:font-normal">Quickly Jot Down Anything That Comes To Mind.</span></p>
              <p className="text-lg sm:text-xl font-semibold text-[#002C54]">Prioritize Tasks: <span className="text-sm sm:text-lg italic font-light sm:font-normal">Decide Which Ideas Need Immediate Attention.</span></p> 
              <p className="text-lg sm:text-xl font-semibold text-[#002C54]">Set Goals: <span className="text-sm sm:text-lg italic font-light sm:font-normal">Turn Ideas Into Concrete Objectives.</span></p>
            </div>
          </div>
          {/* text area end */}
        </div>
        {/* item 1 end */}

        {/* item 2 start */}
        <div className="grid grid-rows-12 md:flex gap-2 mt-40">
          {/* image section start */}
          <div className="row-span-4 md:w-[40%] flex justify-center items-center">
            <img
              src={Creative}
              className="h-[120px] sm:h-[160px] md:h[180px] lg:h-[200px] xl:h-[250px] drop-shadow-2xl"
            />
          </div>
          {/* image section end */}

          {/* text area start */}
          <div className="row-span-8 md:w-[60%] grid grid-rows-12 justify-start items-center">
            <div className="row-span-2">
             <h3 className="text-xl sm:text-2xl font-semibold text-orange-600"> Unleash Creativity With Organized Steps</h3>
            </div>
            <div className="row-span-4">
              <h6 className="text-2xl sm:text-3xl font-bold text-[#002C54]">Unleash Your Creativity By Breaking Down Your Big Ideas Into Manageable Steps. Every Small Task Brings You Closer To Your Goals.</h6>
            </div>
            <div className="row-span-6">
              <p className="text-lg sm:text-xl font-semibold text-[#002C54]">Brainstorm Effectively: <span className="text-sm sm:text-lg italic font-light sm:font-normal">Use Our Tools To Explore New Ways Of Tackling Tasks.</span></p>
              <p className="text-lg sm:text-xl font-semibold text-[#002C54]">Track Progress: <span className="text-sm sm:text-lg italic font-light sm:font-normal">Visualize Your Journey From Concept To Completion.</span></p> 
              <p className="text-lg sm:text-xl font-semibold text-[#002C54]">Collaborate: <span className="text-sm sm:text-lg italic font-light sm:font-normal">Share Tasks And Ideas With Others To Enhance Creativity.</span></p>
            </div>
          </div>
          {/* text area end */}
        </div>
        {/* item 2 end */}

         {/* item 3 start */}
         <div className="grid grid-rows-12 md:flex gap-2 mt-40">
          {/* image section start */}
          <div className="row-span-4 md:w-[40%] flex justify-center items-center">
            <img
              src={Study}
              className="h-[120px] sm:h-[160px] md:h[180px] lg:h-[200px] xl:h-[250px] drop-shadow-2xl"
            />
          </div>
          {/* image section end */}

          {/* text area start */}
          <div className="row-span-8 md:w-[60%] grid grid-rows-12 justify-start items-center">
            <div className="row-span-2">
             <h3 className="text-xl sm:text-2xl font-semibold text-orange-600"> Capture And Track Your Progress</h3>
            </div>
            <div className="row-span-4">
              <h6 className="text-2xl sm:text-3xl font-bold text-[#002C54]">Capture Your Tasks, Goals, And Inspirations With Ease. Keep Track Of Your Progress And Stay Motivated.</h6>
            </div>
            <div className="row-span-6">
              <p className="text-lg sm:text-xl font-semibold text-[#002C54]">Create Lists: <span className="text-sm sm:text-lg italic font-light sm:font-normal">Organize Tasks Into Lists For Clarity And Focus.</span></p>
              <p className="text-lg sm:text-xl font-semibold text-[#002C54]">Set Deadlines: <span className="text-sm sm:text-lg italic font-light sm:font-normal">Keep Yourself On Track With Deadlines And Reminders.</span></p> 
              <p className="text-lg sm:text-xl font-semibold text-[#002C54]">Reflect And Review: <span className="text-sm sm:text-lg italic font-light sm:font-normal">Regularly Check Your Progress And Adjust Plans As Needed.</span></p>
            </div>
          </div>
          {/* text area end */}
        </div>
        {/* item 3 end */}

        {/* item 4 start */}
        <div className="flex gap-2 mt-40 justify-center items-center mx-10 sm:mx-[20%]">
          <p className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">"Empower yourself to transform your ideas into achievements. Start organizing, planning, and succeeding today", with <span className="text-[#C5001A]">todo-o.</span></p>
        </div>
        {/* item 4 end */}
      </div>
      <Footer />
    </>
  );
};

export default Home;
