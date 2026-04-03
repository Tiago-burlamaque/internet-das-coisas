const db = require('../config/db.js')

const getEstoque = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT id, nome, quantidade,  FROM estoque where ativo = 1");

        if (rows.length === 0) {
            return res.status(404).json({ message: "Nenhum estoque encontrado" });
        }
        return res.status(200).json({ message: "Estoque encontrados", data: rows });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar estoque", error: error.message });
    }
}

//criar funçção editar
const editarEstoque = async (req, res) => {
	try {
		const [rows] = await db.query("UPDATE estoque SET nome = ?, quantidade = ?, unidade = ? WHERE id = ?", [req.body.nome, req.body.quantidade, req.body.unidade, req.params.id]);

		if (rows.affectedRows === 0) {  
			return res.status(404).json({ message: "estoque não encontrado" });  
		}
		return res.status(200).json({ message: "estoque editado com sucesso", data: rows });
	} catch (error) {
		return res.status(500).json({ message: "Erro ao editar estoque", error: error.message });
	}
}

//criar função deletar
const deletarEstoque = async (req, res) => {
	try {
		// const [rows] = await db.query("UPDATE estoque SET ativo = 0 WHERE id = ?", [req.params.id]);
		const [rows] = await db.query("DELETE FROM estoque WHERE id = ?", [req.params.id]);

		if (rows.affectedRows === 0) {  
			return res.status(404).json({ message: "estoque não encontrado" });  
		}
		return res.status(200).json({ message: "estoque deletado com sucesso", data: rows });
	} catch (error) {
		return res.status(500).json({ message: "Erro ao deletar estoque", error: error.message });
	}
}

// criar funcao adicionar
const adicionarEstoque = async (req, res) => {
    try {
		const [rows] = await db.query("INSERT INTO estoque (nome, quantidade, unidade) VALUES (?, ?, ?)", [req.body.nome, req.body.quantidade, req.body.unidade]);

		if(rows.affectedRows === 0) {
			return res.status(404).json({ message: "Nenhum estoque adicionado" });
		}

		return res.status(201).json({ message: "estoque adicionado com sucesso", data: rows });
	} catch (error) {
		return res.status(500).json({ message: "Erro ao adicionar estoque", error: error.message });
	}
}

module.exports = {getEstoque, editarEstoque, deletarEstoque, adicionarEstoque}