import { FaPlus } from "react-icons/fa6";
import { IoFlag } from "react-icons/io5";
import { CiFlag1 } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdLabelOutline } from "react-icons/md";
import { GoInbox } from "react-icons/go";
import { MdArrowDropDown } from "react-icons/md";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import CustomDatePicker from "@/lib/datePicker";
import { Button } from "@/components/ui/button";
import { ChromePicker } from "react-color";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { ADD_SUBTODO_ROUTE } from "@/utils/constants";
import useAppStore from "@/store";
import TooltipWrapper from "@/lib/wrapper/tooltipWrapper/TooltipWrapper";

const AddTodo = ({classname="justify-start"}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState("");
  const [color, setColor] = useState("");
  const [openAddTask, setOpenAddTask] = useState(false);
  const { subTodo, setSubTodo, addSubTodo, getSubTodoForToday } = useAppStore();

  const [openInbox, setOpenInbox] = useState(false);
  const dropdownRef = useRef(null);
  const commandRef = useRef(null);

  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  const validateFormData = () => {
    if (!taskName) {
      toast.error("Task Name is required");
      return false;
    }
    return true;
  };

  const handleAddTodo = async () => {
    if (validateFormData()) {
      try {
        const todoData = {
          title: taskName,
          content: taskDescription || undefined,
          dueDate: dueDate || undefined,
          priority: priority || undefined,
          color: color || undefined,
        };

        const response = await apiClient.post(ADD_SUBTODO_ROUTE, todoData, {
          withCredentials: true,
        });
        console.log("added task", response.data);
        if (response.status === 201 && response.data) {
          addSubTodo(response.data);
          setOpenAddTask(false);
          toast.success("Todo added successfully.");
          getSubTodoForToday();
        } else {
          toast.error("Error occured while adding new Task.");
        }
      } catch (error) {
        toast.error("Error occured while adding new Task.");
      }
    }
  };

  useEffect(() => {
    // Function to handle clicks outside of the dropdown and command menu
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        commandRef.current &&
        !commandRef.current.contains(event.target)
      ) {
        setOpenInbox(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <TooltipWrapper
          displayText="Add Task"
          contentClassname="bg-black text-white"
          triggerClassname="h-full w-full"
        >
          <div className=" mt-2 h-full  w-full flex flex-col">
            <div
              onClick={() => {
                setOpenAddTask(!openAddTask);
               
              }}
              className={`flex ${classname} items-center gap-2 mx-3 px-2 cursor-pointer `}
            >
              <div className="bg-[#C5001A]/90 rounded-full p-[2px]">
                <FaPlus className="text-white" />
              </div>
              <div className="text-[#C5001A] font-semibold text-sm">
                Add Task
              </div>
            </div>
            <div className={`${!openAddTask ? "hidden" : "flex flex-grow w-full"}`}>
            
            <Card className="flex flex-col my-2 w-full  bg-white bottom-0">
                <CardHeader>
                  <CardTitle>
                    <input
                      placeholder="Task name"
                      type="text"
                      className="w-full p-2 border-none active:border-none focus:border-none outline-none"
                      value={taskName}
                      onChange={(event) => setTaskName(event.target.value)}
                      required
                    />
                  </CardTitle>
                  <CardDescription>
                    <input
                      placeholder="Description"
                      type="text"
                      className="w-full p-1 focus:border-none outline-none"
                      value={taskDescription}
                      onChange={(event) =>
                        setTaskDescription(event.target.value)
                      }
                    />
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap justify-start items-center ml-1 h-full w-full p-0">
                  <div className=" flex justify-center items-center pl-2 mb-2">
                    <CustomDatePicker
                      dateReturn={handleDueDateChange}
                      name={"Due Date"}
                    />
                  </div>

                  <div className="flex justify-center items-center pl-2 mb-2">
                    <Select
                      className=""
                      value={priority}
                      onValueChange={(value) => setPriority(value)}
                    >
                      <SelectTrigger
                        className="w-auto  justify-start items-center font-normal mr-2 p-0.5 px-1 h-8 hover:bg-slate-200/50  rounded-md cursor-pointer"
                        style={{ boxShadow: "none" }}
                      >
                        <SelectValue
                          className=""
                          placeholder={
                            <span className="flex justify-between items-center gap-2">
                              <CiFlag1 />
                              <span className="text-[#002C54]/80">
                                Priority
                              </span>
                            </span>
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Priority</SelectLabel>
                          <SelectItem value="high" className="cursor-pointer">
                            <div className=" flex justify-between items-center gap-2 text-[#C5001A]">
                              <span className=" ">
                                <IoFlag />
                              </span>
                              <span>High</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="medium" className="cursor-pointer">
                            <div className=" flex justify-between items-center gap-2 text-[#c58000]">
                              <span className=" ">
                                <IoFlag />
                              </span>
                              <span>Medium</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="low" className="cursor-pointer">
                            <div className=" flex justify-between items-center gap-2 text-[#0d00c5]">
                              <span className=" ">
                                <IoFlag />
                              </span>
                              <span>Low</span>
                            </div>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className=" flex justify-center items-center pl-2 mb-2">
                    <Select>
                      <SelectTrigger
                        className="w-auto flex justify-center items-center font-normal  rounded-md h-8"
                        style={{
                          boxShadow: "none",
                          backgroundColor: color || "transparent",
                          color: color ? "#fff" : "#002C54",
                          border: color
                            ? "1px solid transparent"
                            : "1px solid #ddd",
                          borderRadius: "6px",
                          // padding: "0 10px",
                        }}
                      >
                        <div className="flex items-center gap-2 w-full h-full">
                          {color ? (
                            <span
                              className="flex items-center justify-center"
                              style={{
                                backgroundColor: color,
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                display: "inline-block",
                              }}
                            />
                          ) : (
                            <>
                              <IoColorPaletteOutline />
                              <span className="text-[#002C54]/80">Color</span>
                            </>
                          )}
                        </div>
                      </SelectTrigger>
                      <SelectContent className="flex w-auto flex-col space-y-2 p-2 cursor-pointer">
                        <ChromePicker
                          color={color}
                          onChangeComplete={handleChangeComplete}
                        />
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-center items-center pl-2 mb-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="w-auto justify-start rounded-md items-center font-normal mr-2 p-0.5 border-[1px] px-1 h-8 hover:bg-slate-200/50   cursor-pointer">
                        <BsThreeDots />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-52 ">
                        <DropdownMenuItem className="cursor-pointer">
                          <div className="flex justify-between items-center gap-3 ">
                            <span>
                              <MdLabelOutline />
                            </span>
                            <span> Label</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          Team
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          Subscription
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
                <hr className="mb-5" />
                <CardFooter className="flex flex-wrap relative justify-between items-center">
                  <div
                    className="flex justify-between items-center mb-2"
                    ref={dropdownRef}
                  >
                    <Button
                      onClick={() => setOpenInbox(!openInbox)}
                      className="gap-1 hover:bg-slate-400/30 bg-white text-[#002C54]/90 hover:text-[#002C54] active:scale-95 transition-all duration-300 cursor-pointer p-1 px-2 h-8 rounded-md"
                    >
                      <GoInbox /> Inbox <MdArrowDropDown />
                    </Button>
                  </div>
                  <Command
                    ref={commandRef}
                    className={`${
                      !openInbox ? "hidden" : "absolute flex h-auto w-72 top-14"
                    }`}
                  >
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup heading="Settings">
                        <CommandItem>Profile</CommandItem>
                        <CommandItem>Billing</CommandItem>
                        <CommandItem>Settings</CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>

                  <div className="flex justify-between items-center gap-3 mb-2">
                    <div className="">
                      <AlertDialog>
                        <AlertDialogTrigger className="hover:bg-slate-400/50 font-semibold  bg-slate-400/30 text-[#002C54]/90 active:scale-95 transition-all duration-300 cursor-pointer p-1 px-3 h-8 rounded-md">
                          Cancel
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-slate-100  rounded">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="hover:bg-slate-400/50 bg-slate-400/30  text-[#002C54]/90 active:scale-95 transition-all duration-300 cursor-pointer p-1 px-3 h-8 rounded-md">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => setOpenAddTask(false)}
                              className="bg-[#C5001A] hover:bg-[#A80015]/90  text-white active:scale-95 transition-all duration-300 cursor-pointer p-1 px-3 h-8 rounded-md"
                            >
                              Discard
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    <div>
                      <Button
                        onClick={handleAddTodo}
                        className="bg-[#C5001A] hover:bg-[#A80015]/90  text-white active:scale-95 transition-all duration-300 cursor-pointer p-1 px-3 h-8 rounded-md"
                      >
                        Add Task
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
          
        </TooltipWrapper>
  )
}

export default AddTodo