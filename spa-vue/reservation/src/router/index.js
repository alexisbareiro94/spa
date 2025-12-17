import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/proyecciones',
      name: 'proyecciones',
      component: () => import('../views/ProyeccionesView.vue'),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Solo intenta cargar el usuario si no se ha inicializado aún
  // Esto evita llamadas redundantes en cada cambio de ruta
  if (!authStore.isInitialized) {
    await authStore.fetchUser();
  }

  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Evita bucles de redirección si ya estamos yendo al login
    if (to.name !== 'login') {
      next({ name: 'login' });
      return;
    }
  }

  // Si el usuario está autenticado e intenta ir al login, redirige al home
  if (authStore.isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    next({ name: 'home' });
    return;
  }

  // Permite la navegación
  next();
});

export default router;
