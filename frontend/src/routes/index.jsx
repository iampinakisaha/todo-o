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
      <Route path="/" element={<Home />}/>
      <Route
        path="/auth"
        element={
          <AuthRoute>
            <Auth />
          </AuthRoute>
        }
      ></Route>
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/todo"
        element={
          <PrivateRoute>
            <Todo />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/test" element={<CustomDatePicker/>} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </>
    
  )
);
