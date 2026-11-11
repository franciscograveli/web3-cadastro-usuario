<script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '@/stores/auth';
    import { useRouter } from 'vue-router';
    import { useSnackbar } from '@/composables/useSnackbar';

    const router = useRouter();
    const snack = useSnackbar();

    const authStore = useAuthStore();

    const item = ref({
        email:"",
        password:""
    });

    const loading = ref(false);
    const mostrar = ref(false);

    async function login(){
        loading.value = true;
        try{
            await authStore.login(item.value.email, item.value.password);
            router.push('/tarefa');
        }catch(error){
            console.log(error);
            snack.erro("E-mail ou senha inválidos");
        }finally{
            loading.value = false;
        }
    }
</script>

<template>
    <v-card max-width="560" class="mx-auto" rounded="xl" elevation="4">
        <div class="d-flex flex-column align-center ga-2 pa-8 pb-2 text-center">
            <v-avatar color="primary" size="64">
                <v-icon icon="mdi-account-circle" size="36" color="on-primary"></v-icon>
            </v-avatar>
            <h1 class="text-h5 font-weight-medium ma-0">Bem-vindo de volta</h1>
            <p class="text-body-2 text-medium-emphasis ma-0">
                Entre para gerenciar suas tarefas
            </p>
        </div>
        <v-card-text class="pa-8 pt-4">
            <v-form @submit.prevent="login">
                <v-text-field v-model="item.email" label="Email"
                    type="email" prepend-inner-icon="mdi-email-outline"
                    :rules="[v => !!v || 'Informe o e-mail']"></v-text-field>
                <v-text-field v-model="item.password" label="Senha"
                    prepend-inner-icon="mdi-lock-outline"
                    :type="mostrar ? 'text' : 'password'"
                    :append-inner-icon="mostrar ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="mostrar = !mostrar"
                    :rules="[v => !!v || 'Informe a senha']"></v-text-field>
                <v-btn type="submit" block size="large" :loading="loading"
                    color="primary" variant="flat" class="mt-4">
                    Entrar
                </v-btn>
            </v-form>
            <v-divider class="my-6"></v-divider>
            <div class="d-flex flex-column align-center ga-1">
                <span class="text-body-2 text-medium-emphasis">Não tem uma conta?</span>
                <v-btn variant="text" color="primary" :to="{ name: 'cadastro' }">
                    Cadastre-se
                </v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>
