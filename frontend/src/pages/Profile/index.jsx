import todoO from "@/assets/todo-o.png";
import Story from "@/assets/drawing.png";
import useAppStore from "@/store";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { colors, getColors } from "@/lib/utils";
import { RotatingLines } from "react-loader-spinner";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import uploadImage from "@/lib/cloudinary/uploadImage";
import apiClient from "@/lib/apiClient";
import {
  UPDATE_USER_INFO_ROUTE,
  UPDATE_USER_PROFILE_IMAGE_ROUTE,
} from "@/utils/constants";
import deleteImage from "@/lib/cloudinary/deleteImage";

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const { loading, setLoading } = useAppStore();
  useEffect(() => {
    setImage(userInfo.image || "");

    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
      setSelectedColor(userInfo.color || 0);
      setDateOfBirth(userInfo.dateOfBirth || "");
      setPhoneNumber(userInfo.phoneNumber || "");
    }
  }, [userInfo]);

  console.log(userInfo);

  const validateProfile = () => {
    if (!firstName) {
      toast.error("First Name is Required.");
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is Required.");
      return false;
    }
    if (!dateOfBirth) {
      toast.error("Date Of Birth is Required.");
      return false;
    }
    if (!phoneNumber) {
      toast.error("Phone Number is Required.");
      return false;
    }

    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const newUserData = {
          id: userInfo.id,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
          phoneNumber: phoneNumber,
          color: selectedColor,
        };

        const response = await apiClient.post(
          UPDATE_USER_INFO_ROUTE,
          newUserData,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data });
          console.log("response data ", response.data);
          toast.success("Profile Updated Successfully.");
          if (response.data.profileSetup) {
            navigate("/todo");
          }
        }
      } catch (error) {
        if ((error.response.data.name = "ValidationError")) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to update Profile.");
        }
      }
    }
  };

  const handleOnClickGoBack = () => {
    if (userInfo.profileSetup) {
      navigate("/todo");
    } else {
      toast.error("Please setup profile first.");
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleOnUploadPhoto = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    if ({ file }) {
      const catagory = "profilePic";

      const cloudinaryFolder = `todoApp/${catagory}/`;

      try {
        const uploadImageCloudinary = await uploadImage(file, cloudinaryFolder);

        if (uploadImageCloudinary.data.secure_url) {
          setUserInfo({
            ...userInfo,
            image: uploadImageCloudinary?.data?.secure_url,
          });

          const newUserData = {
            ...userInfo,
            image: uploadImageCloudinary?.data?.secure_url,
          };

          const updateResponse = await apiClient.post(
            UPDATE_USER_PROFILE_IMAGE_ROUTE,
            newUserData,
            { withCredentials: true }
          );
        }
      } catch (error) {
        toast.error("Failed to upload image.");
      } finally {
        setLoading(false);
        fileInputRef.current.value = "";
      }
    }
  };

  const handleOnDeletedPhoto = async (event) => {
    const imageUrl = userInfo?.image;
    console.log("image url id ..............", imageUrl);
    if (imageUrl) {
      setLoading(true);

      try {
        const response = await deleteImage(imageUrl);

        if (
          response &&
          (response.success || response.data.result === "not found")
        ) {
          const updateResponse = await apiClient.post(
            UPDATE_USER_PROFILE_IMAGE_ROUTE,
            { ...userInfo, image: "" },
            { withCredentials: true }
          );
          setUserInfo({
            ...userInfo,
            image: "",
          });
        }
      } catch (error) {
        toast.error("An error occurred while deleting the image.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("No image to delete.");
    }
  };
  return (
    <div className="bg-white h-screen w-screen overflow-y-scroll">
      <div className="flex flex-col md:grid grid-cols-12 h-full">
        {/* login/signup start */}
        <div className="col-span-6 flex flex-col justify-between h-screen overflow-hidden p-4">
  {/* logo section- start */}
  <div className="flex justify-start items-start p-2">
    <div className="ml-[10%]">
      <img
        src={todoO}
        className="h-[50px] md:h-[70px] lg:h-[80px] drop-shadow-2xl"
      />
    </div>
  </div>
  {/* logo section- end */}

  {/* form input section- start */}
  <div className="flex flex-col items-center flex-grow overflow-auto scroolbar-none p-4">
  <div className="w-full max-w-md mx-auto bg-white p-4 rounded-lg shadow-2xl">
    <div className="grid grid-rows-12 gap-4 h-[80vh]">
      <div className="row-span-4 flex justify-center items-center">
        {/* profile image section start */}
        <div
          className="relative flex justify-center items-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Avatar className="h-32 w-32 md:h-48 md:w-48 rounded-full overflow-hidden select-none">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-contain h-full w-full"
                />
              ) : (
                <div
                  className={`uppercase select-none h-32 w-32 md:h-48 md:w-48 text-6xl border-[2px] flex items-center justify-center rounded-full text-white ${getColors(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>

          {hovered && (
            <div
              className="absolute flex items-center justify-center bg-black/50 rounded-full ring-fuchsia-50 cursor-pointer select-none"
              onClick={
                image ? handleOnDeletedPhoto : handleFileInputClick
              }
            >
              {loading ? (
                <span>
                  <RotatingLines
                    visible={true}
                    height="40"
                    width="40"
                    color="black"
                    strokeWidth="3"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    wrapperClass=""
                  />
                </span>
              ) : image ? (
                <FaTrash className="text-white/50  text-2xl cursor-pointer active:scale-95" />
              ) : (
                <FaPlus className="text-white/50  text-2xl cursor-pointer active:scale-95" />
              )}
            </div>
          )}
          {/* image upload section start */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleOnUploadPhoto}
            name="profile-image"
            accept=".png, .jpg, .jpeg, .svg, .webp,"
          />
          {/* image upload section end */}
        </div>
        {/* profile image section end */}
      </div>
      <div className="row-span-8 flex flex-col gap-4 justify-center items-center overflow-x-scroll scroolbar-none">
        <div className="flex flex-col w-[90%] justify-center  gap-4">
          <input
            type="email"
            name="email"
            alt="email"
            disabled
            className="p-2 rounded-lg bg-gray-100 border border-gray-300 h-10"
            value={userInfo.email}
          />
        </div>

        <div className="flex flex-col w-[90%] justify-center  gap-4">
          <input
            type="text"
            name="firstName"
            alt="firstName"
            placeholder="Enter your first Name"
            className="p-2 rounded-lg bg-gray-100 border border-gray-300 h-10"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-[90%] justify-center gap-4">
          <input
            type="text"
            name="lastName"
            alt="lastName"
            placeholder="Enter your last Name"
            className="p-2 rounded-lg bg-gray-100 border border-gray-300 h-10"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-[90%] justify-center gap-4">
          <input
            type="date"
            name="dateOfBirth"
            alt="dateOfBirth"
            placeholder="Select Date of birth"
            className="p-2 rounded-lg bg-gray-100 border border-gray-300 h-10"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-[90%] justify-center gap-4">
          <input
            type="number"
            name="phoneNumber"
            alt="phoneNumber"
            placeholder="Enter your Phone Number"
            className="p-2 rounded-lg bg-gray-100 border border-gray-300 h-10 hide-spinner"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onWheel={(e) => e.target.blur()}
          />
        </div>

        <div className="flex justify-center gap-4 w-[90%] overflow-x-scroll scroolbar-none">
          {colors.map((color, index) => (
            <div
              className={`${color} min-h-8 min-w-8 md:h-8 md:w-8 m-2 rounded-full cursor-pointer transition-all duration-300
        ${selectedColor === index ? "outline outline-black/50 outline-2" : ""}
      `}
              key={index}
              onClick={() => setSelectedColor(index)}
            ></div>
          ))}
        </div>

        <div className="grid grid-cols-1 w-[90%] justify-center gap-4">
          <Button
            className="active:scale-95 h-12 rounded-lg bg-purple-700 hover:bg-purple-900 transition-all duration-200 text-xl select-none"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>

  {/* form input section- end */}
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

export default Profile;
