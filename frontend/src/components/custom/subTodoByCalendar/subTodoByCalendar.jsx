import React, { useState, useRef, useEffect, useCallback } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isBefore,
} from "date-fns";
import "@/components/custom/subTodoByCalendar/subTodoByCalendar.css";
import useAppStore from "@/store";
import { dateFormat } from "@/lib/formatDate";
import { IoFlag } from "react-icons/io5";
import { RxDragHandleDots2 } from "react-icons/rx";
import { Checkbox } from "@/components/ui/checkbox";
import TooltipWrapper from "@/lib/wrapper/tooltipWrapper/TooltipWrapper";
import { GoComment } from "react-icons/go";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDateRange } from "react-icons/md";
import EditTodo from "@/components/shared/editTodo";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { DELETE_SUBTODO_ROUTE, GET_SUBTODO_ROUTE } from "@/utils/constants";
// Helper to create an array of dates
const createDateArray = (startDate, endDate) => {
  const dates = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }
  return dates;
};

const SubTodoByCalendar = ({ dropMenuDate }) => {
  const today = new Date();
  const endDate = addDays(today, 365 * 2); // 2 years from today
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(today));
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentActiveDay, setCurrentActiveDay] = useState(today);
  const listRef = useRef();
  const { subTodoUpcoming, getSubTodoForUpcoming, isActiveTodoSidebar, subTodo,
    setSubTodo,
    getSubTodo,
    setGetSubTodo,
    removeSubTodo, } = useAppStore();

  const [dates, setDates] = useState(createDateArray(today, endDate));

  useEffect(() => {
    // Call the function to populate the subTodoUpcoming state
    getSubTodoForUpcoming();
  }, [getSubTodoForUpcoming, subTodo]); // Add dependencies if needed

  useEffect(() => {
    if (dropMenuDate instanceof Date && !isNaN(dropMenuDate.getTime())) {
      setSelectedDate(dropMenuDate);
      setCurrentWeekStart(startOfWeek(dropMenuDate));
      setCurrentActiveDay(dropMenuDate);
      scrollToDate(dropMenuDate);
    }
  }, [dropMenuDate]);

  useEffect(() => {
    // Trigger a re-render of the list when subTodo changes
    if (listRef.current) {
      listRef.current.resetAfterIndex(0);
    }
  }, [subTodo]);

  // Dynamic height calculation
  const getItemSize = useCallback((index) => {
    // Add logging for debugging
    console.log("Index:", index);
    const item = subTodoUpcoming[index];
    if (!item) {
      return 100; // Default height if item is not found
    }

    const todos = item.todos || [];
    const height = todos.length * 100 + 100; // Adjust as needed
    console.log("Item size:", height);
    return height;
  },[subTodoUpcoming]);
  

  const handleScroll = ({ scrollOffset }) => {
    // Calculate the index of the item that's currently visible
    let visibleIndex = 0;
    let cumulativeOffset = 0;

    for (let i = 0; i < dates.length; i++) {
      const itemHeight = getItemSize(i);
      cumulativeOffset += itemHeight;

      if (scrollOffset < cumulativeOffset) {
        visibleIndex = i;
        break;
      }
    }

    const visibleDate = dates[visibleIndex];
    setCurrentWeekStart(startOfWeek(visibleDate));
    setCurrentActiveDay(visibleDate);
  };

  const scrollToDate = (date) => {
    const index = dates.findIndex((d) => isSameDay(d, date));
    if (listRef.current) {
      listRef.current.scrollToItem(index, "start");
    }
    setSelectedDate(date);
  };

  const [isOpenEditTodo, setIsOpenEditTodo] = useState(false);
    const [editTodo, setEditTodo] = useState("");
  const handleEditTodo = (todo) => {
    setIsOpenEditTodo((prev) => !prev);
    setEditTodo(todo);
  };
  const Row = ({ index, style }) => {
    const { todos } = subTodoUpcoming[index];

   
    
    useEffect(() => {
      const getAllSubTodos = async () => {
        try {
          const response = await apiClient.get(GET_SUBTODO_ROUTE, {
            withCredentials: true,
          });

          if (response.status === 201 && response.data) {
            setSubTodo(response.data.todos);
          }
        } catch (error) {
          console.log(error);
        }
      };

      if (getSubTodo) {
        getAllSubTodos();
        setGetSubTodo(false);
      }
    }, [subTodo, setSubTodo]);

    const handleMarkIsComplete = async (id) => {
      try {
        const response = await apiClient.post(
          DELETE_SUBTODO_ROUTE,
          { id },
          { withCredentials: true }
        );

        if (response.status === 201 && response.data) {
          toast.success("Task marked as completed");
          removeSubTodo(response.data.id);
        } else {
          toast.error("An error has occured, Please try again later.");
        }
      } catch (error) {
        console.log(error);
        toast.error("An error has occured, Please try again later.");
      }
    };

    

    return (
      <div
        style={style}
        className={`day-item text-sm font-semibold relative flex flex-grow h-full w-full flex-col pt-7 text-[#002C54]/80 ${
          isSameDay(dates[index], selectedDate) ? "selected" : ""
        }`}
      >
        <div className="flex justify-start items-start py-1.5 pr-7 ">
          {format(dates[index], "d MMM ‧ EEEE")}
        </div>
        <hr className="my-2" />
        <div className="flex-grow ">
          {todos ? (
            todos.length > 0 ? (
              todos.map((todo, todoIndex) => (
                <div
                  key={todo.id}
                  className={`h-20 w-full  grid grid-cols-12 justify-start cursor-pointer relative `}
                >
                  <div className="col-span-2 sm:col-span-1 flex h-full w-full  justify-end items-center">
                    {/* <Checkbox
                        id="isComplete"
                        onClick={handleMarkIsComplete}
                        className={`rounded-full border-blue-500 mr-2`}
                        style={{ backgroundColor: todo.color }}
                      /> */}
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
                  <div className="absolute h-full w-full ">
                    <div className=" h-full w-full ">
                      <div className="flex justify-between items-start h-full w-full">
                        {/* move tool- start */}
                        <div className="flex relative justify-between  items-start h-full gap-1 text-xl text-[#002C54]/50">
                          <div className="py-1 hover:bg-slate-200/50 rounded-md active:scale-90 transition-all duration-300 shadow-md">
                            <RxDragHandleDots2 />
                          </div>

                          <div className="flex absolute h-full pl-6 justify-left items-center">
                            <Checkbox
                              id="isComplete"
                              onClick={() => handleMarkIsComplete(todo.id)}
                              className={`rounded-full border-blue-500 mr-2`}
                              style={{ backgroundColor: todo.color }}
                            />
                          </div>
                        </div>
                        {/* move tool- end */}

                        {/* settings- start */}
                        <div className="flex gap-1 justify-center items-start text-xl text-[#002C54]/50 ">
                          {/* edit todo start */}
                          <div id="edit">
                            <TooltipWrapper
                              displayText="Edit Task"
                              contentClassname="bg-black text-white"
                            >
                              <div
                                onClick={() => {
                                  handleEditTodo(todo?.id);
                                }}
                                className="flex p-1 hover:bg-slate-200/50 rounded-md active:scale-90 transition-all duration-300 shadow-md"
                              >
                                <FiEdit3 />
                              </div>
                            </TooltipWrapper>
                          </div>
                          {/* edit todo end */}
                          <TooltipWrapper
                            displayText="Set Due Date"
                            contentClassname="bg-black text-white"
                          >
                            <div className="flex p-1 hover:bg-slate-200/50 rounded-md active:scale-90 transition-all duration-300 shadow-md">
                              <MdOutlineDateRange />
                            </div>
                          </TooltipWrapper>
                          <TooltipWrapper
                            displayText="Add Comment"
                            contentClassname="bg-black text-white"
                          >
                            <div className="flex p-1 hover:bg-slate-200/50 rounded-md active:scale-90 transition-all duration-300 shadow-md">
                              <GoComment />
                            </div>
                          </TooltipWrapper>
                          <TooltipWrapper
                            displayText="More Task Actions..."
                            contentClassname="bg-black text-white"
                          >
                            <div className="flex p-1 hover:bg-slate-200/50 rounded-md active:scale-90 transition-all duration-300 shadow-md">
                              <PiDotsThreeOutlineLight />
                            </div>
                          </TooltipWrapper>
                        </div>
                        {/* settings- end */}
                      </div>
                    </div>
                  </div>
                  {/* hover element- end */}
                </div>
              ))
            ) : (
              <div></div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
        
        
      </div>
    );
  };

  const handleWeekDayClick = (date) => {
    setCurrentWeekStart(startOfWeek(date));
    setCurrentActiveDay(date);
    scrollToDate(date);
    setSelectedDate(date);
  };

  const weekDays = createDateArray(
    currentWeekStart,
    endOfWeek(currentWeekStart)
  );

  

  return (
    <div className="h-full w-full  flex flex-col bg-white ">
      <div className="flex w-full  justify-between mx-auto">
        {weekDays.map((day) => (
          <div
            key={day}
            className={`day-nav-item cursor-pointer p-1 text-xs md:text-md text-center 
              ${
                isBefore(day, today)
                  ? " text-gray-500 cursor-not-allowed"
                  : "hover:bg-slate-200/50"
              }`}
            onClick={() => handleWeekDayClick(day)}
          >
            <div className="flex justify-center items-center">
              <span className="day-part mr-1">{format(day, "EEE")}</span>
              <span
                className={`date-part justify-center items-center text-xs ${
                  isSameDay(day, currentActiveDay)
                    ? "bg-red-600 text-white p-1 rounded-md"
                    : ""
                }`}
              >
                {format(day, " d")}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-grow ">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={dates.length}
              itemSize={getItemSize}
              width={width}
              onScroll={handleScroll}
              ref={listRef}
              className="day-container"
            >
              {Row}
            </List>
          )}
        </AutoSizer>
        {isOpenEditTodo && (
  <div
    className={`fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-10 ${
      isActiveTodoSidebar ? "md:w-[calc(100vw-288px)] ml-auto" : "w-full"
    }`}
  >
    <div className="w-full max-w-[800px]">
      <EditTodo onClose={handleEditTodo} todoId={editTodo} />
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default SubTodoByCalendar;
