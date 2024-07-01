import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";

interface AuthRequest extends Request {
  username?: string;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    const payload = verifyToken(token);
    req.username = payload.username;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
