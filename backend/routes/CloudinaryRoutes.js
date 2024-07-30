import { Router } from "express";

import deleteCloudinaryImageController from "../controllers/cloudinary/cloudinaryImageDelete.js";
import uploadCloudinaryImageController from "../controllers/cloudinary/cloudinaryImageUpload.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";


const cloudinaryRoutes = Router();

//cloudinary image controller
cloudinaryRoutes.post("/upload-image-cloudinary", verifyToken, uploadCloudinaryImageController);
cloudinaryRoutes.post("/delete-image-cloudinary", verifyToken, deleteCloudinaryImageController);

export default cloudinaryRoutes;