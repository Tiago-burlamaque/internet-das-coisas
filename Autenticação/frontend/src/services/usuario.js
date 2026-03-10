import { api } from "./api.js";
// import toast from "react-toastify"

export const cadastroApi = async(form) => {
    try {
        const res = await api.post('/registro', form);
        return res.data;
    } catch (error) {
      console.log("Ocorreu um erro ao cadastrar o usuário. ", error)
    }
}

