import { useState, useEffect } from "react"
import { getProdutos } from "../../services/produto"
import ModalProduto from "./ModalProduto"
import EditarProduto from "./EditarProduto"

const Produtos = () => {

  // Lista que vem do backend (array de produtos)  
  const [produtos, setProdutos] = useState([]);

  // Controle do modal  
  const [modal, setModal] = useState(false);

  // Produto escolhido para editar (quando modo === "edit")  
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  // Define se o modal está em modo adicionar ou editar  
  const [modo, setModo] = useState("edit"); // "add" | "edit"  

  // Estados do formulário (inputs)  
  const [tituloEdit, setTituloEdit] = useState("");
  const [descricaoEdit, setDescricaoEdit] = useState("");
  const [valorEdit, setValorEdit] = useState("");

  /**  
   * Busca produtos no backend e guarda no state.  
   * Dica: como getProdutos() agora retorna array, fica simples.  
   */
  const carregarProdutos = async () => {
    try {
      const lista = await getProdutos();
      setProdutos(lista.data); // lista é array  
    } catch (error) {
      console.log("Erro ao carregar produtos:", error);
      setProdutos([]); // garante que a tabela não quebre  
    }
  };

  // Carrega 1 vez quando o componente monta  
  useEffect(() => {
    carregarProdutos();
  }, []);

  /**  
   * Abre modal no modo "edit" e preenche os inputs com o produto clicado  
   */
  const abrirModalEditar = (produto) => {
    setModo("edit");
    setProdutoSelecionado(produto);

    // Preenche form com os dados do produto  
    setTituloEdit(produto.nome ?? "");
    setDescricaoEdit(produto.descricao ?? "");
    setValorEdit(produto.valor ?? "");

    setModal(true);  // Abre o modal
  };

  /**  
   * Abre modal no modo "add" com inputs vazios  
   */
  const abrirModalAdicionar = () => {
    setModo("add");
    setProdutoSelecionado(null);

    setTituloEdit("");
    setDescricaoEdit("");
    setValorEdit("");

    setModal(true);
  };

  const fecharModal = () => {
    setModal(false);
    setProdutoSelecionado(null);
  };

  const salvar = async () => {
    try {
      const payload = {
        nomeProduto: tituloEdit,
        descricaoEdit: descricaoEdit,
        valorEdit: Number(valorEdit) > 0 ? valorEdit : 0
      }

      if (modo === "add") {
        const ok = await adicionarProduto(payload);
        if (!ok)
          console.log("Não foi possivel adicionar o produto.");
        return;
      } else {
        if (!produtoSelecionado.id){
          console.log("Nenhum produto selecionado");
        return
      }

      const ok = EditarProduto(produtoSelecionado.id, payload)
      if(!ok)
        console.log("Não foi possivel editar o produto.");
        return

    }

    await carregarProdutos()
    fecharModal()
    } catch (error) {
    console.log('Erro: ', error);
    
  }
}


return (
  <>
    <h1 className="text-3xl font-bold">Dourado Lanches</h1>

    <button className="border p-2 rounded border-white hover:border-blue-500 transition cursor-pointer" onClick={abrirModalAdicionar}>Adicionar</button>

    <table>
      <thead>
        <tr className="flex flex-row gap-42">
          <th className="border p-2">Nome</th>
          <th className="border p-2">Descrição</th>
          <th className="border p-2">Valor</th>
          <th className="border p-2">Ações</th>
        </tr>
      </thead>

      <tbody>
        {
          produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>{p.descricao}</td>
              <td>{p.valor}</td>
              <td>
                <button onClick={() => abrirModalEditar(p)} className="border border-white hover:border-blue-500 p-2 cursor-pointer rounded bg-blue-500">Editar</button>
                <button onClick={() => remover(p.id)} className="p-2 cursor-pointer rounded bg-red-500 border border-white hover:border-red-500 ml-5" >Deletar</button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>

    <ModalProduto
      open={modal}
      onClose={fecharModal}
      onSave={salvar}
      title={modo === "add" ? "Adicionar produto" : produtoSelecionado?.nome}
    >
      <EditarProduto
        titulo={tituloEdit}
        descricao={descricaoEdit}
        valor={valorEdit}
        onChangeDescricao={setDescricaoEdit}
        onChangeTitulo={setTituloEdit}
        onChangeValor={setValorEdit}
      />
    </ModalProduto>
  </>
)
}

export default Produtos