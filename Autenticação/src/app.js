import express from 'express'
import cors from 'cors'
import usuarioRouter from './routes/usuarioRouter.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use(usuarioRouter)

app.get('/', (req, res) => {
    res.send("Teste")
})

export default app;