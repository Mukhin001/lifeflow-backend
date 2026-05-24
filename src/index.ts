import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

import routeRouter from "./routes/route.routes.js";
import currencyRouter from "./routes/currency.routes.js";
import taskRoutes from "./routes/task.routes.js";
import type { HealthCheckResponse } from "./types/healthCheck.types.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

app.use("/currency", currencyRouter);

app.use("/tasks", taskRoutes);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT} 🚀`);
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

startServer();
