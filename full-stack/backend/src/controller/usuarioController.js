const db = require("../config/db.js");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (nome.length < 5 || nome === "") {
            return res.status(400).json({ Message: "O nome deve ser completo. Deve conter pelo menos 5 caracteres e não pode estar vazio." })
        }

        if (email.length < 5 || email === "") {
            return res.status(400).json({ message: 'O email deve ser completo. Deve conter pelo menos 5 caracteres e não pode estar vazio.' });
        }

        const saltsRounds = 10
        const passwordHash = await bcrypt.hash(senha, saltsRounds)

        const [rows] = await db.query("INSERT INTO usuario (id, nome, email, senha, ativo) VALUES (id, ?, ?, ?, ?)", [nome, email, passwordHash, 1])

        if (rows.affectedRows === 0) {
            return res.status(400).json({ Message: "Não foi possível criar o usuário." })
        }

        return res.status(201).json({ message: 'Usuário criado com sucesso.' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar usuário.', error: error.message });
    }

};

const login = async (req, res) => {
    try {
        const { email, senha } = req.body
        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }

        const [rows] = await db.query(
            "SELECT id, nome, email, senha FROM usuario WHERE email = ? LIMIT 1",
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        const user = rows[0];  // usuário encontrado, agora verificar a senha

        const ok = await bcrypt.compare(senha, user.senha);  // compara a senha fornecida com o hash armazenado no banco de dados
        if (!ok) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        // JWT: "crachá" do usuário  
        const token = jwt.sign(
            {
                sub: user.id,
             
            }, // payload (não coloque senha aqui)  
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        return res.json({
            message: "Login realizado com sucesso.",
            token,
        });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao realizar login.', error: error.message });
    }
}

module.exports = { createUser, login };