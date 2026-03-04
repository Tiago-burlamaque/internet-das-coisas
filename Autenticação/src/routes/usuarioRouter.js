import { Router } from "express";
import { createUser } from "../controller/usuarioController.js";

const usuarioRouter = Router()

usuarioRouter.post('/usuario', createUser)

export default usuarioRouter;