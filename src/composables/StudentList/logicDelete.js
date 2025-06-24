import { students, currentPage } from './state'
import { STORAGE_STUDENTS } from './constants'

// delete function
export function deleteStudent(id) {
  if (!confirm('Bạn có chắc chắn muốn xóa học sinh này không?')) return

  students.value = students.value.filter(s => s.id !== id)
  localStorage.setItem(STORAGE_STUDENTS, JSON.stringify(students.value))
  currentPage.value = 1
}
