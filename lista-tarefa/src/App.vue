<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useSnackbar } from '@/composables/useSnackbar';

const { state: snack } = useSnackbar();

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const drawer = ref(false);
const menu = computed(() => {
  return route.path !== '/' && route.path !== '/cadastro'
})

const logout = () => {
  authStore.logout();
  router.push('/');
}
</script>

<template>
  <v-app>
    <v-app-bar v-if="menu" color="surface-container" flat elevation="0" density="comfortable" class="m3-top-bar">
      <template #prepend>
        <v-app-bar-nav-icon variant="tonal" @click="drawer = !drawer" />
      </template>
      <v-app-bar-title class="text-h6 font-weight-medium mr-8">
        <v-icon icon="mdi-check-all" color="primary" class="mr-2"></v-icon>Gerenciador de tarefas
      </v-app-bar-title>
      <template #append>
        <v-btn icon="mdi-logout" variant="tonal" rounded="pill" color="secondary" @click="logout" />
      </template>
    </v-app-bar>

    <v-navigation-drawer v-if="menu" v-model="drawer" color="surface-container-low" class="m3-drawer" border="0">
      <v-list nav class="m3-nav pa-3">
        <v-list-item prepend-icon="mdi-checkbox-marked-circle-plus-outline" title="Tarefas"
          :to="{ name: 'tarefa' }" rounded="pill" active-class="m3-nav-active" class="mb-2" />
        <v-list-item prepend-icon="mdi-label-multiple-outline" title="Categorias"
          :to="{ name: 'categoria' }" rounded="pill" active-class="m3-nav-active" />
      </v-list>
      <template #append>
        <div class="pa-3">
          <v-btn block variant="tonal" prepend-icon="mdi-logout" color="error" rounded="pill" @click="logout">
            Sair
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main :class="{ 'auth-main': !menu }">
      <v-container :class="{ 'auth-container': !menu }" class="py-8 mx-auto" style="max-width: 880px">
        <RouterView />
      </v-container>
    </v-main>

    <v-snackbar v-model="snack.show" :color="snack.color" rounded="lg" timeout="3500" location="bottom">
      <v-icon v-if="snack.icon" :icon="snack.icon" start></v-icon>
      {{ snack.text }}
      <template #actions>
        <v-btn variant="text" color="inherit" @click="snack.show = false">OK</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<style>
.v-card--variant-outlined {
  border-color: rgb(var(--v-theme-outline-variant)) !important;
  background: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
}

.v-card-title {
  padding: 20px 24px 4px;
}

.v-card-text {
  padding: 16px 24px;
}

.v-list {
  padding: 8px 12px;
}

.v-list-item {
  border-radius: 12px;
}

.m3-nav .m3-nav-active {
  background: rgb(var(--v-theme-secondary-container)) !important;
  color: rgb(var(--v-theme-on-secondary-container)) !important;
}

.m3-nav .m3-nav-active .v-list-item__overlay {
  opacity: 0;
}

.auth-main {
  min-height: 100vh;
  background-color: rgb(var(--v-theme-background));
  background:
    radial-gradient(circle at 15% 15%, rgba(103, 80, 164, 0.16) 0%, transparent 45%),
    radial-gradient(circle at 85% 85%, rgba(125, 82, 96, 0.12) 0%, transparent 45%);
}

.auth-container > * {
  width: 100%;
}

.auth-container {
  min-height: calc(100vh - 48px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
