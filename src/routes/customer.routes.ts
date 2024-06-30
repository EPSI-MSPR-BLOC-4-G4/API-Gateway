import express from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller";
import authMiddleware from "../middlewares/auth.middleware";

const customerRouter = express.Router();

customerRouter.post("/api/customers", authMiddleware, createCustomer);
customerRouter.get("/api/customers", authMiddleware, getAllCustomers);
customerRouter.get("/api/customers/:id", authMiddleware, getCustomerById);
customerRouter.put("/api/customers/:id", authMiddleware, updateCustomer);
customerRouter.delete("/api/customers/:id", authMiddleware, deleteCustomer);

export default customerRouter;
