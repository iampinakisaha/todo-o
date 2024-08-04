import subTodo from "../../../models/SubTodoModel.js";
import User from "../../../models/UserModel.js";

const deleteSubTodoController = async (req, res, next) => {
  try {
    const { id } = req.body;

    
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).send("User is unauthorized.");
    }

    const findTodo = await subTodo.findById(id);
    if (!findTodo) {
      return res.status(404).send("Task Id not found.");
    }

    
    const todo = await subTodo.findByIdAndDelete(id);

    res.status(201).json({
      id: todo._id,
      message: "Task Deleted Successfully."
    });
  } catch (error) {
    res.status(500).send(error);
  }
};


export default deleteSubTodoController;
