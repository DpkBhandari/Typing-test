import express from "express";
import { userRegister, userLogin } from "./user.controllers.js";

const userRoutes = express.Router();

userRoutes.post("/login", userLogin);
userRoutes.post("/register", userRegister);

export default userRoutes;
