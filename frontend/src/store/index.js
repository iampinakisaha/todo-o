import { create } from "zustand";
import useAuthSlice from "./slices/AuthSlice";
import useLoadingSlice from "./slices/LoadingSlice";

const useAppStore = create((set) => ({
  ...useAuthSlice(set),
  ...useLoadingSlice(set),
})) 

export default useAppStore;