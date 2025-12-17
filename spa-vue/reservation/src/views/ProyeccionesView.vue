<script setup>
import { ref } from 'vue';

const query = ref('');
</script>

<template>
  <div class="p-4 sm:p-6">
    <!-- Encabezado con título y estadísticas -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Dashboard de Proyecciones</h1>
          <p class="text-gray-600 mt-1">Gestiona las proyecciones de las películas</p>
        </div>
        <div class="flex items-center gap-4">
          <button class="font-semibold text-blue-600">Agregar Sala</button>
          <button
            class="bg-blue-600 hover:bg-blue-700 font-semibold text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition cursor-pointer active:scale-90 shadow-md hover:shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Agregar Proyección
          </button>
        </div>
      </div>

      <!-- Filtros de búsqueda -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <div class="relative">
              <input
                v-model="query"
                type="text"
                placeholder="Buscar películas por título..."
                class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 focus:outline-none"
              />
              <!-- svg buscador -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 absolute left-4 top-3.5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <!-- svg clear -->
              <button
                class="cursor-pointer h-5 w-5 absolute right-4 top-3.5 text-gray-400 transition hover:bg-gray-100 rounded hover:text-gray-700 active:scale-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div class="w-full md:w-auto flex gap-2">
            <div class="relative flex-1">
              <select
                class="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 focus:outline-none appearance-none bg-white"
              >
                <option :value="null">Selecciona una categoría</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <!-- Mostrar filtros activos -->
        <div v-if="query" class="mt-4 flex flex-wrap items-center gap-2">
          <span class="text-sm text-gray-600 font-medium">Filtros:</span>

          <!-- Filtro por búsqueda -->
          <span
            class="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 text-sm px-3 py-1.5 rounded-full"
          >
            <button class="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>

          <!-- Filtro por categoría -->
          <!-- <span
            class="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 text-sm px-3 py-1.5 rounded-full"
          >
            <button class="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span> -->
        </div>
      </div>
    </div>
  </div>

  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Proyecciones de Cine</h1>
        <p class="text-gray-600 mt-2">Panel de administración - Todas las funciones programadas</p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-4 mb-8 p-4 bg-white rounded-xl shadow-sm">
        <button class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg">Todas</button>
        <button class="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg">
          Programadas
        </button>
        <button class="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg">En curso</button>
        <button class="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg">
          Finalizadas
        </button>
      </div>

      <!-- Projections Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Projection Card - EN CURSO -->
        <div class="bg-white rounded-xl shadow-sm border-l-4 border-green-500">
          <!-- Status Badge -->
          <div class="flex justify-between items-start p-5">
            <div class="flex items-center gap-3">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
              >
                <span class="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                En curso
              </span>
              <span class="text-lg font-bold text-gray-900">Sala #4</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg"
                >Estándar</span
              >
              <span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-lg"
                >3D</span
              >
            </div>
          </div>

          <!-- Movie Info -->
          <div class="px-5 pb-4">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Avengers: Endgame</h3>
            <div class="flex items-center text-gray-600 mb-4">
              <span class="mr-4">PG-13</span>
              <span>3h 2min</span>
            </div>

            <!-- Time Info -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p class="text-sm text-gray-500 mb-1">Inició</p>
                <p class="font-medium text-gray-900">18:30 PM</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">Finaliza</p>
                <p class="font-medium text-gray-900">21:32 PM</p>
              </div>
            </div>

            <!-- Seats Info -->
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <p class="text-2xl font-bold text-gray-900">120</p>
                <p class="text-sm text-gray-500">Total</p>
              </div>
              <div class="text-center p-3 bg-green-50 rounded-lg">
                <p class="text-2xl font-bold text-green-700">42</p>
                <p class="text-sm text-green-600">Libres</p>
              </div>
              <div class="text-center p-3 bg-red-50 rounded-lg">
                <p class="text-2xl font-bold text-red-700">78</p>
                <p class="text-sm text-red-600">Ocupados</p>
              </div>
            </div>

            <!-- Action Button -->
            <button
              class="w-full py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Ver más detalles
            </button>
          </div>
        </div>

        <!-- Projection Card - PROGRAMADO -->
        <div class="bg-white rounded-xl shadow-sm border-l-4 border-blue-500">
          <!-- Status Badge -->
          <div class="flex justify-between items-start p-5">
            <div class="flex items-center gap-3">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                <span class="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                Programado
              </span>
              <span class="text-lg font-bold text-gray-900">Sala #2</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-lg"
                >Premium</span
              >
            </div>
          </div>

          <!-- Movie Info -->
          <div class="px-5 pb-4">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Dune: Parte Dos</h3>
            <div class="flex items-center text-gray-600 mb-4">
              <span class="mr-4">PG-13</span>
              <span>2h 46min</span>
            </div>

            <!-- Time Info -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p class="text-sm text-gray-500 mb-1">Comienza</p>
                <p class="font-medium text-gray-900">20:00 PM</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">Duración</p>
                <p class="font-medium text-gray-900">2h 46min</p>
              </div>
            </div>

            <!-- Seats Info -->
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <p class="text-2xl font-bold text-gray-900">90</p>
                <p class="text-sm text-gray-500">Total</p>
              </div>
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <p class="text-2xl font-bold text-gray-900">90</p>
                <p class="text-sm text-gray-500">Libres</p>
              </div>
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <p class="text-2xl font-bold text-gray-900">0</p>
                <p class="text-sm text-gray-500">Ocupados</p>
              </div>
            </div>

            <!-- Action Button -->
            <button
              class="w-full py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Ver más detalles
            </button>
          </div>
        </div>

        <!-- Projection Card - PROGRAMADO con múltiples tipos -->
        <div class="bg-white rounded-xl shadow-sm border-l-4 border-blue-500">
          <div class="flex justify-between items-start p-5">
            <div class="flex items-center gap-3">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                <span class="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                Programado
              </span>
              <span class="text-lg font-bold text-gray-900">Sala #1</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg"
                >Estándar</span
              >
              <span class="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-lg"
                >3D</span
              >
              <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-lg"
                >Premium</span
              >
            </div>
          </div>

          <div class="px-5 pb-4">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Spider-Man: No Way Home</h3>
            <div class="flex items-center text-gray-600 mb-4">
              <span class="mr-4">PG-13</span>
              <span>2h 28min</span>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p class="text-sm text-gray-500 mb-1">Comienza</p>
                <p class="font-medium text-gray-900">22:15 PM</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">Duración</p>
                <p class="font-medium text-gray-900">2h 28min</p>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4 mb-6">
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <p class="text-2xl font-bold text-gray-900">150</p>
                <p class="text-sm text-gray-500">Total</p>
              </div>
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <p class="text-2xl font-bold text-gray-900">150</p>
                <p class="text-sm text-gray-500">Libres</p>
              </div>
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <p class="text-2xl font-bold text-gray-900">0</p>
                <p class="text-sm text-gray-500">Ocupados</p>
              </div>
            </div>

            <button
              class="w-full py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Ver más detalles
            </button>
          </div>
        </div>

        <!-- Projection Card - Finalizado (Ejemplo extra) -->
        <div class="bg-white rounded-xl shadow-sm border-l-4 border-gray-400">
          <div class="flex justify-between items-start p-5">
            <div class="flex items-center gap-3">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
              >
                <span class="w-2 h-2 rounded-full bg-gray-400 mr-2"></span>
                Finalizado
              </span>
              <span class="text-lg font-bold text-gray-900">Sala #3</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg"
                >Estándar</span
              >
            </div>
          </div>

          <div class="px-5 pb-4">
            <h3 class="text-xl font-bold text-gray-900 mb-2">The Batman</h3>
            <div class="flex items-center text-gray-600 mb-4">
              <span class="mr-4">PG-13</span>
              <span>2h 56min</span>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p class="text-sm text-gray-500 mb-1">Finalizó</p>
                <p class="font-medium text-gray-900">17:30 PM</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">Ocupación</p>
                <p class="font-medium text-gray-900">92%</p>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4 mb-6">
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <p class="text-2xl font-bold text-gray-900">110</p>
                <p class="text-sm text-gray-500">Total</p>
              </div>
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <p class="text-2xl font-bold text-gray-900">9</p>
                <p class="text-sm text-gray-500">Libres</p>
              </div>
              <div class="text-center p-3 bg-gray-50 rounded-lg">
                <p class="text-2xl font-bold text-gray-900">101</p>
                <p class="text-sm text-gray-500">Ocupados</p>
              </div>
            </div>

            <button
              class="w-full py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Ver más detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
