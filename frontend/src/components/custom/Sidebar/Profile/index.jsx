import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { getColors } from "@/lib/utils";
import useAppStore from "@/store";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GoBell } from "react-icons/go";
import { LuPanelLeft } from "react-icons/lu";

import { PiBellThin } from "react-icons/pi";
const SidebarProfile = () => {
  const { userInfo, isActiveTodoSidebar, setIsActiveTodoSidebar } =
    useAppStore();
  const [isClickedProfile, setIsClickedProfile] = useState(false);
  const menuRef = useRef(null);

  const handleOnClickSidebarButton = () => {
    setIsActiveTodoSidebar(!isActiveTodoSidebar);
  };
  // Toggle the click state
  const handleClickProfile = () => {
    setIsClickedProfile((prevState) => !prevState);
  };
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsClickedProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center h-full w-full">
      {/* profile section- start */}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              ref={menuRef}
              className={`flex justify-between transition-all hover:bg-[#F5E8E8] duration-300 items-center gap-1 mx-1  p-1 rounded ${
                isClickedProfile ? "bg-[#C5001A]/10 shadow-md focus:border-none" : "" 
              } `}
              
            >
              {/* avatar start */}
              <div className="flex justify-between items-center">
                <Avatar className="h-6 w-6 md:h-6 md:w-6 rounded-full overflow-hidden select-none">
                  {userInfo?.image ? (
                    <AvatarImage
                      src={userInfo?.image}
                      alt="profile"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div
                      className={`uppercase select-none h-6 w-6 md:h-6 md:w-6 text-xs flex items-center justify-center rounded-full text-white ${getColors(
                        userInfo?.color
                      )}`}
                    >
                      {userInfo?.firstName
                        ? userInfo?.firstName.split("").shift()
                        : userInfo.email.split("").shift()}
                    </div>
                  )}
                </Avatar>
              </div>
              {/* avatar end */}
              {/* menu start */}
              <div
                onClick={handleClickProfile}
                className=" flex justify-center items-center"
              >
                <DropdownMenu onClick={handleClickProfile} className=" ">
                  <DropdownMenuTrigger className="flex justify-center items-center font-semibold text-sm text-[#002C54] border-none outline-none">
                    {userInfo?.firstName
                      ? userInfo?.firstName
                      : userInfo.email.split("").shift()}
                    <MdKeyboardArrowDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-72 ml-2">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {/* menu end */}
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-black text-white">
            <p>Profile</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* profile section- end */}

      {/* button start */}
      <div className="flex justify-between items-center gap-5 mr-2">

      <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
    <div className="text-xl font-light text-black hover:bg-[#F5E8E8] p-1 rounded-md cursor-pointer active:scale-95">
          <PiBellThin style={{ strokeWidth: "1px" }} />
        </div>
    </TooltipTrigger>
    <TooltipContent className="bg-black text-white">
      <p>Open Notifications</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

        

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
    <div className="text-2xl font-semibold text-black hover:bg-[#F5E8E8] p-1 rounded-md cursor-pointer scale-95 active:scale-90">
          <LuPanelLeft
            style={{ strokeWidth: "1px" }}
            onClick={handleOnClickSidebarButton}
          />
        </div>
    </TooltipTrigger>
    <TooltipContent className="bg-black text-white">
      <p>Open/Close Sidebar</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>


        
      </div>
      {/* button end */}
    </div>
  );
};

export default SidebarProfile;
