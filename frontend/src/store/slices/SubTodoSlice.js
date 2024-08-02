import { create } from "zustand";

export const useSubTodoSlice = (set) => ({
  subTodo: undefined,
  setSubTodo: (subTodo) => set({ subTodo }),
});
