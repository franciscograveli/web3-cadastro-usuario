import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/plugin/axios";

export const useUsuarioStore = defineStore("usuario", ()=>{
    const usuarios = ref([]);

    //Inserir
    const insertUsuario = async (usuario) => {
        const response = await api.post('/register', usuario);
        usuarios.value.push(response.data.user);
    }

    return { usuarios, insertUsuario }
});
