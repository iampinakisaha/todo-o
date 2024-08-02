import {Router} from "express";
import addSubTodoController from "../controllers/todo/subTodo/AddSubTodo.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const subTodoRoutes = Router();

subTodoRoutes.post("/add-sub-todo",verifyToken, addSubTodoController);


export default subTodoRoutes;