import type { Request, Response } from "express";
import * as taskService from "./task.service.js";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTasks();

    res.json(tasks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Ошибка получения задач",
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        message: "Title обязателен",
      });
    }

    if (!description?.trim()) {
      return res.status(400).json({
        message: "Description обязателен",
      });
    }

    const task = await taskService.createTask(title, description, dueDate);

    res.status(201).json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Ошибка создания задачи",
    });
  }
};

export const deleteTask = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    await taskService.deleteTask(id);

    res.json({
      message: "Задача удалена",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Ошибка удаления задачи",
    });
  }
};

export const updateTask = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const task = await taskService.updateTask(id, req.body);

    res.json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Ошибка обновления задачи",
    });
  }
};
