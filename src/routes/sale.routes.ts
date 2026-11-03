// src/routes/sale.routes.ts
import { Router } from "express";
import { getSales, getSale, createSale, updateSale, deleteSale } from "../controllers/sale.controller.js";

const router: Router = Router();

router.get("/", getSales);
router.get("/:id", getSale);
router.post("/", createSale);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);

export default router;   