import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Cadastro from '../views/Cadastro.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: Cadastro,
    },
    {
      path: '/tarefa',
      name: 'tarefa',
      component: () => import("@/views/Tarefas.vue")
    },
    {
      path: '/categoria',
      name: 'categoria',
      component: () => import("@/views/Categorias.vue")
    }
  ],
})

// Rotas públicas: qualquer outra exige token
const rotasPublicas = ['login', 'cadastro'];

router.beforeEach((to) => {
  const logado = !!localStorage.getItem('token');
  const publica = rotasPublicas.includes(to.name);

  if (!logado && !publica) {
    return { name: 'login' };
  }
  // Já logado: não mostra login/cadastro, vai direto para o sistema
  if (logado && publica) {
    return { name: 'tarefa' };
  }
});

export default router
