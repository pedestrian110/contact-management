import Router from "express";
import { login, register, me } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/user", authMiddleware, me);

export default authRouter;
