import { Router } from "express";
import { loginUser } from "../controller/loginController.js";

export const loginRouter = Router()

loginRouter.post('/login', loginUser)