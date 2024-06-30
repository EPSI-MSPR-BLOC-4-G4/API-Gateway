import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { handleRequest, get, post, put, del } from "../utils/fetch.utils";

dotenv.config();

const CUSTOMER_API_URL: string = process.env.CUSTOMER_API_URL!;

// Création d'un nouveau client
export const createCustomer = async (req: Request, res: Response) => {
  handleRequest(post(CUSTOMER_API_URL, req.body), res);
};

// Récupération de tous les clients
export const getAllCustomers = async (req: Request, res: Response) => {
  handleRequest(get(CUSTOMER_API_URL), res);
};

// Récupération d'un seul client
export const getCustomerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  handleRequest(get(`${CUSTOMER_API_URL}/${id}`), res);
};

// Mise à jour d'un client
export const updateCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  handleRequest(put(`${CUSTOMER_API_URL}/${id}`, req.body), res);
};

// Suppression d'un client
export const deleteCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  handleRequest(del(`${CUSTOMER_API_URL}/${id}`), res);
};
