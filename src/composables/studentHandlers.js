// Import states
import { students, showAddForm, showEditForm, currentPage } from './states'

// Handle after add student, edit student, delete student close form
export function handleAddStudent(student) {
  students.value.push(student)
  showAddForm.value = false
}

export function handleEditStudent(updatedStudent) {
  const index = students.value.findIndex(s => s.id === updatedStudent.id)
  if (index !== -1) {
    students.value.splice(index, 1, updatedStudent)
    showEditForm.value = false
  }
}

export function deleteStudent(id) {
  const confirmDelete = confirm('Bạn có chắc chắn muốn xóa học sinh này không?')
  if (!confirmDelete) return
  students.value = students.value.filter(student => student.id !== id)
  currentPage.value = 1
}
