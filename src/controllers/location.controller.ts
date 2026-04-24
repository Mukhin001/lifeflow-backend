import type { Request, Response } from "express";
import type { LatLng, SendLocationResponse } from "../types/location.js";

export const saveLocation = (
  req: Request<{}, SendLocationResponse, LatLng>,
  res: Response<SendLocationResponse>,
) => {
  const { lat, lng } = req.body;

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
};
