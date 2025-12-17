import { ref } from 'vue'
import api from '@/http/axios'

const categories = ref([])
const filteredCategories = ref([])

export function useCategory() {

  const getData = async () => {
    try {
      const res = await api.get('/api/category')
      const data = res.data.data
      categories.value = data
      filteredCategories.value = data
    } catch (error) {
      console.error(error)
    }
  }
  return {
    categories,
    filteredCategories,
    getData,
  }
}
