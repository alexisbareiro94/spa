<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  email: "alexisblugo@gmail.com",
  password: "alexis9421",
});

const handleLogin = async () => {
  // Llama a la función de login que maneja el CSRF y el POST /login
  await authStore.login(form.value);

  // Verifica el estado reactivo
  if (authStore.isAuthenticated) {
    // Redirige al usuario al área protegidasp
    router.push({ name: "home" });
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center ">
    <div class="w-full max-w-sm bg-gray-100 rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>

      <!-- Mensaje de error -->
      <div
        v-if="authStore.authError"
        class="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm text-center"
      >
        {{ authStore.authError }}
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5 ">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            required
            class="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            v-model="form.password"
            required
            class="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <!-- Botón -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Entrar
        </button>
      </form>
      <RouterLink
        to="/register"
        class="text-blue-600 hover:underline block text-center mt-4"
      >
        ¿No tienes una cuenta? Regístrate
      </RouterLink>
    </div>
  </div>
</template>
