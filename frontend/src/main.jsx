import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { Toaster } from "sonner";
import useAppStore from "./store/index.js";
import apiClient from "./lib/apiClient.js";
import { GET_USER_INFO } from "./utils/constants.js";

function Main () {
  const { userinfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userinfo) {
      setLoading(true);
      const getUserInfo = async () => {
        try {
          const response = await apiClient.get(GET_USER_INFO, {
            withCredentials: true,
          });

          if (response.status === 200 && response.data.id) {
            setUserInfo(response.data);
          } else {
            setUserInfo(undefined);
          }
        } catch (error) {
          setUserInfo(undefined);
        } finally {
          setLoading(false);
        }
      };
      getUserInfo();
    } else {
      setLoading(false);
    }
  }, [userinfo, setUserInfo]);

  if (loading) {
    return <div>Loading...</div>
  } 

  return (
    <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster closeButton />
  </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Main/>
);
