import { onMounted } from 'vue'
import { STORAGE_KEY, students, classList } from './states'

// LifeCycle hook and reload classlist on mount
export function loadOnMount() {
  onMounted(() => {
    const storedStudents = localStorage.getItem(STORAGE_KEY)
    try {
      students.value = storedStudents ? JSON.parse(storedStudents) : []
    } catch {
      students.value = []
    }

    const storedClasses = localStorage.getItem('ezstudy-classes')
    try {
      classList.value = storedClasses ? JSON.parse(storedClasses) : []
    } catch {
      classList.value = []
    }
  })
}

export function reloadClassList(selectedClass) {
  const stored = localStorage.getItem('ezstudy-classes')
  try {
    classList.value = stored ? JSON.parse(stored) : []
  } catch {
    classList.value = []
  }

  if (
    selectedClass.value !== 'all' &&
    !classList.value.some(c => c.name === selectedClass.value)
  ) {
    selectedClass.value = 'all'
  }
}
