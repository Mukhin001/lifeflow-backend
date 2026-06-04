import type { Request, Response } from "express";
import * as taskService from "./task.service.js";
import mongoose from "mongoose";

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
        message: "Название обязателено",
      });
    }

    if (!description?.trim()) {
      return res.status(400).json({
        message: "Описание обязателено",
      });
    }

    if (dueDate && Number.isNaN(Date.parse(dueDate))) {
      return res.status(400).json({
        message: "Некорректная дата",
      });
    }

    if (title.length > 100) {
      return res.status(400).json({
        message: "Название слишком длинное",
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Некорректный id",
      });
    }

    const task = await taskService.deleteTask(id);

    if (!task) {
      return res.status(404).json({
        message: "Задача не найдена",
      });
    }

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
    const { title, description } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Некорректный id",
      });
    }

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({
        message: "Название обязателено",
      });
    }

    if (description !== undefined && !description.trim()) {
      return res.status(400).json({
        message: "Описание обязателено",
      });
    }

    const task = await taskService.updateTask(id, req.body);

    if (!task) {
      return res.status(404).json({
        message: "Задача не найдена",
      });
    }

    res.json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Ошибка обновления задачи",
    });
  }
};
