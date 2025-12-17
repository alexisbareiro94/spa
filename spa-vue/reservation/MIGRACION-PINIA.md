# Migración de Autenticación: Composable → Pinia Store

## 🎯 Problema Identificado

El manejo de autenticación mediante un composable (`useAuth`) presentaba problemas de reactividad, especialmente en `App.vue` donde `v-if="auth.isAuthenticated"` no funcionaba correctamente.

## ✅ Solución Implementada

Se migró la gestión de autenticación de un composable a un **Pinia Store**, que es la solución recomendada para estado global en Vue 3.

## 📁 Archivos Modificados

### 1. **Nuevo Store de Pinia** (`src/stores/auth.js`)

- ✨ Creado el store de autenticación con Pinia
- 🔄 Migrada toda la lógica del composable `useAuth`
- 📊 Estado reactivo centralizado y consistente

### 2. **Configuración de Pinia** (`src/main.js`)

- ➕ Importado `createPinia` de Pinia
- 🔧 Configurado Pinia en la aplicación Vue

### 3. **Router** (`src/router/index.js`)

- 🔄 Actualizado para usar `useAuthStore()` en lugar de `useAuth()`
- ✅ Eliminadas las referencias `.value` (ya no son necesarias con Pinia)

### 4. **App.vue**

- 🔄 Actualizado para usar `authStore` en lugar de `auth`
- ✅ Ahora `v-if="authStore.isAuthenticated"` funciona correctamente

### 5. **LoginView.vue**

- 🔄 Actualizado para usar el store de Pinia
- ✅ Acceso directo a propiedades sin `.value`

## 🎁 Ventajas de Usar Pinia

### 1. **Reactividad Garantizada**

- El estado es reactivo de forma nativa
- No necesitas usar `.value` para acceder a las propiedades
- Los cambios se propagan automáticamente a todos los componentes

### 2. **Estado Centralizado**

- Una única fuente de verdad para el estado de autenticación
- Todos los componentes acceden al mismo estado
- No hay problemas de sincronización

### 3. **DevTools**

- Integración completa con Vue DevTools
- Puedes inspeccionar el estado en tiempo real
- Historial de cambios (time-travel debugging)

### 4. **TypeScript Support**

- Excelente soporte para TypeScript
- Autocompletado mejorado en el IDE

### 5. **Mejor Organización**

- Separación clara entre estado, getters y actions
- Código más mantenible y escalable

## 📝 Uso del Store

### En un componente:

```vue
<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Acceso al estado
console.log(authStore.user)
console.log(authStore.isAuthenticated)

// Llamar a acciones
await authStore.login({ email, password })
await authStore.logout()
</script>

<template>
  <div v-if="authStore.isAuthenticated">Bienvenido {{ authStore.user?.name }}</div>
</template>
```

### En el router:

```javascript
import { useAuthStore } from '@/stores/auth'

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (!authStore.isInitialized) {
    await authStore.fetchUser()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})
```

## 🔍 Comparación: Antes vs Después

### ❌ Antes (Composable)

```javascript
const { user, isAuthenticated } = useAuth()

// Necesitas .value
if (isAuthenticated.value) {
  console.log(user.value)
}
```

### ✅ Después (Pinia)

```javascript
const authStore = useAuthStore()

// Acceso directo
if (authStore.isAuthenticated) {
  console.log(authStore.user)
}
```

## 🚀 Próximos Pasos

El composable `useAuth.js` puede ser eliminado si ya no se usa en ningún otro lugar. Todos los componentes ahora deberían usar el store de Pinia.

## 📚 Recursos

- [Pinia Documentation](https://pinia.vuejs.org/)
- [Why Pinia?](https://pinia.vuejs.org/introduction.html#why-should-i-use-pinia)
