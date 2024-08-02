import mongoose from "mongoose";

const subTodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: false,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    required: false,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
});

export const subTodo = mongoose.model("subTodo", subTodoSchema);

export default subTodo;
