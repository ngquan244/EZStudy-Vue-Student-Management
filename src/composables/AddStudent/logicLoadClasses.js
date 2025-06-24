// Load Classes from storage
export function loadClassList(STORAGE_KEY, classList, selectedClass) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    classList.value = stored ? JSON.parse(stored) : []
    selectedClass.value = 'Chưa phân lớp'
  } catch {
    classList.value = []
    selectedClass.value = 'Chưa phân lớp'
  }
}
