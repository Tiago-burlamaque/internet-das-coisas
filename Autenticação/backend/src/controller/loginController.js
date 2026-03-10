import db from '../config/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export const loginUser = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (email === "" || senha === "") {
            return res.status(400).json({ Message: "Email ou senha inválidos. São campos obrigatórios." , success: false})
        }

        const [rows] = await db.query("SELECT id, nome, email, senha, tipo_usuario FROM usuario WHERE email = ? AND ativo = 1 LIMIT 1", [email])

        if (rows.length === 0) {
            return res.status(401).json({ Message: "Credênciais inválidas" })
        }

        const user = rows[0]

        const ok = await bcrypt.compare(senha, user.senha);

        if (!ok) {
            return res.status(401).json({ Message: "Credênciais inválidas, senha inválida" })
        }

        // Criar token JWT - Crachar do usuário
        const token = jwt.sign(
            {
                sub: user.id,
                tipo_usuario: user.tipo_usuario,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        return res.status(200).json({
            message: "Login com sucesso.",
            token: token,
            user: {
                id: user.id,
                email: user.email,
                tipo_usuario: user.tipo_usuario,
                nome: user.nome
            }
        });

    } catch (error) {
        res.status(400).json({ Message: "Ocorreu um erro: ", erro: error.message })
    }
}