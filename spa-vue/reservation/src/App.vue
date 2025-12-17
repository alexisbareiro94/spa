<script setup>
import { RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>
<template>
  <div class="max-w-6xl mx-auto">
    <div v-if="authStore.isAuthenticated" class="bg-white">
      <div class="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-800">Gestión de Cine</h1>
        <button
          @click="authStore.logout()"
          class="flex items-center gap-1 text-gray-600 hover:text-red-600 transition"
          title="Cerrar sesión"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Navegación del dashboard -->
    <div v-if="authStore.isAuthenticated" class="border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-4">
        <nav class="flex space-x-6">
          <RouterLink
            to="/"
            class="py-3 px-1 font-medium text-sm hover:border-gray-400 transition"
            active-class="text-indigo-600 border-b-2  border-indigo-600"
          >
            Películas
          </RouterLink>
          <RouterLink
            to="/proyecciones"
            class="py-3 px-1 font-medium text-sm hover:border-gray-400 transition"
            active-class="text-indigo-600 border-b-2  border-indigo-600"
          >
            Proyecciones
          </RouterLink>
        </nav>
      </div>
    </div>

    <!-- Contenido dinámico -->
    <main class="mx-auto px-4 py-6">
      <RouterView />
    </main>
  </div>
</template>
