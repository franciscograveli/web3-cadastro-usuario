<script setup>
    import { useSnackbar } from '@/composables/useSnackbar';
    import { ref, watch } from 'vue';
    import { useCategoriaStore } from '@/stores/categoria';

    const snack = useSnackbar();

    //Propriedade
    const props = defineProps(['categoria']);

    const item = ref({
        idcategoria: '',
        descricao: ''
    });

    const storeCategoria = useCategoriaStore();

    const cancelar = () => {
        item.value.idcategoria = '';
        item.value.descricao = '';
    }

    const salvar = () => {
        try{
            if(item.value.idcategoria==''){
                storeCategoria.insertCategoria(item.value);
            }else{
                storeCategoria.updateCategoria(item.value);
            }
            cancelar();
            snack.sucesso('Categoria salva com sucesso!');
        }catch(error) {
            console.log('Erro ao cadastrar a categoria', error);
            snack.erro('Erro ao salvar a categoria');
        }
    }

    watch(() => props.categoria, (categoria)=>{
        item.value = { ...categoria };
    }, {immediate: true});
</script>

<template>
    <v-card class="mb-6">
        <template #title>
            <span class="text-h6 font-weight-medium">
                {{ item.idcategoria ? 'Editar categoria' : 'Nova categoria' }}
            </span>
        </template>
        <v-card-text>
            <v-form @submit.prevent="salvar">
                <v-text-field v-model="item.descricao" label="Categoria"
                    prepend-inner-icon="mdi-label-outline"
                    :rules="[v => !!v || 'Informe a descrição']"></v-text-field>

                <div class="d-flex ga-3">
                    <v-btn type="submit" prepend-icon="mdi-check" color="primary"
                        variant="flat" size="large">Salvar</v-btn>
                    <v-btn variant="text" color="secondary" size="large" @click="cancelar">
                        Cancelar
                    </v-btn>
                </div>
            </v-form>
        </v-card-text>
    </v-card>
</template>
