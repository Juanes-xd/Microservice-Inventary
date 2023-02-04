import { Router } from "express";
import {
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../controllers/product.controller.js";
import { verifyToken } from "../middlewares/auth.js";
const router = Router();

router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.post("/products", [verifyToken], createProduct);
router.delete("/product/:id", [verifyToken], deleteProduct);
router.put("/product/:id", [verifyToken], updateProduct);

export default router;
