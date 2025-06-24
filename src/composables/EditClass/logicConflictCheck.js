// Valid name
export function checkClassConflict(trimmed, editingName, STORAGE_KEY) {
  const stored = localStorage.getItem(STORAGE_KEY)
  const classes = stored ? JSON.parse(stored) : []

  const conflict = classes.some(
    c => c.name.toLowerCase() !== editingName.toLowerCase() &&
         c.name.toLowerCase() === trimmed.toLowerCase()
  )

  if (conflict) {
    alert('Tên lớp đã tồn tại!')
    return true
  }

  return false
}
