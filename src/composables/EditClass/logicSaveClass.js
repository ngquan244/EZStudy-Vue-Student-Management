import { handleCustomGrade } from './logicCustomGrade'
import { checkClassConflict } from './logicConflictCheck'
import { updateStudentClass } from './logicUpdateStudents'

// Save class after edit
export function saveClass({
  route,
  router,
  STORAGE_KEY,
  GRADE_KEY,
  className,
  selectedGrade,
  customGrade,
  gradeList
}) {
  const trimmed = className.value.trim()

  if (!trimmed) return alert('Vui lòng nhập tên lớp!')
  if (trimmed.length > 20) return alert('Tên lớp không được vượt quá 20 ký tự!')

  if (!handleCustomGrade(selectedGrade, customGrade, gradeList, GRADE_KEY)) return
  if (checkClassConflict(trimmed, route.params.name, STORAGE_KEY)) return

  const gradeToSave = selectedGrade.value === 'Chưa phân khối' ? 'unassigned' : selectedGrade.value
  const stored = localStorage.getItem(STORAGE_KEY)
  const classes = stored ? JSON.parse(stored) : []

  const index = classes.findIndex(c => c.name === route.params.name)
  if (index !== -1) {
    const oldName = route.params.name
    const newName = trimmed

    classes[index] = { name: newName, grade: gradeToSave }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(classes))
    updateStudentClass(oldName, newName, gradeToSave)

    router.push('/classes')
  } else {
    alert('Không tìm thấy lớp để cập nhật.')
  }
}
