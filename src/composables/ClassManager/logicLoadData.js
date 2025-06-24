// Load grade info
export function loadClassesAndGrades() {
  const CLASS_KEY = 'ezstudy-classes'
  const GRADE_KEY = 'ezstudy-grades'

  let loadedClasses = []
  let loadedGrades = []

  try {
    loadedClasses = JSON.parse(localStorage.getItem(CLASS_KEY)) || []
  } catch {}

  try {
    loadedGrades = JSON.parse(localStorage.getItem(GRADE_KEY)) || []
  } catch {}

  if (loadedGrades.length === 0) {
    loadedGrades = ['Lớp 11', 'Lớp 12']
    localStorage.setItem(GRADE_KEY, JSON.stringify(loadedGrades))
  }

  return { loadedClasses, loadedGrades }
}
