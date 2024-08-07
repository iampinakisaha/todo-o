import FilterAndLabel from "@/components/custom/Sidebar/Content/filter&Label";
import Inbox from "@/components/custom/Sidebar/Content/inbox";
import Search from "@/components/custom/Sidebar/Content/search";
import Today from "@/components/custom/Sidebar/Content/today";
import Upcoming from "@/components/custom/Sidebar/Content/upcoming";
import getSubTodoLoader from "@/lib/loader/GetSubTodoLoader";
import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import MyProjects from "@/pages/Projects";
import Todo from "@/pages/Todo";
import useAppStore from "@/store";
import Datepicker from "@/test/datepicker";
import LoadingSpinner from "@/utils/loadingSpinner/LoadingSpinner";

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
      <Route
        path="/auth"
        element={
          <AuthRoute>
            <Auth />
          </AuthRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route loader={getSubTodoLoader}
        path="/todo"
        element={
          <PrivateRoute>
            <Todo />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="inbox" />} /> {/* Default route */}
        <Route path="search" element={<Search />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="today" element={<Today />} />
        <Route path="upcoming" element={<Upcoming />} />
        <Route path="filter&labels" element={<FilterAndLabel />} />
        <Route path="projects" element={<MyProjects />} />
        
      </Route>
      <Route path="/test" element={<Datepicker />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </>
  )
);
