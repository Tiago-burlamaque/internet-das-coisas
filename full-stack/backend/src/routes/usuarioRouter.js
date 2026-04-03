const express = require('express');
const routerUser = express.Router();

const { createUser, login } = require("../controller/usuarioController.js")

routerUser.post('/usuario/registro', createUser)
routerUser.post('/usuario/login', login)

module.exports = routerUser;