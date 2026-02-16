import express from 'express'
const routerUser = express.Router()
import db from '../config/db.js'



routerUser.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const [results] = await db.query(
            "SELECT * FROM usuario WHERE email = ? AND senha = ? AND ativo = 1",
            [email, senha]
        );

        if (results.length === 0) {
            return res.status(401).json({ mensagem: "Email ou senha inválidos" });
        }

        res.json({
            mensagem: "Login realizado com sucesso",
            usuario: results[0]
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: "Erro no servidor" });
    }
});

routerUser.post('/', async (req, res) => {
    const { nome, email, senha } = req.body
    try {
        const [results] = await db.query("INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)",
            [nome, email, senha]
        )
        const [novoUsuario] = await db.query('SELECT * FROM usuario WHERE idusuario = ?', [results.insertId])
        res.status(201).json(novoUsuario[0])
        res.send(results)
    } catch (error) {
        console.log(error)
    }
})

export { routerUser }