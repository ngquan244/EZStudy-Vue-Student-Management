// Valid grade
export function isConflictGrade(grades, newName, originalName) {
  return grades.some(g => g !== originalName && g === newName)
}
