// Load grade info
export function loadGrades() {
  try {
    const stored = localStorage.getItem('ezstudy-grades')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}
