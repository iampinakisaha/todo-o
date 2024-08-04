import subTodo from "../../../models/SubTodoModel.js";
import User from "../../../models/UserModel.js";

const updateSubTodoController = async (req, res, next) => {
  try {
    const { title, id, content, dueDate, priority, color } = req.body;

    if (!title) {
      return res.status(424).send("Task name is required.");
    }
    
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).send("User is unauthorized.");
    }

    const findTodo = await subTodo.findById(id);
    if (!findTodo) {
      return res.status(404).send("Task Id not found.");
    }

    const newTodoData = {
      title: title !== undefined ? title : findTodo.title,
      content: content !== undefined ? content : findTodo.content,
      dueDate: dueDate !== undefined ? dueDate : findTodo.dueDate,
      priority: priority !== undefined ? priority : findTodo.priority,
      color: color !== undefined ? color : findTodo.color,
    };

    const todo = await subTodo.findByIdAndUpdate(id, newTodoData, { new: true });

    res.status(201).json({
      id: todo._id,
      title: todo.title,
      content: todo.content,
      dueDate: todo.dueDate,
      priority: todo.priority,
      color: todo.color,
      createdBy: todo.createdBy,
      isComplete: todo.isComplete,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};


export default updateSubTodoController;
