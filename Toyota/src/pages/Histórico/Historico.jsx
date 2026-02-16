import { useEffect, useState } from "react";
import axios from "axios";

export default function Log() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        buscarLogs();
    }, []);

    async function buscarLogs() {
        try {
            const response = await axios.get("http://localhost:3000/log");
            setLogs(response.data);
        } catch (error) {
            console.error("Erro ao buscar logs:", error);
        }
    }

    return (
            <div className="min-h-screen bg-red-500 p-8">
                <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">

                    <h1 className="text-2xl font-bold mb-6 text-gray-700">
                        Histórico do Sistema
                    </h1>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">

                            <thead>
                                <tr className="bg-gray-200 text-gray-700 text-left">
                                    <th className="p-3">ID</th>
                                    <th className="p-3">Ação</th>
                                    <th className="p-3">Descrição</th>
                                    <th className="p-3">Data</th>
                                </tr>
                            </thead>

                            <tbody>
                                {logs.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center p-6 text-gray-500">
                                            Nenhum log encontrado
                                        </td>
                                    </tr>
                                ) : (
                                    logs.map((log) => (
                                        <tr
                                            key={log.idlog}
                                            className="border-b hover:bg-gray-50 transition"
                                        >
                                            <td className="p-3">{log.idlog}</td>
                                            <td className="p-3 font-semibold">{log.acao}</td>
                                            <td className="p-3">{log.descricao}</td>
                                            <td className="p-3">
                                                {new Date(log.datahora).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
    );
}