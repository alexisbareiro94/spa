import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/http/axios'

export const useAuthStore = defineStore('auth', () => {
  // Estado reactivo
  const user = ref(null)
  const isAuthenticated = ref(false)
  const authError = ref(null)
  const isInitialized = ref(false)

  // Getters (computadas)
  const currentUser = computed(() => user.value)
  const isLoggedIn = computed(() => isAuthenticated.value)
  const hasError = computed(() => authError.value !== null)

  // Acciones
  const fetchCsrfCookie = async () => {
    authError.value = null
    try {
      await api.get('/sanctum/csrf-cookie')
    } catch (err) {
      authError.value = 'Fallo al obtener el token CSRF.'
      console.error('CSRF Error:', err)
    }
  }

  const login = async (credentials) => {
    authError.value = null
    try {
      // Aseguramos tener el CSRF cookie antes de enviar credenciales
      await fetchCsrfCookie()

      // Llama a la ruta /login estándar de Laravel
      await api.post('/login', credentials)

      // Si el login es exitoso, cargamos los datos del usuario
      await fetchUser()
    } catch (err) {
      isAuthenticated.value = false
      user.value = null
      authError.value = 'Credenciales incorrectas o error de conexión.'
      console.error('Login Error:', err)
      throw err
    }
  }

  const fetchUser = async () => {
    authError.value = null
    try {
      const response = await api.get('/api/user')

      user.value = response.data
      isAuthenticated.value = true
      isInitialized.value = true
    } catch (err) {
      // Si falla (ej: 401 Unauthorized), significa que no hay sesión activa
      isAuthenticated.value = false
      user.value = null
      isInitialized.value = true
      console.error('Fetch User Error:', err)
    }
  }

  const logout = async () => {
    authError.value = null
    try {
      await api.post('/logout')

      // Limpia el estado
      user.value = null
      isAuthenticated.value = false
      isInitialized.value = false

      // Redirige al login
      window.location.href = '/login'
    } catch (err) {
      authError.value = 'Fallo al cerrar sesión.'
      console.error('Logout Error:', err)
    }
  }

  const clearError = () => {
    authError.value = null
  }

  // Inicializa la sesión al cargar el store
  const initialize = async () => {
    if (!isInitialized.value) {
      await fetchUser()
    }
  }

  return {
    // Estado
    user,
    isAuthenticated,
    authError,
    isInitialized,

    // Getters
    currentUser,
    isLoggedIn,
    hasError,

    // Acciones
    fetchCsrfCookie,
    login,
    fetchUser,
    logout,
    clearError,
    initialize,
  }
})
