// Update grade for classes
export function updateClassGrade(oldGrade, newGrade) {
  const stored = localStorage.getItem('ezstudy-classes')
  const classes = stored ? JSON.parse(stored) : []

  classes.forEach(cls => {
    if (cls.grade === oldGrade) {
      cls.grade = newGrade
    }
  })

  localStorage.setItem('ezstudy-classes', JSON.stringify(classes))
}
