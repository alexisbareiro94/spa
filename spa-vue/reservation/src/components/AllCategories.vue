<script setup>
import { ref } from 'vue';
import { useCategory } from '@/composables/useCategory';

defineProps({
  showCats: Boolean,
});

const { categories, getData, filteredCategories } = useCategory();

const q = ref('');
const categoriesSelected = ref([]);

const emit = defineEmits(['close', 'getCategoriesSelected', 'updateNewsCategories']);

let timer;
const filterCategories = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    filteredCategories.value = categories.value.filter((category) =>
      category.name.toLowerCase().includes(q.value.toLowerCase()),
    );
  }, 300);
};

getData();
</script>

<template>
  <div
    v-if="showCats"
    class="fixed inset-0 z-50 grid h-screen w-screen place-items-center bg-black/30 backdrop-blur-xs transition-opacity duration-300"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 min-w-[400px]">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Categorías Disponibles</h3>
      <input
        @input="filterCategories"
        v-model="q"
        type="text"
        placeholder="Buscar..."
        class="col-span-5 mb-4 p-2 border border-gray-300 rounded-md w-full"
      />
      <div class="grid grid-cols-5 gap-2">
        <div
          v-for="category in filteredCategories"
          :key="category.id"
          class="flex items-center col-span-1"
        >
          <div class="flex items-center bg-gray-200 rounded font-semibold px-2 py-2">
            <label class="text-gray-700 flex cursor-pointer">
              <input class="mr-2" type="checkbox" v-model="categoriesSelected" :value="category" />
              {{ category.name }}
            </label>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4 items-center gap-3">
        <button
          @click="emit('close')"
          type="button"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cerrar
        </button>
        <button
          @click="
            emit('getCategoriesSelected', categoriesSelected);
            emit('updateNewsCategories', categoriesSelected);
          "
          class="px-4 py-2 bg-blue-300 text-gray-700 rounded-md hover:bg-gray-400"
          type="button"
        >
          Aceptar
        </button>
      </div>
    </div>
  </div>
</template>
