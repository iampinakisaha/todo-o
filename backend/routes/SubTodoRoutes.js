import {Router} from "express";
import addSubTodoController from "../controllers/todo/subTodo/AddSubTodo.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import getSubTodoController from "../controllers/todo/subTodo/GetSubTodo.js";

const subTodoRoutes = Router();

subTodoRoutes.post("/add-sub-todo",verifyToken, addSubTodoController);
subTodoRoutes.get("/get-sub-todo",verifyToken, getSubTodoController);


export default subTodoRoutes;