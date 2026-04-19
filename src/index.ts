import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Hello from backend 👋",
    time: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
