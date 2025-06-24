import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Import Child Logics
import { loadClassesAndGrades } from './logicLoadData'
import { groupAllRows } from './logicGroupRows'
import { getTotalPages, getPaginatedRows } from './logicPagination'
import { handleEdit } from './logicEditHandler'
import { handleRemove } from './logicRemoveHandler'

export default function useClassManager() {
  const router = useRouter()
  const classes = ref([])
  const grades = ref([])
  const currentPage = ref(1)
  const rowsPerPage = 5

  onMounted(() => {
    const { loadedClasses, loadedGrades } = loadClassesAndGrades()
    classes.value = loadedClasses
    grades.value = loadedGrades
  })

  const groupedAllRows = computed(() => groupAllRows(classes.value, grades.value))
  const totalPages = computed(() => getTotalPages(groupedAllRows.value, rowsPerPage))
  const paginatedRows = computed(() => getPaginatedRows(groupedAllRows.value, currentPage.value, rowsPerPage))

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const edit = (item) => handleEdit(item, router)
  const remove = (item) => {
    const result = handleRemove(item, classes.value, grades.value)
    classes.value = result.updatedClasses
    grades.value = result.updatedGrades
    currentPage.value = 1
  }

  return {
    paginatedRows,
    totalPages,
    currentPage,
    goToPage,
    edit,
    remove
  }
}
