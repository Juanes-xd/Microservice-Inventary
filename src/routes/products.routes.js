import { Router } from "express";
import {
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../controllers/product.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";
const router = Router();

router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.post("/products", [verifyToken, isAdmin],createProduct);
router.delete("/product/:id",[verifyToken, isAdmin], deleteProduct);
router.put("/product/:id", [verifyToken, isAdmin], updateProduct);

export default router;
