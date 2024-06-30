import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.post("/api/orders", createOrder);
orderRouter.get("/api/orders", getAllOrders);
orderRouter.get("/api/orders/:id", getOrderById);
orderRouter.put("/api/orders/:id", updateOrder);
orderRouter.delete("/api/orders/:id", deleteOrder);

export default orderRouter;
