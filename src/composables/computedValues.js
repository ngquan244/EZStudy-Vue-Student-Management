// Import states
import { computed } from 'vue'
import { selectedClass, students, currentPage } from './states'

// Filtering logics handle
export const filteredStudents = computed(() => {
  if (selectedClass.value === 'all') return students.value

  const classListRaw = localStorage.getItem('ezstudy-classes')
  const allClasses = classListRaw ? JSON.parse(classListRaw) : []

  if (selectedClass.value === '11' || selectedClass.value === '12') {
    const groupName = 'Lớp ' + selectedClass.value
    const matchingClassNames = allClasses
      .filter(c => c.grade === groupName)
      .map(c => c.name)
    return students.value.filter(s => matchingClassNames.includes(s.class))
  }

  return students.value.filter(s => s.class === selectedClass.value)
})

export const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * 5
  return filteredStudents.value.slice(start, start + 5)
})

export const totalPages = computed(() => 
  Math.ceil(filteredStudents.value.length / 5)
)
