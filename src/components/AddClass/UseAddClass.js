// Add Class function - trimmed and less than 20 digits
export default function useAddClass(name, grade) {
  const trimmed = name.trim()

  if (!trimmed) {
    alert('Vui lòng nhập tên lớp!')
    return null
  }

  if (trimmed.length > 20) {
    alert('Tên lớp không được vượt quá 20 ký tự!')
    return null
  }

  return {
    name: trimmed,
    grade
  }
}

