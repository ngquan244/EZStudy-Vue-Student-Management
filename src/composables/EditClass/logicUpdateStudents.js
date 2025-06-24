// Update after edit
export function updateStudentClass(oldName, newName, grade) {
  if (oldName === newName) return

  const storedStudents = localStorage.getItem('ezstudy-students')
  const students = storedStudents ? JSON.parse(storedStudents) : []

  students.forEach(s => {
    if (s.class === oldName) {
      s.class = newName
      s.grade = grade
    }
  })

  localStorage.setItem('ezstudy-students', JSON.stringify(students))
}
