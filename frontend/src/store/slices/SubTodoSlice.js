import { create } from "zustand";

export const useSubTodoSlice = (set, get) => ({
  getSubTodo: false,
  subTodo: [],
  setSubTodo: (subTodo) => set({ subTodo }),
  setGetSubTodo: (getSubTodo) => set({getSubTodo}),

  addSubTodo: (todo) => {
    const subTodo = get().subTodo;
    console.log("sub todos in slice",subTodo)
    set({
      subTodo: [...subTodo, todo],
    });
  },
});
