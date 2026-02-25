import { api } from "./api.js";

// Busca e mostra os produtos
export async function getProdutos() {
    const response = await api.get("/produto") // Rota produto
    if (response.status === 200)
        if (response.data)
            return response.data
}

// Adicionar produtos
export async function postProdutos(produto) {
    const response = await api.post("/produto", produto) // Rota produto
    if (response.status === 201)
      return  true;
    
    return false;
}

export async function patchProduto (id, produto) {
    const response = await api.patch(`/produto/${id}`, produto)

    if(response.status === 200)
        return true

    return false;
}

export async function deleteProduto (id, produto) {
    const response = await api.delete(`/produto/${id}`, produto)

    if(response.data === 200)
        return true
    
    return false;
}