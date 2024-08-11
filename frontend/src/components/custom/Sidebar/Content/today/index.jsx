import OpenSidebar from "@/components/custom/Dashboard/openSidebar";
import useAppStore from "@/store";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import AddTodo from "@/components/shared/addTodo";
import { VscSettings } from "react-icons/vsc";
import { format } from "date-fns";
import { FaRegCircleCheck } from "react-icons/fa6";

const Today = () => {
  
  const { userInfo, subTodo, getSubTodoForToday, isActiveTodoSidebar, setSubTodoToday, subTodoToday } = useAppStore();
  
  useEffect(() => {
    if (userInfo) {
     getSubTodoForToday();
    }
  }, [userInfo, getSubTodoForToday, setSubTodoToday, subTodo]);

  return (
    <div
    className={`bg-white h-screen w-screen  relative  ${
      isActiveTodoSidebar && "md:w-[calc(100vw-288px)]"
    }`}
    >
      <div className="flex flex-col h-full">
        {/* top nav bar - start */}
        <section className="h-16 px-3 mr-2 gap-1 grid grid-cols-12 bg-white">
          {/* sub section 1- start */}
          <div className="col-span-4 grid">
            <OpenSidebar />
          </div>
          {/* sub section 1- end */}

          {/* sub section 2- start */}
          <div className="col-span-4"></div>
          {/* sub section 2- end */}

          {/* sub section 3- start */}
          <div className="col-span-4 bg-white flex justify-end items-center gap-1">
            <div className="flex justify-center items-center gap-2 p-1 rounded-md mr-2 text-base  text-[#002C54] cursor-pointer active:scale-95 transition-all duration-300 select-none hover:bg-slate-200 ">
              <span className="text-xl">
                {" "}
                <VscSettings />
              </span>
              <span className="hidden lg:block">View</span>
            </div>
          </div>
          {/* sub section 3- end */}
        </section>
        {/* top nav bar - end */}

        {/* head section start */}
        <section className="h-14 my-1 mx-10 pr-1 flex justify-start items-center p-1 m-1">
          <h1 className="text-2xl font-bold text-[#002C54]">Today</h1>
        </section>
        {/* head section end */}

        {/* main dashboard- start */}
        <section className="  px-8 pb-2 bg-white flex-grow  relative overflow-y-auto scroolbar-none">
          <div className="bg-white flex flex-col  h-full w-full ">
            <div className="w-80  mr-2 pr-10">
              <div className="px-2 h-11 text-sm  flex ">
              <span>{subTodoToday && subTodoToday.length > 0 ? (<span className="flex justify-center items-center gap-1 text-[#002C54]"><FaRegCircleCheck/> {subTodoToday.length} tasks </span>) : (<span></span>)}</span>
                <span className="ml-2 text-[#C5001A]">{format(Date.now(), "PPP")}</span>
                
              </div>
              
              <div className="px-2 flex flex-col gap-3">
                {/* each todo- start */}
                {subTodoToday &&
                  subTodoToday.length > 0 &&
                  subTodoToday.map((todo) => (
                    <div key={todo.id} className="w-full  pb-2.5  rounded-md shadow-md border-black/15 border-[0.5px]">
                      <div className="w-full h-full min-h-[100px] p-2 flex ">
                        {/* button -start */}
                        <div className="w-7 h-full   flex flex-col">
                          <div className="w-full flex justify-center mr-0.5">
                            <Checkbox className="rounded-full border-blue-600 border-2 h-[18px] w-[18px]" />
                          </div>
                        </div>
                        {/* button- end */}

                        {/* details- start */}
                        <div className="flex flex-col h-full w-full">
                          <div className="flex flex-wrap pt-0.5 w-full text-sm">
                            {todo?.title}
                          </div>
                        </div>
                        {/* details- end */}
                      </div>
                    </div>
                  ))}

                {/* each todo- end */}
              </div>
              <div className="px-2 h-11">
                <AddTodo />
              </div>
            </div>
          </div>
        </section>
        {/* main dashboard- end */}
      </div>
    </div>
  );
};

export default Today;
