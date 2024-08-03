import Dashboard from "@/components/custom/Dashboard";
import FilterAndLabel from "@/components/custom/Sidebar/Content/filter&Label";
import Inbox from "@/components/custom/Sidebar/Content/inbox";
import Search from "@/components/custom/Sidebar/Content/search";
import Today from "@/components/custom/Sidebar/Content/today";
import Upcoming from "@/components/custom/Sidebar/Content/upcoming";
import CustomDatePicker from "@/lib/datePicker";
import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Todo from "@/pages/Todo";
import useAppStore from "@/store";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Route,
  Link,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/todo" /> : children;
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
       <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/todo" element={<PrivateRoute><Todo /></PrivateRoute>}>
        <Route index element={<Navigate to="search" />} /> {/* Default route */}
        <Route path="search" element={<Search />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="today" element={<Today />} />
        <Route path="upcoming" element={<Upcoming />} />
        <Route path="filter&labels" element={<FilterAndLabel />} />
      </Route>
      <Route path="/test" element={<CustomDatePicker />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </>
  )
);
