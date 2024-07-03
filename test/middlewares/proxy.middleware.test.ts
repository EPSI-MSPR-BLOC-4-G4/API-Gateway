import request from "supertest";
import express from "express";
import authMiddleware from "../../src/middlewares/auth.middleware";
import proxyMiddleware, {
  configureProxy,
} from "../../src/middlewares/proxy.middleware";
import * as dotevnv from "dotenv";

dotevnv.config();

describe("Proxy Middleware", () => {
  it("should proxy requests to the correct target", async () => {
    const context = "/api/customers";

    const expressApp = express();
    configureProxy(context);
    expressApp.use(context, authMiddleware, proxyMiddleware);

    const response = await request(expressApp).get(`${context}/1`).expect(401);
  });

  it("should return 404 if no target is found", async () => {
    const context = "/api/unknown";

    const expressApp = express();
    configureProxy(context);
    expressApp.use(context, proxyMiddleware);

    const response = await request(expressApp).get(`${context}/1`).expect(404);
  });
});
