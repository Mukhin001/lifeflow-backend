import { Router } from "express";
import { getRates } from "../controllers/currency.controller.js";

const router = Router();

router.get("/rates", getRates);

export default router;
