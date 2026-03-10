import { useState } from 'react'
import { cadastroApi } from './services/usuario.js'
import { loginApi } from './services/login.js'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router'


function App() {
  const [abriModal, setAbrirModal] = useState(false)
  const [form, setform] = useState({
    nome: '',
    email: '',
    senha: '',
    tipoUsuario: 1 || 2
  })
  const [confirmarSenha, setConfirmarSenha] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await loginApi(form)
      if (response.success) {
        toast.success("Login realizado.")
      }

      navigate('/produto')
    } catch (error) {
      toast.error("Erro ao entrar.")
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    // if(form.senha ==! confirmarSenha) {
    //   toast.warning("As senhas não considem")
    //   return
    // }
    try {
      const ok = await cadastroApi(form)
      if (ok.success)
        toast.success("Usuário criado com sucesso.")
      setAbrirModal(false)
    } catch (error) {
      toast.error("Erro ao criar usuário.")
      return ok.status(400).json({ message: "Erro ao criar usuário." })
    }
  }

  return (
    <section className='h-screen bg-neutral-400 flex items-center justify-center text-white'>

      <div className='h-200 w-150 bg-black rounded shadow-2xl p-20'>
        <header className='w-full h-40 flex items-center justify-center'>
          <h1 className='text-4xl font-bold'>Log In</h1>
        </header>
        <form onSubmit={handleLogin} className='h-100 flex flex-col items-center justify-center gap-4'>

          <label htmlFor="email">Email</label>
          <input type="email"
            value={form.email}
            onChange={(e) => setform({ ...form, email: e.target.value })}
            className='border w-60 rounded p-2 outline focus:outline-blue-500 focus:border-blue-500 transition duration-300' />

          <label htmlFor="senha">Senha</label>
          <input type="password"
            value={form.senha}
            onChange={(e) => setform({ ...form, senha: e.target.value })}
            className='border w-60 rounded p-2 outline focus:outline-blue-500 focus:border-blue-500 transition duration-300' />

          <button className='border w-full p-2 rounded cursor-pointer hover:bg-white hover:text-black transition duration-300' type='submit'>Entar</button>

        </form>
        <footer className='h-20 w-full items-center justify-center flex '>
          <h1 className='text-2xl'>Não tem uma conta? <span className='text-neutral-300 hover:text-neutral-400 transition duration-300 cursor-pointer' onClick={() => setAbrirModal(true)}>cadastre-se.</span></h1>
        </footer>
      </div>

      {abriModal && (
        <div className='fixed top-0 left-0 flex justify-center items-center w-full h-full bg-white'>
          <div className='bg-black  rounded-2xl w-150 h-200 shadow-2xl p-20'>
            <header className='h-20 items-center justify-center flex'>
              <h1 className='text-3xl'>Registro</h1>
              <h1 className='text-purple-300 hover:text-purple-400 transition duration-300 text-xl cursor-pointer md:fixed top-30 left-290' onClick={() => setAbrirModal(false)}>X</h1>
            </header>
            <form className='h-150 flex flex-col items-center justify-center gap-4' onSubmit={handleRegister}>

              <label htmlFor="nome">nome</label>
              <input type="nome"
                value={form.nome}
                onChange={(e) => setform({ ...form, nome: e.target.value })}
                placeholder='seu nome'
                className='border w-60 rounded p-2 outline focus:outline-blue-500 focus:border-blue-500 transition duration-300' />

              <label htmlFor="email">email</label>
              <input type="email"
                value={form.email}
                onChange={(e) => setform({ ...form, email: e.target.value })}
                placeholder='seuemail@gmail.com'
                className='border w-60 rounded p-2 outline focus:outline-blue-500 focus:border-blue-500 transition duration-300' />

              <label htmlFor="senha">senha</label>
              <input type="password"
                value={form.senha}
                onChange={(e) => setform({ ...form, senha: e.target.value })}
                placeholder='**********'
                className='border w-60 rounded p-2 outline focus:outline-blue-500 focus:border-blue-500 transition duration-300' />

              <label htmlFor="confirmarSenha">confirmarSenha</label>
              <input type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder='**********'
                className='border w-60 rounded p-2 outline focus:outline-blue-500 focus:border-blue-500 transition duration-300' />

              <label htmlFor="tipoUsuario">Tipo de usuario</label>
              <select name="selecione" id="selecionar" className='w-60 p-2 cursor-pointer' value={form.tipoUsuario} onChange={(e) => setform({ ...form, tipoUsuario: Number(e.target.value) })}>
                <option value="selecionar" className='bg-black'>Selecionar</option>
                <option value={1} className='bg-black'>Usuáurio</option>
                <option value={2} className='bg-black'>Administrador</option>
              </select>

              <button className='border w-full p-2 rounded cursor-pointer hover:bg-white hover:text-black transition duration-300' type='submit'>Registrar</button>

            </form>

          </div>
        </div>
      )}
      <ToastContainer />
    </section>
  )
}

export default App
