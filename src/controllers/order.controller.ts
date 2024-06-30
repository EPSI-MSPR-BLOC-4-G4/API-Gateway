import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { handleRequest, get, post, put, del } from "../utils/fetch.utils";

dotenv.config();

const ORDER_API_URL: string = process.env.ORDER_API_URL!;

// Création d'une nouvelle commande
const createOrder = async (req: Request, res: Response) => {
  handleRequest(post(ORDER_API_URL, req.body), res);
};

// Récupération de toutes les commandes
const getAllOrders = async (req: Request, res: Response) => {
  handleRequest(get(ORDER_API_URL), res);
};

// Récupération d'une seule commande
const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  handleRequest(get(`${ORDER_API_URL}/${id}`), res);
};

// Mise à jour d'une commande
const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  handleRequest(put(`${ORDER_API_URL}/${id}`, req.body), res);
};

// Suppression d'une commande
const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  handleRequest(del(`${ORDER_API_URL}/${id}`), res);
};

export { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };
