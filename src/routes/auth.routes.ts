import express from "express";
import { register, login } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/api/auth/register", register);
authRouter.post("/api/auth/login", login);

export default authRouter;
