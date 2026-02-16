import express from "express"
const router = express.Router();
import db from '../config/db.js'

router.get("/", async (req, res) => {
  const [results] = await db.query("SELECT * FROM veiculo where ativo = 1");
  res.send(results);
})


router.post("/registro", async (req, res) => {
  const {
    nome,
    marca,
    modelo,
    ano,
    status_bateria,
    usuario_cadastro,
    usuario_atualizacao,
    usuario_exclusao,
    datahora_cadastro,
    datahora_atualizacao,
    datahora_exclusao
  } = req.body;
  try {
    const [results] = await db.query(`INSERT INTO veiculo
(nome, marca, modelo, ano, status_bateria,
 usuario_cadastro, datahora_cadastro)
VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [
        nome,
        marca,
        modelo,
        ano,
        status_bateria,
        usuario_cadastro
      ]
    );

    // Log aqui
    await db.query(
      "INSERT INTO log_sistema (acao, descricao) VALUES (?, ?)",
      [
        "INSERT",
        `Veículo ${nome} cadastrado com ID ${results.insertId}`
      ]
    );

    const [novoVeiculo] = await db.query(
      'SELECT * FROM veiculo WHERE idveiculo = ?',
      [results.insertId]
    );

    res.status(201).json(novoVeiculo[0]);
  } catch (error) {
    console.log(error)
  }
})

router.delete("/deletar/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [resultado] = await db.query(
      "DELETE FROM veiculo WHERE idveiculo = ?",
      [id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Veículo não encontrado" });
    }

    // Log depois que realmente deletou
    await db.query(
      "INSERT INTO log_sistema (acao, descricao) VALUES (?, ?)",
      ["DELETE", `Veículo ID ${id} deletado`]
    );

    return res.json({ mensagem: "Veículo deletado com sucesso" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
});

router.put("/atualizar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, marca, modelo, ano, status_bateria, usuario_atualizacao } = req.body;

    const [resultado] = await db.query(
      `UPDATE veiculo 
       SET nome = ?, 
           marca = ?, 
           modelo = ?, 
           ano = ?, 
           status_bateria = ?, 
           usuario_atualizacao = ?, 
           datahora_atualizacao = NOW()
       WHERE idveiculo = ?`,
      [nome, marca, modelo, ano, status_bateria, usuario_atualizacao, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Veículo não encontrado" });
    }

    // Log depois que realmente atualizou
    await db.query(
      "INSERT INTO log_sistema (acao, descricao) VALUES (?, ?)",
      ["UPDATE", `Veículo ID ${id} atualizado`]
    );

    res.json({ mensagem: "Atualizado com sucesso" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
});

// export default router;
export { router }          