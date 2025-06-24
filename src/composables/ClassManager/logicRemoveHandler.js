export function handleRemove(item, classes, grades) {
  const CLASS_KEY = 'ezstudy-classes'
  const STUDENT_KEY = 'ezstudy-students'
  const GRADE_KEY = 'ezstudy-grades'
  
  // Advoid remove Chưa phân khối
  if (item.type === 'grade' && item.name === 'Chưa phân khối') {
    alert('Không thể xóa "Chưa phân khối"')
    return { updatedClasses: classes, updatedGrades: grades }
  }

  if (!confirm('Bạn có chắc chắn muốn xóa?')) {
    return { updatedClasses: classes, updatedGrades: grades }
  }

  if (item.type === 'grade') {
    const name = item.name
    const updatedClasses = classes.map(c =>
      c.grade === name ? { ...c, grade: 'unassigned' } : c
    )
    const updatedGrades = grades.filter(g => g !== name)

    localStorage.setItem(CLASS_KEY, JSON.stringify(updatedClasses))
    localStorage.setItem(GRADE_KEY, JSON.stringify(updatedGrades))

    return { updatedClasses, updatedGrades }
  }

  // type === 'class'
  const updatedClasses = classes.filter(
    c => c.name !== item.name || c.grade !== item.grade
  )

  let students = []
  try {
    students = JSON.parse(localStorage.getItem(STUDENT_KEY)) || []
  } catch {}

  students.forEach(s => {
    if (s.class === item.name) {
      s.class = 'Chưa phân lớp'
      s.grade = ''
    }
  })

  localStorage.setItem(CLASS_KEY, JSON.stringify(updatedClasses))
  localStorage.setItem(STUDENT_KEY, JSON.stringify(students))

  return { updatedClasses, updatedGrades: grades }
}
