import request from "supertest";
import app from "../src/app";

describe("App", () => {
  it("should respond with 404 for unknown routes", async () => {
    const response = await request(app).get("/unknown-route");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Bad request");
  });

  it("should have security headers set by Helmet", async () => {
    const response = await request(app).get("/");
    expect(response.headers).toHaveProperty("x-dns-prefetch-control");
    expect(response.headers).toHaveProperty("x-frame-options");
    expect(response.headers).toHaveProperty("strict-transport-security");
    expect(response.headers).toHaveProperty("x-download-options");
    expect(response.headers).toHaveProperty("x-content-type-options");
    expect(response.headers).toHaveProperty("x-xss-protection");
  });
});
