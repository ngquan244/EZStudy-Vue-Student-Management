// Update grade for students
export function updateStudentGrade(oldGrade, newGrade) {
  const stored = localStorage.getItem('ezstudy-students')
  const students = stored ? JSON.parse(stored) : []

  students.forEach(s => {
    if (s.grade === oldGrade) {
      s.grade = newGrade
    }
  })

  localStorage.setItem('ezstudy-students', JSON.stringify(students))
}
