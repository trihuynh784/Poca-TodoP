import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: String,
    status: String,
    completedAt: Date,
    createdAt: Date,
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema, "tasks");

export default Task;
