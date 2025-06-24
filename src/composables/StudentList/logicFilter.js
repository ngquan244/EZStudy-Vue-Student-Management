import { searchName, searchAge, filteredStudents, currentPage } from './state'
import { filteredByClass } from './computedFilter'

// Prefix filter
export function applyLooseFilter() {
  let result = filteredByClass.value
  const nameTrimmed = searchName.value.trim().toLowerCase()
  const ageTrimmed = searchAge.value.trim()

  if (nameTrimmed) {
    result = result.filter(s => s.name.toLowerCase().startsWith(nameTrimmed))
  }

  if (ageTrimmed) {
    result = result.filter(s => String(s.age).startsWith(ageTrimmed))
  }

  filteredStudents.value = result
}

// Exact filter
export function applyExactSearch() {
  const nameTrimmed = searchName.value.trim().toLowerCase()
  const ageTrimmed = searchAge.value.trim()

  filteredStudents.value = filteredByClass.value.filter(s => {
    const nameMatch = nameTrimmed ? s.name.toLowerCase() === nameTrimmed : true
    const ageMatch = ageTrimmed ? s.age === ageTrimmed : true
    return nameMatch && ageMatch
  })

  currentPage.value = 1
}
