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

// Fonction pour configurer un proxy pour un contexte donné
export const configureProxy = (context: string): void => {
  const target = proxyTargets[context];
  if (!target) {
    router.use(context, (req, res) => {
      res
        .status(404)
        .send({ message: "Not found target of context : " + context });
    });
    return;
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
};

// Boucle pour configurer les proxys
Object.keys(proxyTargets).forEach((context) => {
  configureProxy(context);
});

export default router;
