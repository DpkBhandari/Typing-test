import express from "express";
import { userRegister, userLogin } from "./user.controllers.js";
import {
  registerLimiter,
  loginLimiter,
} from "../middlewares.js/limiter.middleware.js";
const userRoutes = express.Router();

userRoutes.post("/register", registerLimiter, userRegister);
userRoutes.post("/login", loginLimiter, userLogin);

export default userRoutes;
