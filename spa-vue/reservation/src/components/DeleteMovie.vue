<script setup>
import api from '../http/axios'

const props = defineProps({
  movie: Object,
  show: Boolean,
})

const emit = defineEmits(['closeDelete'])

const deleteMovie = async () => {
  try {
    await api.delete(`/api/movie/${props.movie.id}`)
  } catch (error) {
    console.error('Error deleting movie:', error)
  }
}
</script>

<template>
  <div
    v-if="show"
    id="deleteModal"
    class="fixed inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 ease-in-out"
  >
    <!-- Modal -->
    <div class="bg-white w-full max-w-sm rounded-xl shadow p-6">
      <h2 class="text-lg font-semibold text-gray-800">¿Eliminar producto?</h2>

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
          onclick="confirmDelete()"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>
