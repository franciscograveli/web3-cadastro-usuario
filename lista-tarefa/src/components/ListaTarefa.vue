<script setup>
    import { ref } from 'vue';
    import { useTarefaStore } from '@/stores/tarefa';
    import { storeToRefs } from 'pinia';
    import { onMounted } from 'vue';
    import FormTarefa from './FormTarefa.vue';

    const storeTarefa = useTarefaStore();
    const {tarefas} = storeToRefs(storeTarefa);

    onMounted(() => {
        storeTarefa.listaTarefa();
    });

    const excluir = ref(null);
    const dialogExcluir = ref(false);

    const perguntarExcluir = (tarefa) => {
        excluir.value = tarefa;
        dialogExcluir.value = true;
    }

    const confirmarExcluir = () => {
        if(excluir.value){
            storeTarefa.deleteTarefa(excluir.value.idtarefa);
        }
        dialogExcluir.value = false;
        excluir.value = null;
    }

    const editar = ref({
        idtarefa : '',
        idcategoria : '',
        idusuario : '',
        descricao : '',
        data : '',
        cumprida : false
    });

    const alterar = (item) => {
        editar.value = item;
    }
</script>

<template>
    <FormTarefa :tarefa="editar"></FormTarefa>

    <v-card class="py-2">
        <template #title>
            <span class="text-h6 font-weight-medium">Suas tarefas</span>
        </template>

        <v-divider v-if="tarefas.length" class="mx-4"></v-divider>

        <v-list lines="two" bg-color="transparent">
            <v-list-item v-for="tarefa in tarefas" :key="tarefa.idtarefa"
                rounded="lg" class="m3-tarefa-item my-1">
                <template #title>
                    <span :class="{ 'text-decoration-line-through': tarefa.cumprida }">
                        {{ tarefa.descricao }}
                    </span>
                </template>
                <template #subtitle>
                    <span class="d-flex align-center ga-2 mt-1 flex-wrap">
                        <v-chip v-if="tarefa.categoria" size="small" color="primary"
                            variant="flat" label class="m3-categoria-chip font-weight-medium">
                            <v-icon start icon="mdi-label-outline"></v-icon>
                            {{ tarefa.categoria.descricao }}
                        </v-chip>
                        <span class="m3-tarefa-data d-inline-flex align-center ga-1">
                            <v-icon size="16" icon="mdi-calendar-outline"></v-icon>
                            {{ tarefa.data?.slice(0, 10) }}
                        </span>
                    </span>
                </template>
                <template #prepend>
                    <v-icon :color="tarefa.cumprida ? 'success' : 'outline'"
                        :icon="tarefa.cumprida ? 'mdi-check-circle' : 'mdi-checkbox-blank-circle-outline'"></v-icon>
                </template>
                <template #append>
                    <div class="d-flex ga-1">
                        <v-btn icon="mdi-pencil-outline" variant="text" color="primary"
                            density="comfortable" @click="alterar(tarefa)"></v-btn>
                        <v-btn icon="mdi-trash-can-outline" variant="text" color="error"
                            density="comfortable" @click="perguntarExcluir(tarefa)"></v-btn>
                    </div>
                </template>
            </v-list-item>
        </v-list>

        <v-alert v-if="!tarefas.length" type="info" variant="tonal" rounded="lg"
            icon="mdi-lightbulb-on-outline" class="ma-4">
            Nenhuma tarefa cadastrada ainda. Crie a primeira acima!
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
                        <div class="text-h6 mb-1">Excluir tarefa</div>
                        <div>Deseja apagar a tarefa "{{ excluir?.descricao }}"?</div>
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

<style>
.m3-categoria-chip {
    color: rgb(var(--v-theme-on-primary)) !important;
}

.m3-tarefa-item .v-list-item-subtitle {
    opacity: 1;
    color: rgb(var(--v-theme-on-surface-variant));
}

.m3-tarefa-data {
    font-size: 0.8125rem;
    color: rgb(var(--v-theme-on-surface-variant));
}
</style>
