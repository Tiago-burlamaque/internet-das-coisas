import { api } from "./api.js";

export const loginApi = async(form) => {
    try {
        const response = await api.post('/login',form)
        return response.data;
    } catch (error) {
        console.log(`Ocorreu um erro ao relalizar o login. Mensagem: ${error.response.data || error.message}`);
        
    }
}