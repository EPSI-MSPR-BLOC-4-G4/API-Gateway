import express from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller";

const customerRouter = express.Router();

customerRouter.post("/api/customers", createCustomer);
customerRouter.get("/api/customers", getAllCustomers);
customerRouter.get("/api/customers/:id", getCustomerById);
customerRouter.put("/api/customers/:id", updateCustomer);
customerRouter.delete("/api/customers/:id", deleteCustomer);

export default customerRouter;
