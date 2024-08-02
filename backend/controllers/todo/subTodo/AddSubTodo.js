import subTodo from "../../../models/SubTodoModel.js";
import User from "../../../models/UserModel.js";

const addSubTodoController = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(424).send("Task name is required.");
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).send("User is unauthorized.");
    }

    const newTodoData = {
      ...req.body,
      createdBy: user._id,
      iscomplete: false,
    };

    const todo = await subTodo.create(newTodoData);

    res.status(201).json({
      id: todo._id,
      title: todo.title,
      content: todo.content,
      dueDate: todo.dueDate,
      priority: todo.priority,
      color: todo.color,
      createdBy: todo.createdBy,
      isComplete: todo.isComplete,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default addSubTodoController;
