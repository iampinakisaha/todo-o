export const useTodoSidebar = (set) => ({
  isActiveTodoSidebar: false,
  selectedFunction: undefined,
  setIsActiveTodoSidebar: (isActiveTodoSidebar) => set({ isActiveTodoSidebar }),
  setSelectedFunction: (selectedFunction) => set({selectedFunction}),
});
