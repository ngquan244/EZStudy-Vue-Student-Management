// Check valid info
export function isValidStudentInput(name, birth, className, today, birthDateRef) {
  if (!name || !birth || !className) {
    alert('Vui lòng điền đầy đủ thông tin!')
    return false
  }

  if (name.length > 30) {
    alert('Tên không được vượt quá 30 ký tự!')
    return false
  }

  if (birth > today) {
    alert('Ngày sinh không thể lớn hơn hôm nay.')
    birthDateRef.value = ''
    return false
  }

  return true
}
