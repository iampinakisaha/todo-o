import React, { useRef, useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";
import { HiMiniInbox } from "react-icons/hi2";
const SidebarContent = () => {
  const [isActiveProjectList, setIsActiveProjectList] = useState(true);
  const selectTriggerRef = useRef(null);

  const handleFocus = () => {
    if (selectTriggerRef.current) {
      selectTriggerRef.current.focus(); 
    }
  };
  return (
    <div className="flex flex-col h-full w-full">
      <div className="py-1 px-3  h-96 ">
        {/* inbox section- start */}
        <div className="flex flex-col mb-4 ">
          {/* search - start */}
          <div className="h-[34px] p-[2px] grid grid-cols-10">
            <div className="bg-slate-200 col-span-9 ">Search</div>
            <div className="bg-slate-200 col-span-1"></div>
          </div>
          {/* start -  end */}

          {/* inbox - start */}
          <div className="h-[34px] p-[2px] grid grid-cols-10 ">
            <div  className="bg-slate-200 col-span-9 flex justify-start items-center gap-2 px-2 text-[#002C54]">
              <span>
                <HiMiniInbox />
              </span>
              <span>Inbox</span>
            </div>
            <div className="bg-slate-200 col-span-1"></div>
          </div>
          {/* inbox -  end */}

          {/* today - start */}
          <div className="h-[34px] p-[2px] grid grid-cols-10">
            <div className="bg-slate-200 col-span-9">today</div>
            <div className="bg-slate-200 col-span-1"></div>
          </div>
          {/* today -  end */}

          {/* upcoming - start */}
          <div className="h-[34px] p-[2px] grid grid-cols-10">
            <div className="bg-slate-200 col-span-9">upcoming</div>
            <div className="bg-slate-200 col-span-1"></div>
          </div>
          {/* upcoming -  end */}

          {/* filter & labels - start */}
          <div className="h-[34px] p-[2px] grid grid-cols-10">
            <div className="bg-slate-200 col-span-9">filter & labels</div>
            <div className="bg-slate-200 col-span-1"></div>
          </div>
          {/* filter & labels -  end */}
        </div>
        {/* inbox section- end */}

        {/* project section- start */}
        <div className="relative flex-grow ">
          <div className="h-[34px] p-[2px] grid grid-cols-10">
            <div className=" col-span-8 flex justify-start items-center">
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
          </div>

          <div
            className={`scroolbar-none ${
              !isActiveProjectList ? "hidden" : "block"
            }`}
          >
            <ScrollArea className="h-[calc(100vh-400px)] scroll rounded-md  p-4 mt-1 bg-border-none">
              <ul>
                <li className="bg-slate-200 mx-auto w-full m-2">item 1</li>
                <li className="bg-slate-200 mx-auto w-full m-2">item 1</li>
                <li className="bg-slate-200 mx-auto w-full m-2">item 1</li>
                <li className="bg-slate-200 mx-auto w-full m-2">item 1</li>
                <li className="bg-slate-200 mx-auto w-full m-2">item 1</li>
                <li className="bg-slate-200 mx-auto w-full m-2">item 1</li>
                <li className="bg-slate-200 mx-auto w-full m-2">item 1</li>
                <li className="bg-slate-200 mx-auto w-full m-2">item 1</li>
                <li className="bg-slate-200 mx-auto w-full m-2">item 1</li>
                <li className="bg-slate-200 mx-auto w-full m-2">item 1</li>
                <li className="bg-slate-200 mx-auto w-full m-2">item 1</li>
                <li className="bg-slate-200 mx-auto w-full m-2">item 1</li>
                <li className="bg-slate-200 mx-auto w-full m-2">item 1</li>
                <li className="bg-slate-200 mx-auto w-full m-2">item 1</li>
                <li className="bg-slate-200 mx-auto w-full m-2">item 1</li>
                <li className="bg-slate-200 mx-auto w-full m-2">item 1</li>
                <li className="bg-slate-200 mx-auto w-full m-2">item 1</li>
                <li className="bg-slate-200 mx-auto w-full m-2">item 1</li>
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
