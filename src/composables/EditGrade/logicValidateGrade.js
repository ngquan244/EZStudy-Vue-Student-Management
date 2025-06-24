// Check valid grade name
export function isValidGradeName(name) {
  if (!name) {
    alert('Vui lòng nhập tên khối!')
    return false
  }

  if (name.length > 20) {
    alert('Tên khối không được vượt quá 20 ký tự!')
    return false
  }

  if (name === 'unassigned') {
    alert('Không thể sử dụng tên khối này!')
    return false
  }

  return true
}
