import OpenSidebar from "@/components/custom/Dashboard/openSidebar";
import { Outlet } from "react-router-dom";
import { VscSettings } from "react-icons/vsc";
import { FaRegMessage } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import apiClient from "@/lib/apiClient";
import { GET_SUBTODO_ROUTE } from "@/utils/constants";
import useAppStore from "@/store";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDateRange } from "react-icons/md";
import { GoComment } from "react-icons/go";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { RxDragHandleDots2 } from "react-icons/rx";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { dateFormat } from "@/lib/formatDate";
import { IoFlag } from "react-icons/io5";
import SidebarAddTask from "../../AddTask";

const Inbox = () => {
  const { subTodo, setSubTodo, getSubTodo, setGetSubTodo } = useAppStore();
  const { isActiveTodoSidebar } = useAppStore();
  useEffect(() => {
    const getAllSubTodos = async () => {
      try {
        const response = await apiClient.get(GET_SUBTODO_ROUTE, {
          withCredentials: true,
        });

        console.log("response", response);
        if (response.status === 201 && response.data) {
          console.log("response.data", response.data.todos);

          setSubTodo(response.data.todos);
        }
      } catch (error) {
        console.log(error);
      }
    };
    console.log("getSubTodo", getSubTodo);
    if (getSubTodo) {
      getAllSubTodos();
      setGetSubTodo(false);
    }
  }, [subTodo, setSubTodo]);

  const handleMarkIsComplete = () => {
    console.log("mark for complete");
  };

  // console.log("subtodos are", subTodo);
  return (
    <div className={`bg-white h-screen w-screen relative ${isActiveTodoSidebar && "md:w-[calc(100vw-288px)]"}`}>
      <div className="flex flex-col h-full">
        {/* top nav bar - start */}
        <section className={`h-14 px-3 mr-2 gap-1 grid grid-cols-12 bg-white`}>
          {/* sub section 1- start */}
          <div className="col-span-4 grid">
            <OpenSidebar />
          </div>
          {/* sub section 1- end */}

          {/* sub section 2- start */}
          <div className="col-span-4 bg-white"></div>
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

            <div className="flex justify-center items-center gap-2 p-2 rounded-md mr-2 text-base  text-[#002C54] cursor-pointer active:scale-95 transition-all duration-300 select-none hover:bg-slate-200">
              <span className="text-lg">
                {" "}
                <FaRegMessage />
              </span>
            </div>

            <div className="flex justify-center items-center gap-2 p-1 rounded-md mr-2 text-base  text-[#002C54] cursor-pointer active:scale-95 transition-all duration-300 select-none hover:bg-slate-200">
              <span className="text-2xl">
                {" "}
                <HiOutlineDotsHorizontal />
              </span>
            </div>
          </div>
          {/* sub section 3- end */}
        </section>
        {/* top nav bar - end */}

        {/* head section start */}
        <section className="h-14 my-1 mx-10 pr-1 flex justify-start items-center p-1 m-1">
          <h1 className="text-2xl font-bold text-[#002C54]">Inbox</h1>
        </section>
        {/* head section end */}

        {/* main dashboard- start */}
        <section className=" bg-white flex-grow relative overflow-y-auto scroolbar-none">
          <div className="flex flex-col px-11 pb-14 w-full ">
            <div className=" flex flex-col h-full gap-1 justify-center items-center">
              {/* each todo- start */}

              {subTodo &&
                subTodo.map((todo) => (
                  <div
                    key={todo._id}
                    className={`h-20 w-full max-w-[800px] grid grid-cols-12 justify-start cursor-pointer relative `}
                  >
                    <div className="col-span-2 sm:col-span-1 flex h-full w-full  justify-end items-center">
                      <Checkbox
                        id="isComplete"
                        onClick={handleMarkIsComplete}
                        className={`rounded-full border-blue-500 mr-2`}
                        style={{ backgroundColor: todo.color }}
                      />
                    </div>
                    <div className="col-span-10 sm:col-span-11 w-full flex justify-start h-full mr-8 py-2 flex-col">
                      {/* title- start */}
                      <div className="px-[1px] h-6 flex items-center text-xs md:text-base capitalize font-semibold">
                        <h3>{todo?.title}</h3>
                      </div>
                      {/* title- end */}

                      {/* description- start */}
                      <div className="h-5 flex items-center text-xs font-normal capitalize text-[#002C54]/70">
                        <p className="mb-0.5">{todo?.content}</p>
                      </div>
                      {/* description- end */}

                      {/* due date/color/priority- start */}
                      <div className="h-4 flex items-center text-xs font-semibold text-[#C5001A] gap-4">
                        <div className="flex items-center">
                          {dateFormat(todo?.dueDate) || "No Due Date"}{" "}
                          {/* Show fallback text if due date is null */}
                        </div>

                        <div className="flex items-center">
                          <div
                            className="p-[3px] rounded-full bg-[#002C54]"
                            style={{ backgroundColor: todo?.color }} // Use dynamic color if provided
                          ></div>
                        </div>

                        <div
                          className={`flex items-center gap-1 ${
                            todo?.priority === "high"
                              ? "text-[#C5001A]"
                              : todo?.priority === "medium"
                              ? "text-[#c58000]"
                              : "text-[#0d00c5]"
                          }`}
                        >
                          <span>{todo?.priority}</span>
                          <span>
                            <IoFlag />
                          </span>
                        </div>
                      </div>
                      <hr className="mt-2 border-black/5" />
                      {/* due date/color/priority-- end */}
                    </div>

                    {/* hover elements- start */}
                    <div className="absolute h-full w-full group">
                      <div className=" h-full w-full hidden group-hover:block">
                          <div className="flex justify-between items-start h-full w-full">
                          {/* move tool- start */}
                          <div className="flex justify-center  items-start h-full text-xl text-[#002C54]/50">
                            <div className="flex py-1 hover:bg-slate-200/50 rounded-md active:scale-90 transition-all duration-300 shadow-md">
                             <RxDragHandleDots2/>
                            </div>
                          </div>
                          {/* move tool- end */}
                          
                          {/* settings- start */}
                          <div className="flex gap-1 justify-center items-start text-xl text-[#002C54]/50 ">
                            <div className="flex p-1 hover:bg-slate-200/50 rounded-md active:scale-90 transition-all duration-300 shadow-md"><FiEdit3/></div>
                            <div className="flex p-1 hover:bg-slate-200/50 rounded-md active:scale-90 transition-all duration-300 shadow-md"><MdOutlineDateRange/></div>
                            <div className="flex p-1 hover:bg-slate-200/50 rounded-md active:scale-90 transition-all duration-300 shadow-md"><GoComment/></div>
                            <div className="flex p-1 hover:bg-slate-200/50 rounded-md active:scale-90 transition-all duration-300 shadow-md"><PiDotsThreeOutlineLight/></div>
                          </div>
                          {/* settings- end */}
                          </div>
                      </div>
                    </div>
                    {/* hover element- end */}
                  </div>
                ))}

              {/* each todo- end */}
            </div>
          </div>
        </section>
        {/* main dashboard- end */}
      </div>
    </div>
  );
};

export default Inbox;