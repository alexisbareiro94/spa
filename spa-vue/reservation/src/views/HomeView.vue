<script setup>
import { ref } from 'vue';
import api from '@/http/axios';
import { useCategory } from '../composables/useCategory';
import AddMovie from '@/components/AddMovie.vue';
import UpdateMovie from '@/components/UpdateMovie.vue';
import DeleteComponent from '@/components/DeleteComponent.vue';

const peliculas = ref({});
const query = ref('');
const filteredMovies = ref([]);
const movieModal = ref(false);
const editMovie = ref(false);
const movieSelected = ref({});
const deleteMovie = ref(false);
const categoryFilter = ref(null);

const { categories } = useCategory();

const agregarPelicula = () => {
  movieModal.value = true;
};

const close = async () => {
  movieModal.value = false;
  await getData();
};

const closeEdit = async () => {
  editMovie.value = false;
  await getData();
};

const closeDelete = async () => {
  deleteMovie.value = false;
  await getData();
};

const formatearDuracion = (minutos) => {
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;
  return `${horas}h ${mins}m`;
};

async function getData() {
  try {
    const res = await api.get('/api/movie');
    const data = res.data.data;
    peliculas.value = data;
    filteredMovies.value = data;
  } catch (err) {
    console.error('Error al cargar las películas:', err);
  }
}

let timer;
const filterMovies = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    // Empezar con todas las películas
    let result = peliculas.value;

    // Aplicar filtro de categoría si existe
    if (categoryFilter.value) {
      result = result.filter((movie) =>
        movie.categories.some((category) => category.id === categoryFilter.value),
      );
    }

    // Aplicar filtro de búsqueda si existe
    if (query.value) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(query.value.toLowerCase()),
      );
    }

    filteredMovies.value = result;
  }, 300);
};

const clearCategory = () => {
  categoryFilter.value = null;
  filterMovies();
};

const getCategoryName = (categoryId) => {
  const category = categories.value.find((category) => category.id === categoryId);
  return category ? category.name : '';
};

getData();
</script>

<template>
  <div class="p-4 sm:p-6">
    <!-- Encabezado con título y estadísticas -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Dashboard de Películas</h1>
          <p class="text-gray-600 mt-1">Gestiona tu colección de películas</p>
        </div>
        <div class="flex items-center gap-4">
          <div
            class="hidden sm:flex items-center gap-4 text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-lg"
          >
            <!-- <span class="font-medium">{{ peliculasFiltradas.length }}</span> películas
            <span class="text-gray-400">•</span>
            <span class="font-medium">{{ generosDisponibles.length - 1 }}</span> géneros -->
          </div>
          <button
            @click="agregarPelicula"
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
            Agregar Película
          </button>
        </div>
      </div>

      <!-- Filtros de búsqueda -->
      <div class="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <div class="relative">
              <input
                @input="filterMovies"
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
                v-show="query.length > 0"
                @click="
                  query = '';
                  filterMovies();
                "
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
                v-model="categoryFilter"
                @change="filterMovies"
                class="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 focus:outline-none appearance-none bg-white"
              >
                <option :value="null">Selecciona una categoría</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
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
        <div v-if="query || categoryFilter" class="mt-4 flex flex-wrap items-center gap-2">
          <span class="text-sm text-gray-600 font-medium">Filtros:</span>

          <!-- Filtro por búsqueda -->
          <span
            v-if="query"
            class="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 text-sm px-3 py-1.5 rounded-full"
          >
            Título: "{{ query }}"
            <button
              @click="
                query = '';
                filterMovies();
              "
              class="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
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
          <span
            v-if="categoryFilter"
            class="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 text-sm px-3 py-1.5 rounded-full"
          >
            Categoría: "{{ getCategoryName(categoryFilter) }}"
            <button
              @click="clearCategory"
              class="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
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
        </div>
      </div>
    </div>

    <!-- Grid de películas -->
    <div v-if="peliculas.length > 0">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        Películas
        <span class="text-gray-500 font-normal">({{ filteredMovies.length }})</span>
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div
          v-for="pelicula in filteredMovies"
          :key="pelicula.id"
          class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Poster de la película -->
          <div class="relative h-64 overflow-hidden">
            <img
              :src="pelicula.image"
              :alt="pelicula.title"
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />

            <!-- Rating overlay -->
            <div
              class="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              {{ pelicula.score }}
            </div>

            <!-- Año de lanzamiento -->
            <div
              class="absolute bottom-4 right-4 bg-white/90 text-gray-800 px-3 py-1 rounded-lg text-sm font-semibold"
            >
              {{ new Date(pelicula.release).getFullYear() }}
            </div>
          </div>

          <!-- Información de la película -->
          <div class="p-5">
            <div class="flex justify-between items-start mb-3">
              <h3 class="font-bold text-lg text-gray-900 line-clamp-1">
                {{ pelicula.title }}
              </h3>
              <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {{ formatearDuracion(pelicula.duration) }}
              </span>
            </div>

            <p class="text-sm text-gray-600 mb-4 line-clamp-2">
              {{ pelicula.description }}
            </p>

            <div class="flex flex-wrap gap-2 mb-5">
              <span
                v-for="item in pelicula.categories"
                :key="item.id"
                class="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 border border-gray-300 text-gray-700"
              >
                {{ item.name }}
              </span>
            </div>

            <!-- Botones de acción -->
            <div class="flex justify-between items-center pt-4 border-t border-gray-100">
              <button
                @click="
                  editMovie = true;
                  movieSelected = pelicula;
                "
                class="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex p-0.5 rounded-md items-center gap-1 transition cursor-pointer hover:bg-blue-100 active:scale-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>

                <!-- Editar -->
              </button>
              <button
                class="text-gray-600 hover:text-gray-800 font-medium text-sm flex items-center gap-1 transition cursor-pointer p-0.5 rounded-md hover:bg-gray-200 active:scale-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <!-- Ver detalles -->
              </button>
              <button
                @click="
                  deleteMovie = true;
                  movieSelected = pelicula;
                "
                class="text-red-600 hover:text-red-800 font-medium text-sm flex items-center gap-1 transition cursor-pointer p-0.5 rounded-md hover:bg-red-100 active:scale-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>

                <!-- Eliminar -->
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mensaje si no hay resultados -->
    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
      <div class="max-w-md mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 class="text-xl font-medium text-gray-900 mb-2">No se encontraron películas</h3>
        <p class="text-gray-600 mb-6">No hay películas que coincidan con tu búsqueda</p>
        <div class="flex gap-3 justify-center">
          <button
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            Limpiar filtros
          </button>
          <button
            class="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-5 py-2 rounded-lg font-medium transition"
          >
            Agregar nueva película
          </button>
        </div>
      </div>
    </div>
  </div>
  <DeleteComponent
    :show="deleteMovie"
    :resource="movieSelected"
    url="movie"
    @closeDelete="closeDelete"
  />
  <AddMovie :show="movieModal" @close="close" />
  <UpdateMovie :show="editMovie" :movie="movieSelected" @closeEdit="closeEdit" />
</template>
