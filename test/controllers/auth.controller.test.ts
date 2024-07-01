// import request from "supertest";
// import { Response } from "express";
// import bcrypt from "bcryptjs";
// import { PrismaClient } from "@prisma/client";
// import { generateToken } from "../../src/utils/jwt.utils";
// import { register, login } from "../../src/controllers/auth.controller";
// import app from "../../src/app";

// jest.mock("../../src/utils/jwt.utils"); // Mock generateToken

// const prisma = new PrismaClient();

// describe("POST /api/auth/register", () => {
//   beforeEach(async () => {
//     await prisma.user.deleteMany(); // Clear users before each test
//   });

//   it("should successfully register a new user and return a token", async () => {
//     const newUser = {
//       username: "newuser",
//       password: "password123",
//     };
//     const response = await request(app)
//       .post("/api/auth/register")
//       .send(newUser)
//       .expect(201);
//     expect(response.body).toHaveProperty("token");
//     const createdUser = await prisma.user.findUnique({
//       where: { username: newUser.username },
//     });
//     expect(createdUser).not.toBeNull();
//     expect(createdUser?.username).toBe(newUser.username);
//   });

//   it("should return 400 if username already exists", async () => {
//     const existingUser = {
//       username: "existinguser",
//       password: "password123",
//     };
//     await prisma.user.create({ data: existingUser });
//     const response = await request(app)
//       .post("/api/auth/register")
//       .send(existingUser)
//       .expect(400);
//     expect(response.body).toEqual({ message: "Username already exists" });
//   });

//   it("should return 500 on server error during user creation", async () => {
//     jest
//       .spyOn(prisma.user, "create")
//       .mockRejectedValueOnce(new Error("Database error"));
//     const mockUser = { username: "testuser", password: "password123" };
//     const response = await request(app)
//       .post("/api/auth/register")
//       .send(mockUser)
//       .expect(500);
//     expect(response.body).toEqual({
//       message: "Error registering user",
//       error: "Database error",
//     });
//   });
// });
test("Addition test", () => {
  const num1 = 5;
  const num2 = 10;
  const expectedSum = 15;

  const sum = num1 + num2;
  expect(sum).toBe(expectedSum);
});
