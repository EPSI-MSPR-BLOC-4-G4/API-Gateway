import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import authMiddleware from "../middlewares/auth.middleware";

const productRouter = express.Router();

productRouter.post("/api/products", authMiddleware, createProduct);
productRouter.get("/api/products", authMiddleware, getAllProducts);
productRouter.get("/api/products/:id", authMiddleware, getProductById);
productRouter.put("/api/products/:id", authMiddleware, updateProduct);
productRouter.delete("/api/products/:id", authMiddleware, deleteProduct);

export default productRouter;
