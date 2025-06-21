// Imports
import { currentPage } from './states'
import { totalPages } from './computedValues'

// Pagination logic
export function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
