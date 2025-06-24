// Save Student after edit
export function updateStudent(id, updatedStudent) {
  try {
    const data = localStorage.getItem('ezstudy-students')
    const students = data ? JSON.parse(data) : []
    const index = students.findIndex(s => s.id === id)
    if (index !== -1) {
      students[index] = updatedStudent
      localStorage.setItem('ezstudy-students', JSON.stringify(students))
    }
  } catch {
    alert('Lỗi cập nhật học sinh!')
  }
}
