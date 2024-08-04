export const useSubTodoSlice = (set, get) => ({
  getSubTodo: false,
  subTodo: [],
  setSubTodo: (subTodo) => set({ subTodo }),
  setGetSubTodo: (getSubTodo) => set({ getSubTodo }),

  addSubTodo: (todo) => {
    const subTodo = get().subTodo;

    set({
      subTodo: [...subTodo, todo],
    });
  },

  // getTodoDetails
  selectedTodoDetails: (id) => {
    const todos = get().subTodo;

    const todoDetails = todos.filter((todo) => todo.id === id);

    return todoDetails[0];
  },

  // update subtodo
  updateSubTodo: (todo) => {
    const todos = get().subTodo;
    const indexToUpdate = todos.findIndex((item) => item.id === todo.id);
    if (indexToUpdate !== -1) {
      const updatedTodos = [
        ...todos.slice(0, indexToUpdate),
        todo,
        ...todos.slice(indexToUpdate + 1),
      ];
      // Sort the updatedTodos array by updatedAt field in descending order
      const sortedTodos = updatedTodos.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      set({ subTodo: sortedTodos });
    }
  },
  removeSubTodo: (todoId) => {
    const todos = get().subTodo;
    // Filter out the todo with the matching id
  const updatedTodos = todos.filter((item) => item.id !== todoId);

  // Sort the updatedTodos array by updatedAt field in descending order
  const sortedTodos = updatedTodos.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  set({ subTodo: sortedTodos });
  console.log(sortedTodos)
  }
});
