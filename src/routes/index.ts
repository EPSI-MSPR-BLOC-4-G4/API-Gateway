import { Router } from "express";
import proxyMiddleware from "../middlewares/proxy.middleware";
import authRouter from "./auth.routes";

const router = Router();

router.use(proxyMiddleware);
router.use(authRouter);

export default router;
