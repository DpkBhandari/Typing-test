import express, { urlencoded } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import userRoutes from "./user/user.routes.js";
import globalErrorHandler from "./middlewares.js/globalErrorHandler.js";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", userRoutes);

app.get("/", (req, res) => {
  res.send("<H1>Server is Running </H1>");
});

app.use(globalErrorHandler);
export default app;
