const express = require('express');
const { getEstoque, adicionarEstoque, editarEstoque, deletarEstoque } = require('../controller/estoqueController.js');
const routerEstoque = express.Router();



routerEstoque.get('/estoque', getEstoque)
routerEstoque.post('/estoque', adicionarEstoque)
routerEstoque.patch('/estoque', editarEstoque)
routerEstoque.delete('/estoque', deletarEstoque)

module.exports = routerEstoque;