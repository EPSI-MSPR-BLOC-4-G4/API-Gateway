import request from "supertest";
import express from "express";
import authMiddleware from "../../src/middlewares/auth.middleware";
import { generateToken } from "../../src/utils/jwt.utils";

const app = express();
app.use(express.json());

app.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Access granted" });
});

describe("Auth Middleware", () => {
  it("should deny access if no token is provided", async () => {
    const response = await request(app).get("/protected");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Access denied, no token provided"
    );
  });

  it("should deny access if token is invalid", async () => {
    const response = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer invalid_token");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });

  it("should grant access if token is valid", async () => {
    const token = generateToken("testuser");
    const response = await request(app)
      .get("/protected")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Access granted");
  });
});
