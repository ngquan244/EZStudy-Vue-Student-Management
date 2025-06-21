import { ref, computed } from 'vue'

export function useClassState() {
  // Reactive UI States
  const classes = ref([])
  const showAddForm = ref(false)
  const showEditForm = ref(false)
  const editingClass = ref(null)
  const editingIndex = ref(-1)
  const currentPage = ref(1)
  const classesPerPage = 5
  
  // pagination logic handle - 5 per page
  const paginatedClasses = computed(() => {
    const start = (currentPage.value - 1) * classesPerPage
    return classes.value.slice(start, start + classesPerPage)
  })

  const totalPages = computed(() =>
    Math.ceil(classes.value.length / classesPerPage)
  )

  return {
    classes,
    showAddForm,
    showEditForm,
    editingClass,
    editingIndex,
    currentPage,
    classesPerPage,
    paginatedClasses,
    totalPages
  }
}
