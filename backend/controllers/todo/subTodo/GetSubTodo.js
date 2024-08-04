import SubTodo from "../../../models/SubTodoModel.js"
import User from "../../../models/UserModel.js"
const getSubTodoController = async (req, res, next) => { 

  try{

    const user = await User.findById(req.userId);
    console.log(user)
    if(!user) {
      return res.status(401).send("User is unauthorised to access the data.");
    }

    const getTodos = await SubTodo.find({createdBy: user._id}).sort({updatedAt: -1});

    // Map through todos to change _id to id
    const todos = getTodos.map(todo => ({
      ...todo._doc, // Spread the existing properties
      id: todo._id, // Add id field
      _id: undefined // Remove _id field
    }));

    console.log("todos are ...........................",{todos});

    res.status(201).json({todos})

  }catch(error) {
    res.status(500).send(error)
  }
}

export default getSubTodoController