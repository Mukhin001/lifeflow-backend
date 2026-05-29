import { Task } from "./task.model.js";
import type { TaskData } from "./task.types.js";

export const getTasks = async () => {
  return Task.find().sort({
    createdAt: -1,
  });
};

export const createTask = async (
  title: string,
  description: string,
  dueDate: string,
) => {
  return Task.create({
    title,
    description,
    dueDate,
    // userId: "guest-user",
  });
};

export const deleteTask = async (id: string) => {
  return Task.findByIdAndDelete(id);
};

export const updateTask = async (id: string, data: Partial<TaskData>) => {
  return Task.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
};
