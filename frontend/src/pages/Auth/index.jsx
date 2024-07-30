import React, { useState } from "react";
import todoO from "@/assets/todo-o.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Story from "@/assets/drawing.png";
import apiClient from "@/lib/apiClient";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useAppStore from "@/store";
const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfo, setUserInfo } = useAppStore();
  const validateSignup = () => {
    const emailPattern = new RegExp(import.meta.env.VITE_EMAIL_PATTERN);
    const passwordPattern = new RegExp(import.meta.env.VITE_PASSWORD_PATTERN);
    if (!emailPattern.test(email)) {
      toast.error("Please enter valid Email.");
      return false;
    }
    if (!passwordPattern.test(password)) {
      toast.error("Please enter valid Password.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should be same.");
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    const emailPattern = new RegExp(import.meta.env.VITE_EMAIL_PATTERN);
    const passwordPattern = new RegExp(import.meta.env.VITE_PASSWORD_PATTERN);
    if (!emailPattern.test(email)) {
      toast.error("Please enter valid Email.");
      return false;
    }
    if (!passwordPattern.test(password)) {
      toast.error("Please enter valid Password.");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    try {
      if (validateSignup()) {
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          { email, password },
          { withCredentials: true }
        );

        if (response.status === 201 && response.data) {
          toast.success("Signup successfully. Please login now to continue");
        }
      }
    } catch (error) {
      if (error.response.status === 409) {
        toast.error(error.response.data);
      } else {
        toast.error(
          "An error occurred while signing up. Please try again later."
        );
      }
    }
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      try {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );

        console.log(response.data);
        if (response.data?.id) {
          setUserInfo(response.data);

          if (response.data.profileSetup) {
            navigate("/todo");
          } else {
            navigate("/profile");
          }
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      } catch (error) {
        toast.error("Failed to login. Please try again later.");
      }
    }
  };

  return (
    <div className="bg-white h-screen w-screen overflow-hidden">
      <div className="flex flex-col md:grid grid-cols-12 h-full">
        {/* login/signup start */}
        <div className="col-span-6 flex flex-col justify-between h-full">
          <div className="flex justify-start items-start p-2">
            <div className="ml-[10%]">
              <img
                src={todoO}
                className="h-[50px] md:h[70px] lg:h-[80px] drop-shadow-2xl"
              />
            </div>
          </div>
          <div className="flex justify-center items-center flex-grow p-2 w-full h-full">
            <Tabs className="w-3/4 h-[60%]" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full ">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-[#002C54] text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-[#002C54] data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-[#002C54] text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-[#002C54] data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className=" flex flex-col gap-5 mt-10 " value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6 "
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Button
                  className="rounded-full p-6 bg-[#C5001A] hover:bg-[#A80015] transition-all duration-300 text-lg"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </TabsContent>
              <TabsContent
                className="flex flex-col gap-5 overflow-y-auto h-full px-2"
                value="signup"
              >
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6 mt-2"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <Button
                  className="rounded-full p-6 bg-[#C5001A] hover:bg-[#A80015] transition-all duration-300 text-lg"
                  onClick={handleSignup}
                >
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {/* login/signup end */}

        {/* image start */}
       
        <div className="col-span-6 hidden md:flex items-center justify-center relative overflow-hidden ">
          <div className="absolute inset-0 bg-gradient-to-l from-[#002C54] to-transparent opacity-50"></div>
          <div className="relative z-10 mt-20">
            <img
              src={Story}
              className="h-[120px] sm:h-[160px] md:h[180px] lg:h-[200px] xl:h-[250px] drop-shadow-2xl"
            />
          </div>
        </div>
        {/* image end */}
      </div>
    </div>
  );
};

export default Auth;
