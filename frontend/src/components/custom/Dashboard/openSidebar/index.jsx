import useAppStore from "@/store";
import { LuPanelLeft } from "react-icons/lu";
import { Outlet } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const OpenSidebar = () => {
  const {isActiveTodoSidebar,setIsActiveTodoSidebar} = useAppStore();


  const handleOnClickSidebarButton = () => {
    setIsActiveTodoSidebar(!isActiveTodoSidebar);
  }
  return (
    <div className=" flex justify-start items-center">
                {!isActiveTodoSidebar && (
                  <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                    <LuPanelLeft className="text-4xl font-light text-black hover:bg-[#F5E8E8] p-1 rounded-md cursor-pointer scale-90 active:scale-75"
                                  style={{ strokeWidth: "1px" }}
                                  onClick={handleOnClickSidebarButton}/>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-white">
                    <p>Open/Close Sidebar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                )}
              </div>
              
  )
}

export default OpenSidebar