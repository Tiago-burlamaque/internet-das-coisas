import React, { useState } from 'react'

function App() {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  return (
    <section className='h-screen bg-neutral-400 flex items-center justify-center text-white'>
      <div className='h-200 w-150 bg-black rounded shadow-2xl'>
        <header className='w-full h-20 flex items-center justify-center'>
          <h1 className='text-2xl'>Registro</h1>
        </header>
        <main className='h-100 flex flex-col'>
          <label htmlFor="nome">Nome</label>
          <input type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className='border rounded w-60' />
          <label htmlFor="email">Email</label>
          <input type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border rounded w-60' />
          <label htmlFor="senha">Senha</label>
          <input type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className='border rounded w-60' />
        </main>
      </div>
    </section>
  )
}

export default App
