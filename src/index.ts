import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

import routeRouter from "./modules/route/route.routes.js";
import currencyRouter from "./modules/currency/currency.routes.js";
import taskRoutes from "./modules/tasks/task.routes.js";
import type { HealthCheckResponse } from "./types/healthCheck.types.js";
import { checkDatabase } from "./middleware/checkDatabase.js";

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

app.use("/tasks", checkDatabase, taskRoutes);

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB подключена");
  } catch (error) {
    console.error("MongoDB не подключена", error);
  }

  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT} 🚀`);
  });
};

startServer();
