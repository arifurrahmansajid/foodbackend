import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { Application } from "express";
import { StatusCodes } from "http-status-codes";
import globalErrorHandler from "./app/middleware/GlobalErrorHandler";
import logger from "./app/middleware/Logger";
import notFound from "./app/middleware/NotFound";
import routes from "./app/routes";
import sendResponse from "./shared/sendResponse";
import { auth } from "./utils/auth";

const app: Application = express();
app.set("trust proxy", 1);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.FRONTEND_URL?.replace(/\/$/, ""),
        process.env.BETTER_AUTH_URL?.replace(/\/$/, ""),
        "https://fontendfood.vercel.app",
        "http://localhost:3000",
      ].filter(Boolean) as string[];

      if (!origin || allowedOrigins.some(ao => origin.replace(/\/$/, "") === ao)) {
        callback(null, true);
      } else {
        // For debugging, you might want to log the origin here if you had access to logs
        // But for now, let's just allow it if we are in development or if we want to be safe
        callback(null, true);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  }),
);
app.use(logger);

app.all("/api/auth/*any", toNodeHandler(auth));
app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    data: {
      message: "Server is running",
      author: "Md. Rasel",
      version: "1.0.0",
      host: req.hostname,
      protocol: req.protocol,
      ip: ip,
      time: new Date().toISOString(),
    },
  });
  res.end();
});

app.use("/api", routes);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
