import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { handleRequest, get, post, put, del } from "../utils/fetch.utils";

dotenv.config();

const PRODUCT_API_URL: string = process.env.PRODUCT_API_URL!;

// Création d'un nouveau produit
const createProduct = async (req: Request, res: Response) => {
  handleRequest(post(PRODUCT_API_URL, req.body), res);
};

// Récupération de tous les produits
const getAllProducts = async (req: Request, res: Response) => {
  handleRequest(get(PRODUCT_API_URL), res);
};

// Récupération d'un seul produit
const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  handleRequest(get(`${PRODUCT_API_URL}/${id}`), res);
};

// Mise à jour d'un produit
const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  handleRequest(put(`${PRODUCT_API_URL}/${id}`, req.body), res);
};

// Suppression d'un produit
const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  handleRequest(del(`${PRODUCT_API_URL}/${id}`), res);
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
