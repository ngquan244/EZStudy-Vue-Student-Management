// Search Toggle
import { showSearch, searchName, searchAge, currentPage } from './state'
import { applyLooseFilter } from './logicFilter'

export function toggleSearch() {
  showSearch.value = !showSearch.value
  if (!showSearch.value) {
    searchName.value = ''
    searchAge.value = ''
    currentPage.value = 1
    applyLooseFilter()
  }
}
