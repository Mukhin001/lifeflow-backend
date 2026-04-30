import express, { type Request, type Response } from "express";
import cors from "cors";
import routeRouter from "./routes/route.routes.js";
import type { HealthCheckResponse } from "./types/healthCheck.types.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response<HealthCheckResponse>) => {
  res.json({
    status: "ok",
    message: "Hello from backend 👋",
    time: new Date().toISOString(),
  });
});

app.use("/route", routeRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT} 🚀`);
});
