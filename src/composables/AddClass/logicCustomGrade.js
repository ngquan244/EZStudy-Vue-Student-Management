import { selectedGrade, gradeList, customGrade } from './state'
import { GRADE_KEY } from './constants'

export function handleCustomGrade() {
  if (selectedGrade.value !== 'new-grade') return true

  const trimmedGrade = customGrade.value.trim()
  if (!trimmedGrade) {
    alert('Vui lòng nhập tên khối!')
    return false
  }

  const conflict = gradeList.value.some(
    g => g.toLowerCase() === trimmedGrade.toLowerCase()
  )
  if (conflict) {
    alert('Tên khối đã tồn tại!')
    return false
  }

  selectedGrade.value = trimmedGrade
  gradeList.value.push(trimmedGrade)
  localStorage.setItem(GRADE_KEY, JSON.stringify(gradeList.value))
  return true
}
