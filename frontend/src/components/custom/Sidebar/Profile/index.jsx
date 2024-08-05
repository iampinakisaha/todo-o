import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TbLogout } from "react-icons/tb";

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
import apiClient from "@/lib/apiClient";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LOGOUT_ROUTE } from "@/utils/constants";
const SidebarProfile = () => {
  const { userInfo,setUserInfo, isActiveTodoSidebar, setIsActiveTodoSidebar } =
    useAppStore();
    const navigate = useNavigate();
  const [isClickedProfile, setIsClickedProfile] = useState(false);
  const menuRef = useRef(null);
  const avatarRef = useRef(null);
  const handleOnClickSidebarButton = () => {
    setIsActiveTodoSidebar(!isActiveTodoSidebar);
  };
  // Toggle the click state
  const handleClickProfile = () => {
    setIsClickedProfile((prevState) => !prevState);
  };
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && !avatarRef.current.contains(event.target)) {
      setIsClickedProfile(false);
    }
  };

  const handleOnLogOut = async () => {
    try {
      const response = await apiClient.get(LOGOUT_ROUTE, {withCredentials: true});

      if(response.status === 201) {
        toast.success("Logged out Successfully.")
        setUserInfo("");
        navigate("/auth");

      }
    }catch(error) {
      console.log(error)
      toast.error("There is an error while logging out.")
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center h-full w-full relative">
      {/* profile section- start */}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div  onClick={handleClickProfile}
               ref={avatarRef}
              className={`flex justify-between transition-all hover:bg-[#F5E8E8] duration-300 items-center gap-1 mx-1  p-1 rounded ${
                isClickedProfile
                  ? "bg-[#C5001A]/10 shadow-md focus:border-none"
                  : ""
              } `}
            >
              {/* avatar start */}
              <div
                
                className="flex justify-between items-center"
              >
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

              <div className=" flex justify-center items-center relative text-sm font-semibold">
                {userInfo?.firstName
                  ? userInfo?.firstName
                  : userInfo.email.split("").shift()}
                <MdKeyboardArrowDown />
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
     
      {/* profile menu start */}
                <div ref={menuRef} className={`${isClickedProfile ? "absolute bg-white flex flex-grow z-50 flex-col ml-2 rounded-md shadow-md w-72  top-12" : "hidden"}`}>
                    <div className="flex w-full p-2 ">
                        <div className="p-2 rounded-md flex flex-col w-full hover:bg-slate-200/50 cursor-pointer">
                            <div className="text-md font-semibold">
                            {userInfo?.firstName && userInfo?.lastName
                  ? `${userInfo?.firstName} ${userInfo?.lastName}`
                  : userInfo.email.split("").shift()}
                            </div>
                        </div>
                    </div>
                    <hr/>

                    <div className="flex w-full p-2">
                        <div className="p-2 rounded-md flex flex-col w-full hover:bg-slate-200/50 cursor-pointer">
                            <div className="text-sm">
                            Settings
                            </div>
                        </div>
                    </div>
                    <hr/>

                    <div className="flex w-full p-2">
                        <div className="p-2 rounded-md flex flex-col w-full hover:bg-slate-200/50 cursor-pointer">
                              
                            <div onClick={handleOnLogOut} className="ml-2 flex justify-start items-center gap-2 active:scale-95 transition-all duration-300 ease-in-out">
                           <span className="text-xl text-[#C5001A]"> <TbLogout /> </span>
                           <span className="text-md text-[#C5001A]">Logout</span>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>
      {/* profile menu end */}
    </div>
  );
};

export default SidebarProfile;
