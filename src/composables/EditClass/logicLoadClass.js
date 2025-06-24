// Load Edited data
export function loadEditClassData({
  route,
  router,
  STORAGE_KEY,
  GRADE_KEY,
  className,
  selectedGrade,
  gradeList,
  isEditingUnassigned
}) {
  const nameToEdit = route.params.name
  const stored = localStorage.getItem(STORAGE_KEY)

  try {
    const classes = stored ? JSON.parse(stored) : []
    const found = classes.find(c => c.name === nameToEdit)
    if (!found) throw new Error()

    className.value = found.name
    selectedGrade.value = found.grade

    const storedGrades = localStorage.getItem(GRADE_KEY)
    try {
      gradeList.value = storedGrades ? JSON.parse(storedGrades) : ['Lớp 11', 'Lớp 12']
    } catch {
      gradeList.value = ['Lớp 11', 'Lớp 12']
    }

    if (found.grade === 'unassigned') {
      isEditingUnassigned.value = true
      selectedGrade.value = 'Chưa phân khối'
    } else if (!gradeList.value.includes(found.grade)) {
      gradeList.value.push(found.grade)
    }
  } catch {
    alert('Không tìm thấy lớp cần sửa hoặc dữ liệu bị lỗi')
    router.push('/classes')
  }
}
