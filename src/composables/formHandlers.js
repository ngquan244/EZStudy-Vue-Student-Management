// Import states
import { showAddForm, showEditForm, editingStudent } from './states'

// Form states control
export function closeForms() {
  showAddForm.value = false
  showEditForm.value = false
}

export function addStudent() {
  showAddForm.value = true
  showEditForm.value = false
}

export function editStudent(student) {
  editingStudent.value = student
  showAddForm.value = false
  showEditForm.value = true
}
