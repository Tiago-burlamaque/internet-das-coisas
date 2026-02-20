import Router from 'express'

const router = Router()

// Importando controllers
import { getProdutos } from '../controller/produtoController.js'

// Rotas
router.get('/produto', getProdutos)

export default router