<script setup>
    import { useSnackbar } from '@/composables/useSnackbar';
    import { nextTick, onMounted, ref, watch } from 'vue';
    import { useCategoriaStore } from '@/stores/categoria';
    import { useTarefaStore } from '@/stores/tarefa';
    import { storeToRefs } from 'pinia';

    const snack = useSnackbar();

    //Propriedade
    const props = defineProps(['tarefa']);

    
    const formRef = ref(null);

    // Data de hoje (fuso local) no formato yyyy-mm-dd
    const hoje = () => {
        const d = new Date();
        const mes = String(d.getMonth() + 1).padStart(2, '0');
        const dia = String(d.getDate()).padStart(2, '0');
        return `${d.getFullYear()}-${mes}-${dia}`;
    };

    const item = ref({
        idtarefa : '',
        idusuario : '',
        idcategoria : '',
        descricao : '',
        data : '',
        cumprida : false
    });
    
    //Observador
    watch(() => props.tarefa, (tarefa)=>{
        item.value = { ...tarefa };
        // Nova tarefa: data de hoje por padrão
        if(!item.value.idtarefa && !item.value.data){
            item.value.data = hoje();
        }
    }, {immediate: true});
    
    const storeCategoria = useCategoriaStore();
    const storeTarefa = useTarefaStore();
    const { categorias } = storeToRefs(storeCategoria);

    // Categoria padrão: a primeira da lista
    const categoriaPadrao = () => categorias.value?.[0]?.idcategoria ?? '';

    // Preenche a categoria padrão quando a lista carrega (somente em nova tarefa)
    watch(categorias, () => {
        if(!item.value.idtarefa && !item.value.idcategoria){
            item.value.idcategoria = categoriaPadrao();
        }
    });

    onMounted(() => {
        // Caso as categorias já estejam em cache na store
        if(!item.value.idtarefa && !item.value.idcategoria){
            item.value.idcategoria = categoriaPadrao();
        }
        storeCategoria.listaCategoria();
    });

    const adicionarTarefa = () => {
        if(item.value.descricao && item.value.data && item.value.idcategoria){
            item.value.idusuario = localStorage.getItem("idusuario");
            try{
                if(item.value.idtarefa == ''){
                    storeTarefa.insertTarefa(item.value);
                    snack.sucesso('Tarefa adicionada');
                }else{
                    storeTarefa.updateTarefa(item.value);
                    snack.sucesso('Tarefa alterada');
                }
                limparCampos();
            }catch(error){
                snack.erro('Erro ao adicionar a tarefa');
            }
            
            
        }else{
            snack.erro('Preencha todos os campos da tarefa');
        }
        
    }

    const limparCampos = () => {
        item.value = {
            idtarefa : '',
            idusuario : '',
            idcategoria : categoriaPadrao(),
            descricao : '',
            data : hoje(),
            cumprida : false
        }
        // Limpa o estado de validação depois que os campos esvaziam,
        // senão as regras aparecem em vermelho logo após salvar
        nextTick(() => formRef.value?.resetValidation());
    }

</script>

<template>
    <v-card class="mb-6">
        <template #title>
            <span class="text-h6 font-weight-medium">
                {{ item.idtarefa ? 'Editar tarefa' : 'Nova tarefa' }}
            </span>
        </template>
        <v-card-text>
            <v-form ref="formRef" @submit.prevent="adicionarTarefa">
                <v-text-field v-model="item.descricao" label="Tarefa"
                    placeholder="Digite a tarefa" prepend-inner-icon="mdi-text-box-edit-outline"
                    :rules="[v => !!v || 'Informe a descrição']"></v-text-field>
                <v-row dense>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="item.data" label="Data" type="date"
                            prepend-inner-icon="mdi-calendar-outline"
                            :rules="[v => !!v || 'Informe a data']"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select v-model="item.idcategoria" label="Categoria"
                            :items="categorias" item-title="descricao" item-value="idcategoria"
                            prepend-inner-icon="mdi-label-outline"
                            :rules="[v => !!v || 'Selecione a categoria']"></v-select>
                    </v-col>
                </v-row>
                <v-checkbox v-model="item.cumprida" label="Concluída"
                    hide-details class="mt-n2"></v-checkbox>

                <div class="d-flex ga-3 mt-4">
                    <v-btn type="submit" prepend-icon="mdi-check"
                        color="primary" variant="flat" size="large">
                        {{ item.idtarefa ? 'Alterar' : 'Salvar' }}
                    </v-btn>
                    <v-btn variant="text" color="secondary" size="large" @click="limparCampos">
                        Limpar
                    </v-btn>
                </div>
            </v-form>
        </v-card-text>
    </v-card>
</template>
