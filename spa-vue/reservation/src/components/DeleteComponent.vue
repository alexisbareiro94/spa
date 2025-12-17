<script setup>
import api from '../http/axios';
import { useToast } from '../composables/useToast';
import ToastContainer from './ToastContainer.vue';
import { useCategory } from '../composables/useCategory';

const { addToast } = useToast();
const { getData } = useCategory();

const props = defineProps({
  resource: Object,
  show: Boolean,
  url: String,
});

const emit = defineEmits(['closeDelete']);

const deleteResource = async () => {
  try {
    await api.delete(`/api/${props.url}/${props.resource.id}`);
    emit('closeDelete');
    if (props.url === 'movie') {
      addToast('Película eliminada correctamente', 'success');
    } else if (props.url === 'category') {
      getData();
      addToast('Categoría eliminada correctamente', 'success');
    } else {
      addToast('Recurso eliminado correctamente', 'success');
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
  }
};
</script>

<template>
  <div
    v-if="show"
    id="deleteModal"
    class="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center transition-all duration-300 ease-in-out"
  >
    <!-- Modal -->
    <div class="bg-white w-full max-w-sm rounded-xl shadow p-6">
      <h2 v-if="url === 'movie'" class="text-lg font-semibold text-gray-800">
        ¿Eliminar película: {{ resource.title }}?
      </h2>
      <h2 v-else-if="url === 'category'" class="text-lg font-semibold text-gray-800">
        ¿Eliminar categoría: {{ resource.name }}?
      </h2>

      <p class="text-sm text-gray-600 mt-2">
        Esta acción no se puede deshacer. ¿Estás seguro de que querés continuar?
      </p>

      <!-- Botones -->
      <div class="mt-6 flex justify-end gap-2">
        <button
          @click="emit('closeDelete')"
          class="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancelar
        </button>

        <button
          @click="deleteResource"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
  <ToastContainer />
</template>
