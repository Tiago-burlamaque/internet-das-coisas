import axios, { all } from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import { useAuthUser } from '../../context/AuthContextUser.jsx'

function RegisterCar() {
    const [usuario_cadastro, setUsuario_cadastro] = useState("")
    const [datahora_cadastro, setDatahora_cadastro] = useState("")
    const [nome, setNome] = useState("")
    const [marca, setMarca] = useState("")
    const [modelo, setModelo] = useState("")
    const [ano, setAno] = useState("")
    const [status_bateria, setStatus_bateria] = useState("")

    const { user } = useAuthUser()

    const navigate = useNavigate()

    const handleRegisterCar = async (e) => {
        e.preventDefault()

        // nome, marca, modelo, ano, status_bateria, usuario_cadastrado, usuario_atualizacao, usuario_exclusao, datahora_cadastro, datahora_atualizacao, datahora_exclusao
        try {
            if (status_bateria > 100) {
                toast.warning("Valor da bateria ultrapassada.", {
                    autoClose: 2000,
                    hideProgressBar: true,
                })
                console.log("Valor da bateria ultrapassada.")
                return
            } else if (status_bateria < 30) {
                toast.warning("Bateria Insuficiente para Viagens.", {
                    autoClose: 2000,
                    hideProgressBar: true,
                })
                console.log("Bateria Insuficiente para Viagens.")
                return
            }
            await axios.post("http://localhost:3000/veiculo/registro", {
                nome,
                marca,
                modelo,
                ano,
                status_bateria,
                usuario_cadastro: user.idusuario
            });
            toast.success("Veiculo Cadastrado!", {
                autoClose: 2000,
                hideProgressBar: true,
            })
            navigate("/consultarVeiculo")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section>
            <main className="h-screen bg-red-500">
                <header className='text-center items-center
                justify-center flex flex-col h-50'>
                    <h1 className='text-5xl text-white'>Registrar Veiculo</h1>
                </header>
                <nav className='flex flex-col justify-center items-center '>
                    <form onSubmit={handleRegisterCar} className='flex flex-col border border-black p-5 bg-black text-white rounded shadow-2xl justify-center items-center gap-4'>
                        <main className='grid grid-cols-4 gap-4'>

                            <label htmlFor="nome">Nome</label>
                            <input type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className='border-2 focus:outline-2 p-1 rounded focus:outline-red-500 focus:border-red-500' required />

                            <label htmlFor="marca">marca</label>
                            <input type="text"
                                value={marca}
                                onChange={(e) => setMarca(e.target.value)}
                                className='border-2 focus:outline-2 p-1 rounded focus:outline-red-500 focus:border-red-500' required />

                            <label htmlFor="modelo">modelo</label>
                            <input type="text"
                                value={modelo}
                                onChange={(e) => setModelo(e.target.value)}
                                className='border-2 focus:outline-2 p-1 rounded focus:outline-red-500 focus:border-red-500' required />

                            <label htmlFor="ano">ano</label>
                            <input type="number"
                                value={ano}
                                onChange={(e) => setAno(e.target.value)}
                                className='border-2 focus:outline-2 p-1 rounded focus:outline-red-500 focus:border-red-500' required />

                            <label htmlFor="status_bateria">status da bateria</label>
                            <input type="number"
                                value={status_bateria}
                                onChange={(e) => setStatus_bateria(e.target.value)}
                                className='border-2 focus:outline-2 p-1 rounded focus:outline-red-500 focus:border-red-500' required />

                            <label htmlFor="usuario_cadastrado">Usuário que irá cadastrar</label>
                            <input type="number"
                                value={usuario_cadastro}
                                onChange={(e) => setUsuario_cadastro(e.target.value)}
                                className='border-2 focus:outline-2 p-1 rounded focus:outline-red-500 focus:border-red-500' required />

                            <label htmlFor="datahora_cadastro">Dia e horário de cadastro</label>
                            <input type="datetime-local"
                                value={datahora_cadastro}
                                onChange={(e) => setDatahora_cadastro(e.target.value)}
                                className='border-2 focus:outline-2 p-1 rounded focus:outline-red-500 focus:border-red-500' />

                        </main>
                        <button onSubmit={handleRegisterCar} className='text-black border bg-white p-3 w-full rounded font-bold cursor-pointer hover:border-red-500 hover:bg-red-500 hover:text-white transition duration-300'>Registrar Veiculo</button>
                    </form>
                </nav>
            </main>
            <ToastContainer />
        </section>
    )
}


export default RegisterCar
