import type { Request, Response } from "express";
import type {
  SendLocationRequest,
  SendLocationResponse,
} from "../types/location.types.js";

export const saveLocation = (
  req: Request<{}, SendLocationResponse, SendLocationRequest>,
  res: Response<SendLocationResponse>,
) => {
  const { type } = req.body;

  if (!type) {
    return res.status(400).json({
      status: "error",
      message: "Не указан тип запроса (type)",
    });
  }

  if (type === "denied") {
    return res.json({
      status: "denied",
      message: "Пользователь отклонил доступ к геолокации",
    });
  }

  const { lat, lng } = req.body;

  if (type === "success") {
    if (lat === undefined || lng === undefined) {
      return res.status(400).json({
        status: "error",
        message: "Координаты lat и lng обязательны",
      });
    }

    if (typeof lat !== "number" || typeof lng !== "number") {
      return res.status(400).json({
        status: "error",
        message: "Координаты должны быть числами",
      });
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({
        status: "error",
        message: "Координаты вне допустимого диапазона",
      });
    }

    console.log("User location:", lat, lng);

    return res.json({
      status: "ok",
      message: "Координаты успешно получены",
      received: { lat, lng },
    });
  }
};
