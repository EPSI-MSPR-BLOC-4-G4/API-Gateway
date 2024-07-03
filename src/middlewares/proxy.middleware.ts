import { RequestHandler, Router } from "express";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import * as dotevnv from "dotenv";
import authMiddleware from "./auth.middleware";

dotevnv.config();

const router = Router();

// Configuration des proxys pour chaque API enfant
const proxyTargets: Record<string, string> = {
  "/api/customers": process.env.CUSTOMER_API_URI!,
  "/api/orders": process.env.ORDER_API_URI!,
  "/api/products": process.env.PRODUCT_API_URI!,
};

// Boucle pour configurer les proxys
Object.keys(proxyTargets).forEach((context) => {
  const target = proxyTargets[context];
  if (!target) {
    throw new Error(`Missing target for context: ${context}`);
  }
  const proxy: RequestHandler = createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${context}`]: context,
    },
    on: {
      proxyReq: fixRequestBody,
    },
  });
  router.use(context, authMiddleware, proxy);
});

export default router;
