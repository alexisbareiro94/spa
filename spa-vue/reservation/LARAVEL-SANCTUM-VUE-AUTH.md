# 🔐 Configuración de Autenticación Laravel Sanctum + Vue 3

Guía completa para configurar autenticación SPA con Laravel Sanctum en proyectos Vue 3.

---

## 📋 Requisitos Previos

- Laravel con Sanctum configurado
- Vue 3 con Vue Router
- Axios instalado: `npm install axios`

---

## 🚀 Configuración Paso a Paso

### 1️⃣ Configurar Axios (`src/http/axios.js`)

Crea el archivo de configuración de Axios con soporte para cookies y CSRF:

```javascript
import axios from 'axios'

const api = axios.create({
  // ⚠️ CAMBIAR según tu backend Laravel
  baseURL: 'http://127.0.0.1:8000',

  // Habilita el envío de cookies a través de dominios (CORS)
  withCredentials: true,

  // Indica a Axios que maneje el token XSRF automáticamente
  withXSRFToken: true,
})

export default api
```

**📝 Nota:** Ajusta `baseURL` según tu entorno:

- Desarrollo local: `http://127.0.0.1:8000`
- Producción: `https://api.tudominio.com`

---

### 2️⃣ Crear Composable de Autenticación (`src/composables/useAuth.js`)

Este composable maneja todo el flujo de autenticación:

```javascript
// src/composables/useAuth.js
import { ref } from 'vue'
import api from '@/http/axios'

// Estado reactivo global (compartido entre todas las instancias)
const user = ref(null)
const isAuthenticated = ref(false)
const authError = ref(null)
const isInitialized = ref(false) // Flag para evitar llamadas redundantes

export function useAuth() {
  /**
   * 1. Obtiene el CSRF cookie antes de cualquier acción de estado.
   * Este es el primer paso para la autenticación SPA con Sanctum.
   */
  const fetchCsrfCookie = async () => {
    authError.value = null
    try {
      // Llama al endpoint de Sanctum. Laravel envía la cookie XSRF-TOKEN.
      await api.get('/sanctum/csrf-cookie')
    } catch (err) {
      authError.value = 'Fallo al obtener el token CSRF.'
      console.error(err)
    }
  }

  /**
   * 2. Intenta autenticar al usuario usando las credenciales.
   */
  const login = async (credentials) => {
    authError.value = null
    try {
      // Aseguramos tener el CSRF cookie antes de enviar credenciales
      await fetchCsrfCookie()

      // Llama a la ruta /login estándar de Laravel (generalmente con Laravel Fortify)
      await api.post('/login', credentials)

      // Si el login es exitoso, cargamos los datos del usuario para confirmar la sesión
      await fetchUser()
    } catch (err) {
      isAuthenticated.value = false
      user.value = null
      authError.value = 'Credenciales incorrectas o error de conexión.'
      console.error(err)
    }
  }

  /**
   * 3. Obtiene el usuario actualmente autenticado desde el backend.
   */
  const fetchUser = async () => {
    authError.value = null
    try {
      // Llama a un endpoint protegido por 'auth:sanctum'
      const response = await api.get('/api/user')

      user.value = response.data
      isAuthenticated.value = true
      isInitialized.value = true
    } catch {
      // Si falla (ej: 401 Unauthorized), significa que no hay sesión activa.
      isAuthenticated.value = false
      user.value = null
      isInitialized.value = true
    }
  }

  /**
   * 4. Cierra la sesión.
   */
  const logout = async () => {
    authError.value = null
    try {
      // Llama a la ruta /logout de Laravel
      await api.post('/logout')
      user.value = null
      isAuthenticated.value = false
    } catch (err) {
      authError.value = 'Fallo al cerrar sesión.'
      console.error(err)
    }
  }

  // Exporta el estado y los métodos
  return {
    user,
    isAuthenticated,
    isInitialized,
    authError,
    fetchUser,
    login,
    logout,
  }
}
```

---

### 3️⃣ Configurar Vue Router con Guards (`src/router/index.js`)

Protege tus rutas y maneja redirecciones automáticas:

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true }, // ← Marca rutas protegidas
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
    // ... más rutas
  ],
})

// Guard global de autenticación
router.beforeEach(async (to, from, next) => {
  const { fetchUser, isAuthenticated, isInitialized } = useAuth()

  // Solo intenta cargar el usuario si no se ha inicializado aún
  // Esto evita llamadas redundantes en cada cambio de ruta
  if (!isInitialized.value) {
    await fetchUser()
  }

  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    // Evita bucles de redirección si ya estamos yendo al login
    if (to.name !== 'login') {
      next({ name: 'login' })
      return
    }
  }

  // Si el usuario está autenticado e intenta ir al login, redirige al home
  if (isAuthenticated.value && (to.name === 'login' || to.name === 'register')) {
    next({ name: 'home' })
    return
  }

  // Permite la navegación
  next()
})

export default router
```

---

## 🎯 Uso en Componentes Vue

### Ejemplo: Componente de Login

```vue
<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <input v-model="credentials.email" type="email" placeholder="Email" required />
      <input v-model="credentials.password" type="password" placeholder="Contraseña" required />
      <button type="submit">Iniciar Sesión</button>

      <p v-if="authError" class="error">{{ authError }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login, authError } = useAuth()

const credentials = ref({
  email: '',
  password: '',
})

const handleLogin = async () => {
  await login(credentials.value)

  // Si no hay error, el router guard redirigirá automáticamente
  if (!authError.value) {
    router.push({ name: 'home' })
  }
}
</script>
```

### Ejemplo: Mostrar Usuario Autenticado

```vue
<template>
  <div v-if="isAuthenticated">
    <p>Bienvenido, {{ user?.name }}</p>
    <button @click="handleLogout">Cerrar Sesión</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { user, isAuthenticated, logout } = useAuth()

const handleLogout = async () => {
  await logout()
  router.push({ name: 'login' })
}
</script>
```

### Ejemplo: Proteger Componentes

```vue
<template>
  <div v-if="isAuthenticated">
    <!-- Contenido solo para usuarios autenticados -->
    <h1>Dashboard</h1>
    <p>Hola {{ user?.name }}</p>
  </div>
  <div v-else>
    <p>Cargando...</p>
  </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth'

const { user, isAuthenticated } = useAuth()
</script>
```

---

## 🔧 Configuración Adicional

### Variables de Entorno (`.env`)

```env
VITE_API_URL=http://127.0.0.1:8000
```

Luego en `axios.js`:

```javascript
baseURL: import.meta.env.VITE_API_URL,
```

---

## ✅ Checklist de Implementación

- [ ] Instalar Axios: `npm install axios`
- [ ] Crear `src/http/axios.js` con configuración
- [ ] Crear `src/composables/useAuth.js`
- [ ] Configurar guards en `src/router/index.js`
- [ ] Agregar `meta: { requiresAuth: true }` a rutas protegidas
- [ ] Crear componentes de Login/Register
- [ ] Verificar que Laravel tenga Sanctum configurado
- [ ] Verificar CORS en Laravel (`config/cors.php`)
- [ ] Probar flujo completo: login → home → logout

---

## 🐛 Troubleshooting

### ❌ Error: "CSRF token mismatch"

**Solución:** Verifica que `withCredentials: true` y `withXSRFToken: true` estén en `axios.js`

### ❌ Error: "CORS policy"

**Solución:** En Laravel, verifica `config/cors.php`:

```php
'supports_credentials' => true,
'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout'],
```

### ❌ No redirige a login

**Solución:** Verifica que la ruta tenga `meta: { requiresAuth: true }`

### ❌ Bucle infinito de redirecciones

**Solución:** Asegúrate de que el guard tenga la verificación `if (to.name !== 'login')`

---

## 📚 Recursos

- [Laravel Sanctum Docs](https://laravel.com/docs/sanctum)
- [Vue Router Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
- [Axios Documentation](https://axios-http.com/docs/intro)

---

**✨ Creado:** 2025-12-09  
**📌 Proyecto:** Laravel + Vue 3 SPA Authentication
