// src/routes/sale_detail.routes.ts
import { Router } from "express";
import { getSaleDetails, getSaleDetail, createSaleDetail, updateSaleDetail, deleteSaleDetail } from "../controllers/sale_detail.controller.js";

const router: Router = Router();

router.get("/", getSaleDetails);
router.get("/:id", getSaleDetail);
router.post("/", createSaleDetail);
router.put("/:id", updateSaleDetail);
router.delete("/:id", deleteSaleDetail);

export default router;   