import { Router } from "express";
import { createUser } from "../controller/usuarioController.js";

const usuarioRouter = Router()

usuarioRouter.post('/registro', createUser)


export default usuarioRouter;