// Load Student by student ID
export function loadStudentById(id) {
  try {
    const data = localStorage.getItem('ezstudy-students')
    const students = data ? JSON.parse(data) : []
    return students.find(s => s.id === id)
  } catch {
    return null
  }
}
