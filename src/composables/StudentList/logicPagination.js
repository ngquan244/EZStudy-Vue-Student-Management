// Pagination logics
import { computed } from 'vue'
import { filteredStudents, currentPage } from './state'
import { STUDENTS_PER_PAGE } from './constants'

export const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * STUDENTS_PER_PAGE
  return filteredStudents.value.slice(start, start + STUDENTS_PER_PAGE)
})

export const totalPages = computed(() => {
  return Math.ceil(filteredStudents.value.length / STUDENTS_PER_PAGE)
})

export function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
