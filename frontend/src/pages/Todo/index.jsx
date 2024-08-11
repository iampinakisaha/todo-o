import { useLoaderData } from "react-router-dom";
import Sidebar from "@/components/custom/Sidebar";
import useAppStore from "@/store";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { format } from "date-fns";

const Todo = () => {
  const { userInfo, setSubTodo, getSubTodoForToday, getSubTodoForUpcoming} = useAppStore();
  const todoData = useLoaderData(); // Ensure this is correctly used
  

  useEffect(() => {
    if (todoData && todoData.data && todoData.data.todos) {
      console.log("data from loader", todoData.data.todos);
      setSubTodo(todoData.data.todos);

      const today = new Date();

      const todoToday = todoData.data.todos.filter((item) => {
      const dueDate = new Date(item.dueDate);
      if (isNaN(dueDate.getTime())) {
        return false;
      }

      return format(dueDate, "PPP") === format(today, "PPP");
    });

    // setSubTodoToday(todoToday)
    getSubTodoForToday();
    getSubTodoForUpcoming();
    }
  }, [todoData, setSubTodo]);
 
  
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
      className={`min-h-screen flex-grow transition-transform duration-300  ease-in-out ${
        isActiveTodoSidebar ? "md:ml-72" : "ml-0"
      }`}
      style={{
        
        transition: 'margin-left 0.3s ease-in-out', // Adjust transition time
      }}
    >
      <Outlet />
    </div>
  </div>
  
  );
};

export default Todo;
