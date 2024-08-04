import {Router} from "express";
import addSubTodoController from "../controllers/todo/subTodo/AddSubTodo.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import getSubTodoController from "../controllers/todo/subTodo/GetSubTodo.js";
import updateSubTodoController from "../controllers/todo/subTodo/UpdateSubTodo.js";
import deleteSubTodoController from "../controllers/todo/subTodo/DeleteSubTodo.js";

const subTodoRoutes = Router();

subTodoRoutes.post("/add-sub-todo",verifyToken, addSubTodoController);
subTodoRoutes.get("/get-sub-todo",verifyToken, getSubTodoController);
subTodoRoutes.post("/update-sub-todo",verifyToken, updateSubTodoController);
subTodoRoutes.post("/delete-sub-todo",verifyToken, deleteSubTodoController);


export default subTodoRoutes;