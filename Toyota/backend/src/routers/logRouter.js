import express from 'express'
const routerLog = express.Router()
import db from '../config/db.js'

routerLog.get("/", async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM log_sistema ORDER BY datahora DESC");
        res.json(results);
        res.send(results)
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

routerLog.post("/enviar", async (req, res) => {
    const { acao, descricao } = req.body;

    try {

        await db.query(
            "INSERT INTO log_sistema (acao, descricao) VALUES (?, ?)",
            [acao, descricao]
        );

        res.status(201).json({
            sucesso: true,
            mensagem: "Log criado com sucesso"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            sucesso: false,
            erro: error.message
        });
    }
});

routerLog.put("/atualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    try {

        // Atualiza o veículo
        await db.query(
            "UPDATE veiculos SET nome=? WHERE idveiculo=?",
            [nome, id]
        );

        // Cria o log
        await db.query(
            "INSERT INTO log_sistema (acao, descricao) VALUES (?, ?)",
            [
                "UPDATE",
                `Veículo ID ${id} atualizado para nome ${nome}`
            ]
        );

        res.json({ sucesso: true });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

export { routerLog }