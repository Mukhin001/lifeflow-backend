import { Router } from "express";
import { calculateRoute } from "./route.controller.js";

const router = Router();

router.post("/calculate", calculateRoute);

export default router;
