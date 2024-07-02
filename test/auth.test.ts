import request from "supertest";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import app from "../src/app";

const prisma = new PrismaClient();

// Nettoyer la base de données avant les tests
beforeAll(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Auth API", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({ username: "newuser", password: "password" })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("token");
    });

    it("should not register an existing user", async () => {
      await prisma.user.create({
        data: {
          username: "existinguser",
          password: await bcrypt.hash("password", 10),
        },
      });

      const response = await request(app)
        .post("/api/auth/register")
        .send({ username: "existinguser", password: "password" })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Username already exists"
      );
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login an existing user", async () => {
      await prisma.user.create({
        data: {
          username: "loginuser",
          password: await bcrypt.hash("loginpass", 10),
        },
      });

      const response = await request(app)
        .post("/api/auth/login")
        .send({ username: "loginuser", password: "loginpass" })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("should not login a non-existing user", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ username: "nonuser", password: "nopass" })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid username or password"
      );
    });

    it("should not login with incorrect password", async () => {
      await prisma.user.create({
        data: {
          username: "wrongpassuser",
          password: await bcrypt.hash("rightpass", 10),
        },
      });

      const response = await request(app)
        .post("/api/auth/login")
        .send({ username: "wrongpassuser", password: "wrongpass" })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid username or password"
      );
    });
  });
});
