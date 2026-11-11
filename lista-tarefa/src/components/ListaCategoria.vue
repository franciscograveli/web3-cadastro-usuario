<script setup>
import FormCategoria from './FormCategoria.vue';
import { onMounted, ref } from 'vue';
import { useCategoriaStore } from '@/stores/categoria';
import { storeToRefs } from 'pinia';

const storeCategoria = useCategoriaStore();
const {categorias} = storeToRefs(storeCategoria);

const editar = ref({
    idcategoria: '',
    descricao: ''
});

onMounted(() => {
    //Exibir todos os registros da tabela
    storeCategoria.listaCategoria();
});

const dialogExcluir = ref(false);
const paraApagar = ref(null);

const perguntarExcluir = (categoria) => {
    paraApagar.value = categoria;
    dialogExcluir.value = true;
}

const confirmarExcluir = () => {
    if(paraApagar.value){
        storeCategoria.deleteCategoria(paraApagar.value.idcategoria);
    }
    dialogExcluir.value = false;
    paraApagar.value = null;
}

const alterarCategoria = (categoria) => {
    editar.value = categoria;
}
</script>

<template>
    <FormCategoria :categoria="editar"></FormCategoria>

    <v-card class="py-2">
        <template #title>
            <span class="text-h6 font-weight-medium">Suas categorias</span>
        </template>

        <v-divider v-if="categorias.length" class="mx-4"></v-divider>

        <v-list lines="one" bg-color="transparent">
            <v-list-item v-for="categoria in categorias" :key="categoria.idcategoria"
                rounded="lg" class="my-1">
                <template #prepend>
                    <v-icon icon="mdi-label-variant-outline" color="tertiary"></v-icon>
                </template>
                <template #title>{{ categoria.descricao }}</template>
                <template #append>
                    <div class="d-flex ga-1">
                        <v-btn icon="mdi-pencil-outline" variant="text" color="primary"
                            density="comfortable" @click="alterarCategoria(categoria)"></v-btn>
                        <v-btn icon="mdi-trash-can-outline" variant="text" color="error"
                            density="comfortable" @click="perguntarExcluir(categoria)"></v-btn>
                    </div>
                </template>
            </v-list-item>
        </v-list>

        <v-alert v-if="!categorias.length" type="info" variant="tonal" rounded="lg"
            icon="mdi-lightbulb-on-outline" class="mx-4 mb-4">
            Nenhuma categoria cadastrada ainda. Crie a primeira acima!
        </v-alert>
    </v-card>

    <v-dialog v-model="dialogExcluir" max-width="400">
        <v-card rounded="xl" color="surface-container">
            <v-card-text class="pt-6">
                <div class="d-flex ga-4">
                    <v-avatar color="error-container" size="40">
                        <v-icon color="on-error-container">mdi-alert-circle-outline</v-icon>
                    </v-avatar>
                    <div>
                        <div class="text-h6 mb-1">Excluir categoria</div>
                        <div>Deseja apagar a categoria "{{ paraApagar?.descricao }}"?</div>
                    </div>
                </div>
            </v-card-text>
            <v-card-actions class="px-6 pb-5">
                <v-spacer></v-spacer>
                <v-btn variant="text" color="secondary" @click="dialogExcluir = false">Cancelar</v-btn>
                <v-btn variant="flat" color="error" prepend-icon="mdi-trash-can-outline"
                    @click="confirmarExcluir">Excluir</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
