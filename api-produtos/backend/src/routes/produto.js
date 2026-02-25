import Router from 'express'

const router = Router()

// Importando controllers
import { adicionarProduto, deletarProduto, editarProduto, getProdutos } from '../controller/produtoController.js'

// Rotas
router.get('/produto', getProdutos);
router.patch('/produto/:id', editarProduto);
router.post('/produto', adicionarProduto);
router.delete('/produto/:id', deletarProduto);

export default router;