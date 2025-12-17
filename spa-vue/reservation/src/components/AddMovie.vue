<script setup>
import { ref } from 'vue';
import api from '../http/axios';
import { useToast } from '../composables/useToast';
import AllCategories from './AllCategories.vue';
import AddCategory from './AddCategory.vue';

const { addToast } = useToast();

const modalCategories = ref(false);
const modalAddCategory = ref(false);
const categoriesSelected = ref([]);
const preview = ref(null);

const form = ref({
  title: '',
  release: '',
  producer: '',
  categories: [],
  description: '',
  duration: '',
  poster: null,
});

defineProps({
  show: Boolean,
});

const handleImage = (e) => {
  const selected = e.target.files[0];
  if (!selected) {
    preview.value = null;
  } else {
    preview.value = URL.createObjectURL(selected);
    form.value.poster = selected;
  }
};

const removePreview = () => {
  preview.value = null;
  form.value.poster = null;
};
const getCategoriesSelected = (cats) => {
  categoriesSelected.value = cats;
  console.log(categoriesSelected.value);
  form.value.categories = cats.map((category) => category.id);
  modalCategories.value = false;
};

const close = () => {
  modalCategories.value = false;
};

const closeAddCategory = () => {
  modalAddCategory.value = false;
};

const updateCategories = (name) => {
  categoriesSelected.value = categoriesSelected.value.filter((category) => category.name !== name);
};

const submitForm = async () => {
  try {
    await api.post('/api/movie', form.value, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    emit('close');
    addToast('Película agregada exitosamente', 'success');
  } catch (error) {
    addToast('Error al agregar la película', 'error');
    console.error(error);
  }
};
const emit = defineEmits(['close']);
</script>

<template>
  <div
    v-if="show"
    @click.self="emit('close')"
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
            <h3 class="text-2xl font-bold text-gray-900">Agregar Nueva Película</h3>
            <p class="text-sm text-gray-500 mt-1">Complete todos los campos requeridos</p>
          </div>
          <button
            @click="emit('close')"
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
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Título -->
          <div class="space-y-2">
            <label for="title" class="block text-sm font-semibold text-gray-700">
              Título <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              v-model="form.title"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white"
              placeholder="Ej. Interestelar"
              required
            />
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
                @click="modalAddCategory = true"
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

            <!-- Categorías seleccionadas -->
            <div v-if="categoriesSelected.length > 0" class="flex flex-wrap gap-2 pt-2">
              <span
                v-for="cat in categoriesSelected"
                :key="cat.id"
                class="inline-flex items-center gap-2 bg-linear-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-100 shadow-sm"
              >
                {{ cat.name }}
                <button
                  @click="updateCategories(cat.name)"
                  class="w-5 h-5 flex items-center justify-center rounded-full bg-white text-blue-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  ×
                </button>
              </span>
            </div>
          </div>

          <!-- Descripción -->
          <div class="space-y-2">
            <label for="description" class="block text-sm font-semibold text-gray-700">
              Sinopsis
            </label>
            <textarea
              v-model="form.description"
              id="description"
              rows="4"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-white resize-none"
              placeholder="Describe brevemente la trama de la película..."
            ></textarea>
          </div>

          <!-- Imagen -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-700">
              Portada de la película
            </label>
            <div
              @click="$refs.fileInput.click()"
              class="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
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

              <div v-if="!preview" class="space-y-3">
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

              <!-- Vista previa -->
              <div v-if="preview" class="relative">
                <img
                  :src="preview"
                  alt="Vista previa"
                  class="w-48 h-48 object-cover rounded-xl mx-auto shadow-lg"
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
            </div>
          </div>
          <div class="bottom-0 bg-white border-t border-gray-100 px-8 py-6">
            <div class="flex justify-end gap-4">
              <button
                @click="emit('close')"
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

    <AllCategories
      :showCats="modalCategories"
      :updateData="false"
      @close="close"
      @getCategoriesSelected="getCategoriesSelected"
    />

    <AddCategory :show="modalAddCategory" @closeAddCategory="closeAddCategory" />
  </div>
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
