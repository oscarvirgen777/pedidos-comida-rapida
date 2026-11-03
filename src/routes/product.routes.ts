import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct } from "../controllers/product.controller.js";

const router: Router = Router();

router.get("/menu", getProducts);
router.get("/menu/:id", getProduct);
router.post("/menu", createProduct);
router.put("/menu/:id", updateProduct);

export default router;   