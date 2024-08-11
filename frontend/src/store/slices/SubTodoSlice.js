import { format, addDays } from "date-fns";

export const useSubTodoSlice = (set, get) => ({
  getSubTodo: false,
  subTodo: [],
  subTodoToday: [],
  subTodoUpcoming: [],
  setSubTodo: (subTodo) => set({ subTodo }),
  setGetSubTodo: (getSubTodo) => set({ getSubTodo }),
  setSubTodoToday: (subTodoToday) => set({ subTodoToday }),
  setSubTodoUpcoming: (subTodoUpcoming) => ({subTodoUpcoming}),

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
    
  },
  getSubTodoForToday: () => {
    const subTodo = get().subTodo;
    
    const today = new Date();

      const todos = subTodo.filter((item) => {
      const dueDate = new Date(item.dueDate);
      if (isNaN(dueDate.getTime())) {
        return false;
      }

      return format(dueDate, "PPP") === format(today, "PPP");
    });

    set({ subTodoToday: todos });
    
    return todos
  },
  getSubTodoForUpcoming: () => {
    const today = new Date();
    const endDate = addDays(today, 365 * 2); // 2 years from today

    const dates = createDateArray(today, endDate);
    const subTodo = get().subTodo;

    const upcomingTodos = []; // Initialize a new array

    dates.forEach((date) => {
      const todos = subTodo.filter((item) => {
        const dueDate = new Date(item.dueDate);
        if (isNaN(dueDate.getTime())) {
          return false;
        }
        return format(dueDate, "PPP") === format(date, "PPP");
      });

      // Add an object with date and todos to the array
      upcomingTodos.push({ date, todos });
    });

    // Sort the array by date
    upcomingTodos.sort((a, b) => new Date(a.date) - new Date(b.date));

    
    // Update state with sorted data
    set({ subTodoUpcoming: upcomingTodos });

    return upcomingTodos;
  },

  
});

const createDateArray = (startDate, endDate) => {
  const dates = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }
  return dates;
};
