import db from '../config/db.js'
import bcrypt, { hash } from 'bcrypt'


export const createUser = async (req, res) => {
    try {

        const nome = req.body.nome;
        const email = req.body.email;
        const senha = req.body.senha;
        const tipo_usuario = req.body.tipo_usuario;

        if (nome === "")
            return res.status(400).json({ message: "Nome não deve estar vázio." })

        const saltRound = 10
        const hashPassword = await bcrypt.hash(senha, saltRound) // Senha convertida para hash - criptografa a senha

        const [rows] = await db.query('INSERT INTO usuario (nome, email, senha, ativo, tipo_usuario) VALUES (?, ?, ? , ?, ?)', [nome, email, hashPassword, 1, tipo_usuario])

        if (rows.affectedRows === 0)
            return res.status(400).json({ message: "Não foi possível inserir o usuário." })

        return res.status(201).json({ message: "Usuário cadastrado com sucesso." })
    } catch (error) {
        return res.status(500).json({ message: "Erro ao criar usuário", erro: error.message })
    }
}

