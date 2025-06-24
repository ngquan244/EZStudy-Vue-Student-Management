// Group classes by grade
export function groupAllRows(classes, grades) {
  const rows = []

  grades.forEach(grade => {
    rows.push({ type: 'grade', name: grade })
    classes
      .filter(c => c.grade === grade)
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(cls => rows.push({ type: 'class', name: cls.name, grade }))
  })

  const ungrouped = classes
    .filter(c => !grades.includes(c.grade || '') || !c.grade)
    .sort((a, b) => a.name.localeCompare(b.name))

  if (ungrouped.length) {
    rows.push({ type: 'grade', name: 'Chưa phân khối' })
    ungrouped.forEach(cls => rows.push({ type: 'class', name: cls.name, grade: '' }))
  }

  return rows
}
