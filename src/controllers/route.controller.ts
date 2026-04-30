import type { Request, Response } from "express";
import type {
  CalculateRouteRequest,
  CalculateRouteResponse,
  Route,
} from "../types/route.types.js";

export const calculateRoute = async (
  req: Request<{}, CalculateRouteResponse, CalculateRouteRequest>,
  res: Response<CalculateRouteResponse>,
) => {
  const { start, end } = req.body;

  if (!end) {
    return res.status(400).json({
      status: "error",
      message: "start и end обязательны",
    });
  }

  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;

    const response = await fetch(url);
    const data = await response.json();

    const route = data.routes[0].geometry.coordinates.map((c: Route) => [
      c[1],
      c[0],
    ]);

    return res.json({
      status: "ok",
      route,
      message: "Маршрут успешно построен",
    });
  } catch (e) {
    return res.status(500).json({
      status: "error",
      message: "Ошибка построения маршрута",
    });
  }
};
