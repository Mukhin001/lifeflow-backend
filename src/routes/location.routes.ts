import { Router } from "express";
import { saveLocation } from "../controllers/location.controller.js";

const router = Router();

router.post("/", saveLocation);

export default router;
