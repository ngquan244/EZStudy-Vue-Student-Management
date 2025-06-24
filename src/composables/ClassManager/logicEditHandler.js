// Edit Grade
export function handleEdit(item, router) {
  if (item.type === 'grade' && item.name === 'Chưa phân khối') {
    alert('Không thể sửa "Chưa phân khối"')
    return
  }

  const encoded = encodeURIComponent(item.name)
  if (item.type === 'grade') {
    router.push(`/grades/edit/${encoded}`)
  } else {
    router.push(`/classes/edit/${encoded}`)
  }
}
