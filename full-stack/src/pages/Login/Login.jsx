import { Link } from 'react-router-dom'
import '../../App.css'

function Login() {
    return (
        <section className='h-screen bg-black flex flex-col'>
            <header className='w-full h-50 flex items-center justify-center'>
                <h1 className="poppins-extralight text-5xl text-white">Gerenciador de armas para o Exército Militar</h1>
            </header>
            <main className='w-full h-130 flex justify-center items-center '>
                <nav className='w-100 h-150 bg-neutral-500 rounded shadow-2xl shadow-white px-15'>
                    <header className='w-full h-30 flex flex-col justify-center items-center'>
                        <h1 className='poppins-extralight text-4xl text-white'>Login</h1>
                    </header>
                    <form className='w-full h-80 flex flex-col justify-center items-center gap-4 text-white'>
                        <label htmlFor="email" className='text-2xl'>Email</label>
                        <input type="email"
                        className='poppins-thin border rounded w-full p-1  focus:border-blue-500 focus:outline focus:outline-blue-500 transition duration-300 shadow focus:shadow-black focus:shadow-2xl'
                        />

                        <label htmlFor="senha" className='text-2xl'>Senha</label>
                        <input type="email"
                        className='poppins-thin border rounded w-full p-1  focus:border-blue-500 focus:outline focus:outline-blue-500 transition duration-300 shadow focus:shadow-black focus:shadow-2xl'
                        />

                        <button className='border border-white p-1 w-full bg-white text-black rounded cursor-pointer hover:border-green-500 hover:bg-green-500 hover:text-white shadow hover:shadow-green-500 hover:shadow-2xl transition duration-300 '>Entrar</button>
                    </form>
                    <hr className='text-white mb-5' />
                    <footer className='w-full h-30'>
                        <h2 className='text-white'>Não tem conta? <Link className='text-neutral-100 hover:text-neutral-900 transition duration-300'>Cadastre-se aqui</Link></h2>
                    </footer>
                </nav>
            </main>
        </section>
    )
}

export default Login
