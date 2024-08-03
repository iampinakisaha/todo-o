import useAppStore from "@/store";
import { LuPanelLeft } from "react-icons/lu";
import { Outlet } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Dashboard = () => {
  const {isActiveTodoSidebar,setIsActiveTodoSidebar} = useAppStore();

  console.log(isActiveTodoSidebar);
  const handleOnClickSidebarButton = () => {
    setIsActiveTodoSidebar(!isActiveTodoSidebar);
  }
  return (
    <div className="bg-white h-full w-full relative overflow-hidden">
      <div className="flex flex-col h-full">
        {/* top nav bar - start */}
        <section className="h-14 px-3 mr-2 gap-1 grid grid-cols-12 bg-white">
          {/* sub section 1- start */}
          <div className="col-span-4 grid">
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
              

          </div>
          {/* sub section 1- end */}

          {/* sub section 2- start */}
          <div className="col-span-4 bg-slate-200">
            <Outlet/>
          </div>
          {/* sub section 2- end */}

          {/* sub section 3- start */}
          <div className="col-span-4 bg-slate-200">
            <Outlet/>
          </div>
          {/* sub section 3- end */}
        </section>
        {/* top nav bar - end */}

        {/* head section start */}
        <section className="h-16 my-1 mx-10 pr-1 bg-slate-200">
          <Outlet/>
        </section>
        {/* head section end */}

        {/* main dashboard- start */}
        <section className="flex-grow bg-white px-8 pb-2 ">
          <Outlet/>
        </section>
        {/* main dashboard- end */}
      </div>
    </div>
  );
};

export default Dashboard;
