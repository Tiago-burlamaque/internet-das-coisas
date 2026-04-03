const express = require("express")
const cors = require("cors")

const routerUser = require("./routes/usuarioRouter.js")
const routerEstoque = require("./routes/estoqueRouter.js")

const app = express()

app.use(express.json())
app.use(cors())

app.use(routerUser)
app.use(routerEstoque)

module.exports = { app };