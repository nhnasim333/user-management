import express, { Application, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import config from "./app/config";
import swaggerSpec from "./app/config/swagger";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFount from "./app/middlewares/notFound";
import router from "./app/routes";
const app: Application = express();

// parsers
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      // "https://user-management-system-mocha-ten.vercel.app",
    ],
    credentials: true,
  })
);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "User Management API Docs",
}));

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send(`User Management API Server Running on port ${config.port}`);
});

// global error handler middleware
app.use(globalErrorHandler);

// not found middleware
app.use(notFount);

export default app;
