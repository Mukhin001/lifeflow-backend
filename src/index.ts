import express from "express";
import cors from "cors";
import loacationRouter from "./routes/location.routes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Hello from backend 👋",
    time: new Date().toISOString(),
  });
});

app.use("/location", loacationRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
