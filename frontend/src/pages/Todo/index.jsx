import Dashboard from "@/components/custom/Dashboard";
import Sidebar from "@/components/custom/Sidebar";
import useAppStore from "@/store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Todo = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  const { isActiveTodoSidebar } = useAppStore();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <div className="w-screen flex relative">
    <div
      className={`h-screen z-50 fixed top-0 left-0 bg-gray-800 ${
        isActiveTodoSidebar ? "translate-x-0" : "-translate-x-full"
      } `}
      style={{
        transform: isActiveTodoSidebar ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out', // Adjust transition time
      }}
    >
      <Sidebar />
    </div>
  
    <div
      className={`min-h-screen flex-grow transition-transform duration-&lsqb;3000ms&rsqb ease-in-out ${
        isActiveTodoSidebar ? "md:ml-72" : "ml-0"
      }`}
      style={{
        
        transition: 'margin-left 0.3s ease-in-out', // Adjust transition time
      }}
    >
      <Dashboard />
    </div>
  </div>
  
  );
};

export default Todo;
