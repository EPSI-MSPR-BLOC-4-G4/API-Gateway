import { RequestHandler, Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import * as dotevnv from "dotenv";

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
  const proxy: RequestHandler = createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${context}`]: context,
    },
  });
  router.use(context, proxy);
});

export default router;
