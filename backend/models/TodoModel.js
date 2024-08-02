import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, " Title is required"],
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
    todoList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubTodo",
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
