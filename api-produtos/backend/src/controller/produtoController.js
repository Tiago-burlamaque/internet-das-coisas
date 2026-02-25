import db from '../config/db.js'

export const getProdutos = async (req, res) => {
    try {
        const [results] = await db.query('SELECT id, nome, descricao, valor FROM produto WHERE ativo = 1')

        if (results.length === 0) {
            return res.status(404).json({ message: "Produto não encontrado." })
        }

        return res.status(200).json({ message: "Produtos encontrados com sucesso.", data: results })
    } catch (error) {
        return res.status(400).json({ message: "Erro ao buscar produtos." })
    }
}

export const editarProduto = async (req, res) => {
    try {
        const nomeProduto = req.body.nome;
        const descricao = req.body.descricao;
        const valor = req.body.valor;
        let id = req.params.id;

        const [results] = await db.query('UPDATE produto SET nome = ?, descricao = ?, valor = ? WHERE id = ?', [nomeProduto, descricao, valor, id])

        if (results.affectedRows === 0) {
            return res.status(400).json({ message: "Produto não encontrado." })
        }

        return res.status(200).json({ message: "Produto atualizado." })
    } catch (error) {
        res.status(400).json({ message: "Erro ao editar o produto.", error: error.message })

    }
}

export const deletarProduto = async (req, res) => {
    try {
        const id = req.params.id;

        const [results] = await db.query('DELETE FROM produto WHERE id = ?', [id])

        if (results.affectedRows === 0) { // Produto não foi afetado
            return res.status(400).json({ message: "Produto não encontrado." })
        }

        return res.status(200).json({ message: "Produto deletado." })
    } catch (error) {
        res.status(400).json({ message: "Erro ao deletar produto", error: error.message })
    }
}

export const adicionarProduto = async (req, res) => {
    try {
        const nome = req.body.nome;
        const valor = req.body.valor;
        const descricao = req.body.descricao

        const [results] = await db.query('INSERT INTO produto (nome, valor, descricao) VALUES (?, ?, ?)', [nome, valor, descricao])
        
        if (results.affectedRows === 0) { // Produto não foi afetado
            return res.status(400).json({ message: "Produto não encontrado." })
        }

        return res.status(201).json({ message: "Produto criado." })

    } catch {
        return res.status(404).json({message: "Erro ao criar produto", error: error.message})
    }
}