import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller";
import authMiddleware from "../middlewares/auth.middleware";

const orderRouter = express.Router();

orderRouter.post("/api/orders", authMiddleware, createOrder);
orderRouter.get("/api/orders", authMiddleware, getAllOrders);
orderRouter.get("/api/orders/:id", authMiddleware, getOrderById);
orderRouter.put("/api/orders/:id", authMiddleware, updateOrder);
orderRouter.delete("/api/orders/:id", authMiddleware, deleteOrder);

export default orderRouter;
