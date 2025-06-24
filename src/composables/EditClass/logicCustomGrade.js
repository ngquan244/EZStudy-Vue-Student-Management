// Custom new grade
export function handleCustomGrade(selectedGrade, customGrade, gradeList, GRADE_KEY) {
  if (selectedGrade.value !== 'new-grade') return true

  const trimmed = customGrade.value.trim()
  if (!trimmed) {
    alert('Vui lòng nhập tên khối mới!')
    return false
  }

  selectedGrade.value = trimmed

  if (!gradeList.value.includes(trimmed)) {
    gradeList.value.push(trimmed)
    localStorage.setItem(GRADE_KEY, JSON.stringify(gradeList.value))
  }

  return true
}
