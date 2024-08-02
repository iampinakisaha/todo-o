import { create } from "zustand";
import useAuthSlice from "./slices/AuthSlice";
import useLoadingSlice from "./slices/LoadingSlice";
import { useTodoSidebar } from "./slices/TodoSidebar";
import { useSubTodoSlice } from "./slices/SubTodoSlice";

const useAppStore = create((set) => ({
  ...useAuthSlice(set),
  ...useLoadingSlice(set),
  ...useTodoSidebar(set),
  ...useSubTodoSlice(set),
})) 

export default useAppStore;