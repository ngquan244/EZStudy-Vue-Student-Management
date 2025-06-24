import { CLASS_KEY } from './constants'

export function checkClassConflict(trimmedName) {
  const stored = localStorage.getItem(CLASS_KEY)
  let classes = []
  try {
    classes = stored ? JSON.parse(stored) : []
  } catch {
    classes = []
  }

  const conflict = classes.some(
    c => c.name.toLowerCase() === trimmedName.toLowerCase()
  )

  if (conflict) {
    alert('Tên lớp đã tồn tại!')
    return true
  }

  return false
}
