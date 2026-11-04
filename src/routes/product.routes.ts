import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct } from "../controllers/product.controller.js";
import { validateProduct } from '../middlewares/validate-products.js';

const router: Router = Router();

router.get("/menu", getProducts);
router.get("/menu/:id", getProduct);
router.put("/menu/:id", updateProduct);
router.post('/menu', validateProduct, createProduct);

export default router;   