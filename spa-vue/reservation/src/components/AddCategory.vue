<script setup>
import ToastContainer from '@/components/ToastContainer.vue';
import DeleteComponent from '@/components/DeleteComponent.vue';
import { useCategory } from '@/composables/useCategory';
import { useToast } from '@/composables/useToast';
import { ref } from 'vue';
import api from '@/http/axios';

const showTable = ref(false);
const text = ref('Mostrar Todos');
const categoryToEdit = ref(null);
const categoryToDelete = ref(null);
const newCategoryName = ref('');
const categoryName = ref('');
const deleteCategory = ref(false);

const { addToast } = useToast();
const { getData, categories } = useCategory();

defineProps({
  show: Boolean,
});

const emit = defineEmits(['closeAddCategory']);

const toggleTable = () => {
  showTable.value = !showTable.value;
  text.value = showTable.value == false ? 'Mostrar Todos' : 'Ocultar Todos';
};

async function addCategory() {
  try {
    await api.post('/api/category', { name: newCategoryName.value });
    emit('closeAddCategory');
    addToast('Categoria agregada exitosamente', 'success');
    newCategoryName.value = '';
    getData();
  } catch (error) {
    console.error('Error adding category:', error);
    addToast('Error al agregar la categoria', 'error');
  }
}

const editCategory = (category) => {
  categoryName.value = null;
  categoryToEdit.value = category;
  console.log(categoryToEdit.value.id);
};

const cancelEdit = () => {
  categoryToEdit.value = null;
};

const updateCategory = async () => {
  try {
    await api.put(`/api/category/${categoryToEdit.value.id}`, { name: categoryName.value });
    emit('closeAddCategory');
    addToast('Categoria actualizada exitosamente', 'success');
    newCategoryName.value = '';
    categoryName.value = '';
    categoryToEdit.value = null;
    getData();
  } catch (error) {
    console.error('Error updating category:', error);
    addToast('Error al actualizar la categoria', 'error');
  }
};

const closeDelete = () => {
  deleteCategory.value = false;
  categoryToDelete.value = null;
};

const openDelete = (category) => {
  categoryToDelete.value = category;
  deleteCategory.value = true;
};

getData();
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 grid h-screen w-screen place-items-center bg-black/30 backdrop-blur-xs transition-opacity duration-300"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 min-w-[450px]">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Agregar Categoria</h3>
      <form @submit.prevent="addCategory">
        <div class="mb-4">
          <label for="categoryName" class="block text-gray-700 font-semibold mb-2"
            >Nombre de la Categoria:</label
          >
          <input
            id="categoryName"
            v-model="newCategoryName"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div class="flex justify-between">
          <button
            @click="toggleTable"
            type="button"
            class="text-sm text-gray-500 font-semibold cursor-pointer transition hover:underline"
          >
            {{ text }}
          </button>
          <div>
            <button
              type="button"
              class="px-3 py-1 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
              @click="emit('closeAddCategory')"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-3 py-1 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 ml-2"
            >
              Agregar
            </button>
          </div>
        </div>
      </form>
      <!-- tabla  -->
      <div
        v-show="showTable"
        class="relative mt-5 overflow-x-auto bg-white shadow-xs rounded-base border border-gray-300 rounded max-h-[calc(60vh)]"
      >
        <table class="w-full text-sm text-left rtl:text-right text-body">
          <thead class="text-sm text-body bg-gray-100 border-b rounded-base border-gray-300">
            <tr>
              <th scope="col" class="px-6 py-3 font-medium">Categoria</th>
              <th scope="col" class="px-6 py-3 font-medium">Accion</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="category in categories"
              :key="category.id"
              class="bg-neutral-primary border-b gray-400"
            >
              <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                <p v-if="!categoryToEdit || category.id != categoryToEdit.id">
                  {{ category.name }}
                </p>
                <input
                  v-else
                  :placeholder="category.name"
                  type="text"
                  class="border border-gray-500 rounded-md px-2 py-1"
                  v-model="categoryName"
                />
              </th>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <button
                    @click="editCategory(category)"
                    v-if="!categoryToEdit || category.id != categoryToEdit.id"
                    class="cursor-pointer transition active:scale-90"
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
                  </button>
                  <button
                    v-else
                    @click="cancelEdit"
                    class="cursor-pointer transition active:scale-90"
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
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <!-- delete category -->
                  <button
                    v-if="!categoryToEdit || category.id != categoryToEdit.id"
                    @click="openDelete(category)"
                    class="cursor-pointer transition active:scale-90"
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
                  </button>

                  <!-- confirm -->
                  <button
                    v-else
                    @click="updateCategory"
                    class="cursor-pointer transition active:scale-90"
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
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <ToastContainer />
  <DeleteComponent
    :show="deleteCategory"
    :resource="categoryToDelete"
    url="category"
    @closeDelete="closeDelete"
  />
</template>
