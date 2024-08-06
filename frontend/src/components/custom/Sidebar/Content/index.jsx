import React, { useRef, useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdToday } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";
import { HiMiniInbox } from "react-icons/hi2";
import { MdUpcoming } from "react-icons/md";
import { MdFilterCenterFocus } from "react-icons/md";
import { NavLink } from "react-router-dom";
import useAppStore from "@/store";
import TooltipWrapper from "@/lib/wrapper/tooltipWrapper/TooltipWrapper";


const SidebarContent = () => {
  const [isActiveProjectList, setIsActiveProjectList] = useState(true);
 
  const {userInfo, setGetSubTodo, subTodo, subTodoToday} = useAppStore();

 
  return (
    <div className="flex flex-col h-full w-full mt-1">
      <div className="py-1 px-3  h-96 ">
        {/* inbox section- start */}
        <div className="flex flex-col mb-4 gap-2">
          {/* search - start */}
          <TooltipWrapper displayText="Search" contentClassname="bg-black text-white"> 
          <NavLink to={"/todo/search"} 
              className={({ isActive }) =>
               `h-[34px] p-[2px] grid grid-cols-10 cursor-pointer ${isActive ? "bg-[#C5001A]/10 shadow-md text-red-400 rounded-md" : "text-[#002C54] hover:shadow-md rounded-md hover:bg-slate-200/50"}`
            }>
            <div  className="col-span-9 flex justify-start items-center gap-2 px-2 ">
              <span>
                <IoSearch />
              </span>
              <span>Search</span>
            </div>
            <div className=" col-span-1"></div>
          </NavLink>
          </TooltipWrapper>
          {/* start -  end */}

          {/* inbox - start */}
          <TooltipWrapper displayText="Inbox" contentClassname="bg-black text-white"> 
          <NavLink to={"/todo/inbox"}  onClick={() => { setGetSubTodo(true)}}
            className={({ isActive }) =>
              `h-[34px] p-[2px] grid grid-cols-10 cursor-pointer ${isActive ? "bg-[#C5001A]/10 shadow-md text-red-400 rounded-md" : "text-[#002C54] hover:shadow-md rounded-md hover:bg-slate-200/50"}`
           }>
            <div  className="col-span-9 flex justify-start items-center gap-2 px-2 ">
              <span>
                <HiMiniInbox />
              </span>
              <span>Inbox</span>
            </div>
            <div className="col-span-1">
              {subTodo && subTodo.length > 0 && (<span className="text-xs ">{subTodo.length}</span>)}
            </div>
          </NavLink>
          </TooltipWrapper>
          {/* inbox -  end */}

          {/* today - start */}
          <TooltipWrapper displayText="Today" contentClassname="bg-black text-white"> 
          <NavLink to={"/todo/today"}   
            className={({ isActive }) =>
              `h-[34px] p-[2px] grid grid-cols-10 cursor-pointer ${isActive ? "bg-[#C5001A]/10 shadow-md text-red-400 rounded-md" : "text-[#002C54] hover:shadow-md rounded-md hover:bg-slate-200/50"}`
           }>
            <div  className="col-span-9 flex justify-start items-center gap-2 px-2 ">
              <span>
                <MdToday  />
              </span>
              <span>Today</span>
            </div>
            <div className="col-span-1">
            {subTodoToday && subTodoToday.length > 0 && (<span className="text-xs">{subTodoToday.length}</span>)}
            </div>
          </NavLink>
          </TooltipWrapper>
          {/* today -  end */}

          {/* upcoming - start */}
          <TooltipWrapper displayText="Upcoming" contentClassname="bg-black text-white"> 
          <NavLink to={"/todo/upcoming"}   
            className={({ isActive }) =>
              `h-[34px] p-[2px] grid grid-cols-10 cursor-pointer ${isActive ? "bg-[#C5001A]/10 shadow-md text-red-400 rounded-md" : "text-[#002C54] hover:shadow-md rounded-md hover:bg-slate-200/50"}`
           }>
            <div  className="col-span-9 flex justify-start items-center gap-2 px-2 ">
              <span>
                <MdUpcoming  />
              </span>
              <span>Upcoming</span>
            </div>
            <div className="col-span-1"></div>
          </NavLink>
          </TooltipWrapper>
          {/* upcoming -  end */}

          {/* filter & labels - start */}
          <TooltipWrapper displayText="Filter & Labels" contentClassname="bg-black text-white"> 
          <NavLink to={"/todo/filter&labels"}   
            className={({ isActive }) =>
              `h-[34px] p-[2px] grid grid-cols-10 cursor-pointer ${isActive ? "bg-[#C5001A]/10 shadow-md text-red-400 rounded-md" : "text-[#002C54] hover:shadow-md rounded-md hover:bg-slate-200/50"}`
           }>
            <div  className="col-span-9 flex justify-start items-center gap-2 px-2 ">
              <span>
                <MdFilterCenterFocus />
              </span>
              <span>Filters & Labels</span>
            </div>
            <div className="col-span-1"></div>
          </NavLink>
          </TooltipWrapper>
          {/* filter & labels -  end */}
        </div>
        {/* inbox section- end */}

        {/* project section- start */}
        <div className="relative flex-grow ">
        <TooltipWrapper displayText="Projects" contentClassname="bg-black text-white" triggerClassname="w-full"> 
          <NavLink to={"/todo/projects"}  className={({isActive}) => `h-[34px] p-[2px] grid grid-cols-10 cursor-pointer ${isActive ? "bg-[#C5001A]/10 shadow-md text-red-400 rounded-md" : "text-[#002C54] hover:shadow-md rounded-md hover:bg-slate-200/50"} `}>
            <div className=" col-span-8 flex justify-start items-center gap-2 px-2">
              <h3>My Projects</h3>
            </div>
            <div className=" col-span-1 flex justify-center items-center">
              <FaPlus />
            </div>
            <div className=" col-span-1 flex justify-center items-center">
              {isActiveProjectList ? (
                <IoIosArrowDown
                  onClick={() => setIsActiveProjectList(!isActiveProjectList)}
                />
              ) : (
                <IoIosArrowForward
                  onClick={() => setIsActiveProjectList(!isActiveProjectList)}
                />
              )}
            </div>
          </NavLink>
          </TooltipWrapper>
          <div
            className={`scroolbar-none ${
              !isActiveProjectList ? "hidden" : "block"
            }`}
          >
            <ScrollArea className="h-[calc(100vh-400px)] scroll rounded-md  p-4 mt-1 bg-border-none">
              <ul>
                <li className=" mx-auto w-full m-2">Project 1</li>
                <li className=" mx-auto w-full m-2">Project 2</li>
                <li className=" mx-auto w-full m-2">Project 3</li>
                
              </ul>
            </ScrollArea>
          </div>
        </div>
        {/* project section- end */}
      </div>
    </div>
  );
};

export default SidebarContent;
