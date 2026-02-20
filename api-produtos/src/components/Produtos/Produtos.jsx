import { useState, useEffect } from "react"
import { getProdutos } from "../../services/produto"

const Produtos = () => {

    const carregaPrduto = async () => {
        try {
            const lista = await getProdutos();
            setProdutos(lista.data);
        } catch (error) {
            console.log(`Deu erro na treta toda: ${error}`);

        }
    }

    useEffect(() => {
        carregaPrduto();
    }, [])

    const [produtos, setProdutos] = useState([])
    return (
        <>
            <h1>Dourado Lanches</h1>

            <button className="btn btn-danger">Adicionar</button>

            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>

            </table>
            <tbody>
                {
                    produtos.map((p) => (
                        <tr key={p.id}>
                            <td>{p.nome}</td>
                            <td>{p.descricao}</td>
                            <td>{p.valor}</td>
                        </tr>
                    ))
                }
            </tbody>
        </>
    )
}

export default Produtos