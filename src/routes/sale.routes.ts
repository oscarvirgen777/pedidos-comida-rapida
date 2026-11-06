import { Router } from "express";
import { getSales, getSale, createSaleHandler } from "../controllers/sale.controller.js";

const router = Router();

router.get("/", getSales);
router.get("/:id", getSale);
router.post("/", createSaleHandler);

export default router;   