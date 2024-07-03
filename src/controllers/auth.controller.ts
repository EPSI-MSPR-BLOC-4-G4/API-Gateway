import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt.utils";
import * as dotevnv from "dotenv";

dotevnv.config();

const prisma = new PrismaClient();

type Credentials = {
  username: string;
  password: string;
  registerSecret?: string;
};

const register = async (req: Request, res: Response) => {
  const { username, password, registerSecret }: Credentials = req.body;

  // Vérifiez le secret d'inscription
  if (registerSecret !== process.env.REGISTER_SECRET) {
    return res
      .status(403)
      .json({ message: "Forbidden: Invalid register secret" });
  }

  try {
    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Création d'un nouvel utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // Retourne un token JWT
    const token = generateToken(newUser.username);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: JSON.stringify(error),
    });
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password }: Credentials = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    // If user doesn't exist, use a dummy password hash to prevent timing attacks
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || "$2b$10$dummyhashdummyhashdummyhashdummyha"
    );

    if (!user || !isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user.username);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export { register, login };
