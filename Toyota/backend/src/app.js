import express from 'express'
import cors from 'cors'

// Importando todas as rotas
import { router } from './routers/veiculoRouter.js'
import { routerUser } from './routers/usuariosRouter.js'
import { routerLog } from './routers/logRouter.js'


const app = express()

app.use(cors())
app.use(express.json())

// Endpoints
app.use("/veiculo", router);
app.use("/usuario", routerUser)
app.use("/log", routerLog)

export default app;