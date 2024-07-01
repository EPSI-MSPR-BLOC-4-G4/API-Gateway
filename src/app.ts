import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import express from "express";
import * as dotevnv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./routes/auth.routes";
import customerRouter from "./routes/customer.routes";
import orderRouter from "./routes/order.routes";
import productRouter from "./routes/product.routes";
import { errorHandler } from "./middlewares/errorHandler";

dotevnv.config();

if (!process.env.PORT) {
  console.log(`No port value specified...`);
}

const PORT = parseInt(process.env.PORT as string, 10);

Sentry.init({
  dsn: "https://6e275a4fb52b9ca6e44220b4c39dc16b@o4507378463080448.ingest.de.sentry.io/4507529028042832",
  integrations: [
    nodeProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions

  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

Sentry.setupExpressErrorHandler(app);

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use("/", authRouter, customerRouter, orderRouter, productRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Bad request" });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

export default app;
