<script setup>
import { ref } from 'vue';
import api from '../http/axios';
import { useToast } from '@/composables/useToast';
import AllCategories from '@/components/AllCategories.vue';
import ToastContainer from '@/components/ToastContainer.vue';

const { addToast } = useToast();

const showDesc = ref(false);
const modalCategories = ref(false);
const preview = ref(false);
const newCategories = ref([]);

const form = ref({
  title: '',
  release: '',
  producer: '',
  description: '',
  categories: [],
  duration: '',
  poster: null,
});

const props = defineProps({
  show: Boolean,
  movie: Object,
});

const updateNewsCategories = (categories) => {
  newCategories.value = categories;
  modalCategories.value = false;
  form.value.categories = newCategories.value.map((category) => category.id);
};

const formatearDuracion = (minutos) => {
  const hrs = Math.floor(minutos / 60);
  const mins = minutos % 60;
  return `${hrs}h ${mins}m`;
};

const formatReleaseDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
};

const close = () => {
  modalCategories.value = false;
};

const updateCategories = (name) => {
  newCategories.value = newCategories.value.filter((category) => category.name !== name);
};

const toggleDescription = () => {
  showDesc.value = !showDesc.value;
};

const handleImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.poster = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const removePreview = () => {
  preview.value = null;
  form.value.poster = null;
};

const updateMovie = async () => {
  try {
    if (newCategories.value.length == 0) {
      form.value.categories = props.movie.categories.map((category) => category.id);
    }
    await api.post(`/api/movie/${props.movie.id}`, form.value, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    addToast('Película actualizada correctamente', 'success');
    emit('closeEdit');
  } catch (error) {
    console.error(error);
  }
};

const emit = defineEmits(['closeEdit']);
</script>

<template>
  <div
    v-if="show"
    @click.self="emit('closeEdit')"
    class="fixed inset-0 z-40 flex items-center justify-center h-screen w-screen bg-black/40 backdrop-blur-sm transition-all duration-300"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl max-h-[90vh] w-full max-w-2xl mx-4 relative overflow-hidden animate-fade-in-up"
      @click.stop
    >
      <!-- Encabezado fijo -->
      <div class="sticky top-0 z-10 bg-white border-b border-gray-100 px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-2xl font-bold text-gray-900">Actualizar Película: {{ movie.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">Edite los campos que desee cambiar</p>
          </div>
          <button
            @click="emit('closeEdit')"
            class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Contenido desplazable -->
      <div class="overflow-y-auto max-h-[calc(90vh-140px)] px-8 py-6">
        <form @submit.prevent="updateMovie" class="space-y-6">
          <!-- Título -->
          <div class="space-y-2">
            <label for="title" class="block text-sm font-semibold text-gray-700"> Título </label>
            <input
              type="text"
              id="title"
              v-model="form.title"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white"
              placeholder="Ej. Interestelar"
            />
            <p class="text-sm text-gray-600 flex items-center gap-2">
              <span class="font-semibold text-sm text-gray-500">Título actual:</span>
              <span class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-xs font-semibold">
                {{ movie.title }}
              </span>
            </p>
          </div>

          <!-- Fila de 2 columnas para campos relacionados -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Lanzamiento -->
            <div class="space-y-2">
              <label for="release" class="block text-sm font-semibold text-gray-700">
                Fecha de Lanzamiento
              </label>
              <div class="relative">
                <input
                  v-model="form.release"
                  type="date"
                  id="release"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-white"
                />
                <svg
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p class="text-sm text-gray-600 flex items-center gap-2 pt-2">
                  <span>Título actual:</span>
                  <span
                    class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-xs font-semibold"
                  >
                    {{ formatReleaseDate(movie.release) }}
                  </span>
                </p>
              </div>
            </div>

            <!-- Duración -->
            <div class="space-y-2">
              <label for="duration" class="block text-sm font-semibold text-gray-700">
                Duración (minutos)
              </label>
              <input
                v-model="form.duration"
                type="number"
                id="duration"
                min="1"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-white"
                placeholder="120"
              />
              <p class="text-sm text-gray-600 flex items-center gap-2 pt-2">
                <span>Título actual:</span>
                <span
                  class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-xs font-semibold"
                >
                  {{ movie.duration }} min o
                  {{ formatearDuracion(movie.duration) }}
                </span>
              </p>
            </div>
          </div>

          <!-- Productor -->
          <div class="space-y-2">
            <label for="producer" class="block text-sm font-semibold text-gray-700">
              Productor / Estudio
            </label>
            <input
              v-model="form.producer"
              type="text"
              id="producer"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-white"
              placeholder="Ej. Warner Bros. Pictures"
            />
            <p class="text-sm text-gray-600 flex items-center gap-2 pt-2">
              <span>Título actual:</span>
              <span class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-xs font-semibold">
                {{ movie.producer }}
              </span>
            </p>
          </div>

          <!-- Categoría -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-700"> Categorías </label>
            <div class="flex gap-3">
              <button
                @click="modalCategories = true"
                type="button"
                class="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all flex-1"
              >
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span class="font-medium text-gray-600">Seleccionar Categorías</span>
              </button>
              <button
                type="button"
                class="px-5 py-3 font-semibold text-white bg-linear-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                title="Agregar nueva categoría"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
            <!-- Categorías actual de la pelicula -->
            <div v-if="movie.categories.length > 0" class="flex flex-wrap gap-2 pt-2 items-center">
              <p class="font-semibold text-sm text-gray-600">Categorias Actuales:</p>
              <span
                v-for="cat in movie.categories"
                :key="cat.id"
                class="inline-flex items-center gap-2 bg-linear-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-0.5 rounded-full text-sm font-medium border border-blue-100 shadow-sm"
              >
                {{ cat.name }}
              </span>
            </div>

            <!-- categorias nuevas -->
            <div v-if="newCategories.length > 0" class="flex flex-wrap gap-2">
              <span
                v-for="cat in newCategories"
                :key="cat.id"
                class="inline-flex items-center gap-2 bg-linear-to-r from-blue-50 to-indigo-50 text-blue-700 px-2 py-1 rounded-full text-sm font-medium border border-blue-100 shadow-sm"
              >
                {{ cat.name }}
                <button
                  @click="updateCategories(cat.name)"
                  type="button"
                  class="cursor-pointer w-5 h-5 flex items-center justify-center rounded-full bg-white text-blue-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  ×
                </button>
              </span>
            </div>
          </div>

          <!-- Descripción -->
          <div class="space-y-2">
            <label
              for="description"
              class="flex items-center gap-2 text-sm font-semibold text-gray-700"
            >
              Sinopsis
              <button
                @click="toggleDescription"
                type="button"
                class="flex items-center gap-2 px-2 py-0.5 text-white font-semibold cursor-pointer bg-blue-500 rounded transition active:scale-90"
              >
                Ver
                <i v-if="showDesc">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />
                  </svg>
                </i>
                <i v-else>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </i>
              </button>
            </label>
            <textarea
              v-model="form.description"
              id="description"
              rows="4"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-white resize-none"
              placeholder="Describe brevemente la trama de la película..."
            ></textarea>
            <p v-if="showDesc" class="text-sm text-gray-600 flex items-center gap-2 pt-2">
              <span class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-xs font-semibold">
                {{ movie.description }}
              </span>
            </p>
          </div>

          <!-- Imagen -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-700">
              Portada de la película
            </label>

            <!-- Layout de dos columnas: Portada actual y Nueva portada -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Portada actual -->
              <div class="space-y-2">
                <p class="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Portada Actual
                </p>
                <div class="border-2 border-gray-200 rounded-2xl bg-gray-50">
                  <img
                    :src="movie.image"
                    alt="Portada actual"
                    class="w-full h-full object-cover rounded-xl shadow-md"
                  />
                </div>
              </div>

              <!-- Nueva portada / Upload -->
              <div class="space-y-2">
                <p class="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  {{ preview ? 'Nueva Portada (Preview)' : 'Cambiar Portada' }}
                </p>
                <div
                  @click="$refs.fileInput.click()"
                  class="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer h-full flex items-center justify-center"
                  :class="{ 'border-blue-500 bg-blue-50': preview }"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    id="image"
                    @change="handleImage"
                    class="hidden"
                    accept="image/*"
                  />

                  <!-- Vista previa de nueva imagen -->
                  <div v-if="preview" class="relative w-full">
                    <img
                      :src="preview"
                      alt="Vista previa"
                      class="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                    <button
                      @click.stop="removePreview"
                      class="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Placeholder para subir imagen -->
                  <div v-else class="space-y-3 py-8">
                    <div
                      class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mx-auto"
                    >
                      <svg
                        class="w-8 h-8 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p class="text-gray-700 font-medium">Haz clic para subir una imagen</p>
                      <p class="text-sm text-gray-500 mt-1">PNG, JPG o WebP (max. 5MB)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom-0 bg-white border-t border-gray-100 px-8 py-6">
            <div class="flex justify-end gap-4">
              <button
                @click="emit('closeEdit')"
                type="button"
                class="px-6 py-3 font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="px-8 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                <span class="flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Guardar Película
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <ToastContainer />
  <AllCategories
    :showCats="modalCategories"
    :newCategories="newCategories"
    :updateData="false"
    @close="close"
    @updateNewsCategories="updateNewsCategories"
  />
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

input[type='date']::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

/* Scroll personalizado */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
