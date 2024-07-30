import { Router } from "express";
import signUpController from "../controllers/user/SignUpController.js";
import logInController from "../controllers/user/LogInController.js";
import getUserInfoController from "../controllers/user/GetUserInfoController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import updateUserInfoController, { updateUserProfileImageController } from "../controllers/user/UpdateUserInfoController.js";


const authRoutes = Router ();

authRoutes.post("/signup", signUpController);
authRoutes.post("/login", logInController);
authRoutes.get("/get-user-info",verifyToken, getUserInfoController);
authRoutes.post("/update-user-info",verifyToken, updateUserInfoController);
authRoutes.post("/update-user-profile-image",verifyToken, updateUserProfileImageController);

export default authRoutes;