// Store new student info
export function storeNewStudent(student, STUDENT_KEY) {
  try {
    const stored = localStorage.getItem(STUDENT_KEY)
    const students = stored ? JSON.parse(stored) : []
    students.push(student)
    localStorage.setItem(STUDENT_KEY, JSON.stringify(students))
    return true
  } catch {
    return false
  }
}
