import { Task } from "./task.model.js";

export const getTasks = async () => {
  return Task.find().sort({
    createdAt: -1,
  });
};

export const createTask = async (title: string, description: string) => {
  return Task.create({
    title,
    description,

    // userId: "guest-user",
  });
};

export const deleteTask = async (id: string) => {
  return Task.findByIdAndDelete(id);
};

export const updateTaskStatus = async (id: string, status: string) => {
  return Task.findByIdAndUpdate(id, { status }, { new: true });
};
