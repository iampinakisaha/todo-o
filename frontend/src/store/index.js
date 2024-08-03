import { create } from "zustand";
import useAuthSlice from "./slices/AuthSlice";
import useLoadingSlice from "./slices/LoadingSlice";
import { useTodoSidebar } from "./slices/TodoSidebarSlice";
import { useSubTodoSlice } from "./slices/SubTodoSlice";

const useAppStore = create()((...a) => ({
  ...useAuthSlice(...a),
  ...useLoadingSlice(...a),
  ...useTodoSidebar(...a),
  ...useSubTodoSlice(...a),
}));

export default useAppStore;
