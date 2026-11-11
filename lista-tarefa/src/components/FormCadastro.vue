<script setup>
import { ref } from 'vue';
import { useUsuarioStore } from '@/stores/usuario';
import { useRouter } from 'vue-router';
import { useSnackbar } from '@/composables/useSnackbar';

const router = useRouter();
const snack = useSnackbar();
const loading = ref(false);
const mostrar = ref(false);

const storeUsuario = useUsuarioStore();

const item = ref({
    name: '',
    email: '',
    password: ''
});

async function cadastrar() {
    if (!item.value.name || !item.value.email || !item.value.password) {
        snack.erro('Por favor, preencha todos os campos.');
        return;
    }

    if (item.value.password.length < 6) {
        snack.erro('A senha deve conter no mínimo 6 caracteres.');
        return;
    }

    loading.value = true;
    try {
        await storeUsuario.insertUsuario(item.value);
        snack.sucesso('Conta criada! Faça login para continuar.');
        router.push('/');
    } catch (error) {
        const erros = error.response?.data?.errors;
        snack.erro(erros ? Object.values(erros)[0][0] : 'Erro ao realizar o cadastro de usuário.');
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <v-card max-width="560" class="mx-auto" rounded="xl" elevation="4">
        <div class="d-flex flex-column align-center ga-2 pa-8 pb-2 text-center">
            <v-avatar color="primary-container" size="64">
                <v-icon icon="mdi-account-plus" size="32" color="on-primary-container"></v-icon>
            </v-avatar>
            <h1 class="text-h5 font-weight-medium ma-0">Crie sua conta</h1>
            <p class="text-body-2 text-medium-emphasis ma-0">
                Cadastre-se para começar a organizar suas tarefas
            </p>
        </div>
        <v-card-text class="pa-8 pt-4">
            <v-form @submit.prevent="cadastrar">
                <v-text-field v-model="item.name" label="Nome completo"
                    prepend-inner-icon="mdi-account-outline"
                    :rules="[v => !!v || 'Informe o nome']"></v-text-field>
                <v-text-field v-model="item.email" label="Email"
                    type="email" prepend-inner-icon="mdi-email-outline"
                    :rules="[v => !!v || 'Informe o e-mail']"></v-text-field>
                <v-text-field v-model="item.password" label="Senha"
                    prepend-inner-icon="mdi-lock-outline"
                    :type="mostrar ? 'text' : 'password'"
                    :append-inner-icon="mostrar ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="mostrar = !mostrar"
                    hint="Mínimo de 6 caracteres" persistent-hint
                    :rules="[v => !v || v.length >= 6 || 'Mínimo de 6 caracteres']"></v-text-field>
                <div class="d-flex ga-3 mt-6">
                    <v-btn type="submit" size="large" :loading="loading"
                        color="primary" variant="flat" class="flex-grow-1">
                        Cadastrar
                    </v-btn>
                    <v-btn size="large" color="secondary"
                        variant="tonal" :to="{ name: 'login' }">
                        Cancelar
                    </v-btn>
                </div>
            </v-form>
            <v-divider class="my-6"></v-divider>
            <div class="d-flex flex-column align-center ga-1">
                <span class="text-body-2 text-medium-emphasis">Já possui uma conta?</span>
                <v-btn variant="text" color="primary" :to="{ name: 'login' }">
                    Faça login
                </v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>
