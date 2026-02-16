import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthUser } from "../../context/AuthContextUser";

const UpdateCar = ({ veiculo }) => {

    const { id } = useParams()
    const navigate = useNavigate();

    const {user} = useAuthUser()

    const [usuario_atualizacao, setUsuario_atualizado] = useState("")
    const [datahora_atualizacao, setDatahora_atualizacao] = useState("")
    const [nome, setNome] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [ano, setAno] = useState("");
    const [status_bateria, setStatus_bateria] = useState("");

    const handleUpdateCar = async (e) => {
        e.preventDefault();

        try {
            if(status_bateria > 100) {
                toast.warning("Valor ultrapassado.")
                console.log("Valor ultrapassado.");
                return
            } else if(status_bateria <30) {
                toast.warning("Bateria insuficiente para Viagens")
                console.log("bateria insuficiente para Viagens")
                return
            }
            console.log("ID da rota:", id);
            await axios.put(
                `http://localhost:3000/veiculo/atualizar/${id}`,
                {
                    nome,
                    marca,
                    modelo,
                    ano,
                    status_bateria,
                    usuario_atualizacao: user.idusuario
                }
            );

            toast.success("Veículo atualizado com sucesso!");
            navigate("/consultarVeiculo");

        } catch (error) {
            console.error(error);
            toast.error("Erro ao atualizar veículo");
        }
    };

    return (
        <section className="bg-white rounded-3xl p-6">
            <form className="grid gap-4">

                <label>Nome</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <label>Marca</label>
                <input
                    type="text"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <label>Modelo</label>
                <input
                    type="text"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <label>Ano</label>
                <input
                    type="number"
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <label>Status da bateria</label>
                <input
                    type="number"
                    minLength={100}
                    value={status_bateria}
                    onChange={(e) => setStatus_bateria(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <label>Usuário Atualização</label>
                <input
                    type="number"
                    value={usuario_atualizacao}
                    onChange={(e) => setUsuario_atualizado(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <label>Data atualização</label>
                <input
                    type="datetime-local"
                    value={datahora_atualizacao}
                    onChange={(e) => setDatahora_atualizacao(e.target.value)}
                    className="border p-2 rounded"
                    required />

                <button
                    onClick={handleUpdateCar}
                    className="bg-black text-white p-3 rounded mt-4 hover:bg-blue-500 transition cursor-pointer"
                >
                    Atualizar Veículo
                </button>
            </form>

            <ToastContainer />
        </section>
    );
};

export default UpdateCar;