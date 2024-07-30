import { toast } from "sonner";
import apiClient from "../apiClient";
import { DELETE_IMAGE_CLOUDINARY } from "@/utils/constants";

const deleteImage = async (url) => {

  try {
    const public_id = extractPublicId(url);
 
    console.log("public id is ..............", public_id)
    const response = await apiClient.post(
      DELETE_IMAGE_CLOUDINARY,
      { public_id: public_id },
      { withCredentials: true }
    );

 
    return response.data;
  } catch (error) {
    
    // Check if the error has a response from the backend
    if (error.response) {
      
      return error.response.data;
    } 
  }
};

function extractPublicId(url) {
  const uploadPath = "/todoApp/";
  const uploadIndex = url.indexOf(uploadPath);
  if (uploadIndex === -1) {
    throw new Error("Invalid Cloudinary URL");
  }

  let publicIdWithExtension = url.slice(uploadIndex);
  publicIdWithExtension = publicIdWithExtension.substring(1);
  const publicId = publicIdWithExtension.split(".")[0];

  return publicId;
}

export default deleteImage;
