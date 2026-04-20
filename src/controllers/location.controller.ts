import type { Request, Response } from "express";

export const saveLocation = (req: Request, res: Response) => {
  const { lat, lng } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({
      status: "error",
      message: "lat and lng are required",
    });
  }

  if (typeof lat !== "number" || typeof lng !== "number") {
    return res.status(400).json({
      status: "error",
      message: "lat and lng must be numbers",
    });
  }

  console.log("User location:", lat, lng);

  res.json({
    status: "ok",
    received: { lat, lng },
  });
};
