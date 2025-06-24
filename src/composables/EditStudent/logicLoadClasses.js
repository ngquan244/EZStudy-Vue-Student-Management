// Load classes info
export function loadClassList(classListRef) {
  try {
    const stored = localStorage.getItem('ezstudy-classes')
    classListRef.value = stored ? JSON.parse(stored) : []
  } catch {
    classListRef.value = []
  }
}
