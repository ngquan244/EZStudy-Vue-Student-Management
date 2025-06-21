// Add Class function
export default function useAddClass(name, grade) {
  const trimmed = name.trim()
  if (!trimmed) {
    alert('Vui lòng nhập tên lớp!')
    return null
  }

  return {
    name: trimmed,
    grade
  }
}
