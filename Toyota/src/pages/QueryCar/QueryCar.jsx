import axios from "axios";
import { useEffect, useState } from "react";
import UpdateCar from "./UpdateCar";
import { useNavigate } from "react-router";


function QueryCar() {
  const [veiculos, setVeiculos] = useState([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);

  const navigate = useNavigate()

  const navegar = (item) => {
    navigate(`/atualizarVeiculo/${item.idveiculo}`)
  }
  useEffect(() => {
    axios.get("http://localhost:3000/veiculo")
      .then((response) => {
        setVeiculos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      axios.delete(`http://localhost:3000/veiculo/deletar/${id}`)

      // Atualiza a lista sem precisar recarregar a página
      setVeiculos(veiculos.filter((v) => v.idveiculo !== id));
    } catch (error) {
      console.log(error);

    }
  }


  return (
    <>
      <section className="h-screen bg-red-500">
        <header className="h-20 flex items-center justify-center font-bold text-5xl">
          <h1>Lista de Veículos</h1>
        </header>

        <main className="flex">
          {veiculos.map((v) => (
            <div key={v.idveiculo} className="border w-100 gap-4 grid mx-5 rounded p-3 bg-black text-white border-black shadow-2xl ">
              <h1>{v.idveiculo}</h1>
              <h3>{v.nome}</h3>

              <p><strong>Marca:</strong> {v.marca}</p>
              <p><strong>Modelo:</strong> {v.modelo}</p>
              <p><strong>Ano:</strong> {v.ano}</p>
              <p><strong>Status da bateria:</strong> {v.status_bateria}%</p>
              <p><strong>Usuário que cadastrado:</strong> {v.usuario_cadastro}</p>
              <p><strong>Usuário que atualizou:</strong> {v.usuario_atualizacao}</p>
              <p><strong>Data e horário cadastrado:</strong> {v.datahora_cadastro}</p>
              <p><strong>Data e horário atualizado:</strong> {v.datahora_atualizacao}</p>


              <button onClick={() => handleDelete(v.idveiculo)} className="text-black border bg-white p-3 w-full rounded font-bold cursor-pointer hover:border-red-500 hover:bg-red-500 hover:text-white transition duration-300">Excluir</button>

              <button
                onClick={() => navegar(v)}
                className="text-black border bg-white p-3 w-full rounded font-bold cursor-pointer hover:border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
              >
                Atualizar
              </button>

            </div>
          ))}
        </main>
      </section>


    </>
  )
}

export default QueryCar

// 