import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";

const Home = () => {
  const [veiculo, setVeiculo] = useState(0);

  useEffect(() => {
    const fetchVeiculos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/veiculo");
        setVeiculo(response.data.length);
      } catch (error) {
        console.error("Erro ao obter dados dos veiculos:", error);
      }
    };
    
    fetchVeiculos();
  }, []);

  return (
    <section className="h-screen bg-red-500 items-center flex flex-col justify-center">
      <div className="bg-black shadow rounded-lg p-6 flex flex-col items-center w-60">
        <h2 className="text-xl text-white font-bold flex items-center gap-2">
          { veiculo }
        </h2>
        <p className="text-white mt-2">Veiculo</p>
      </div>
      <main className="font-bold">
        <h1>Cadastre mais <Link to="/registroVeiculo" className="hover:text-white transition duration-300">Veiculos</Link></h1>
      </main>
    </section>
  );
};


export default Home;