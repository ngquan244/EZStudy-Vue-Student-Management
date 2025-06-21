// Export class actions
export function useClassActions(state) {
  function goToPage(page) {
    if (page >= 1 && page <= state.totalPages.value)
      state.currentPage.value = page
  }

  // Add Class function - avoid '11' and '12' - that causes filtering probs
  function addClass(newClass) {
    const forbidden = ['11', '12']
    if (forbidden.includes(newClass.name.trim()))
      return alert('Tên lớp không được đặt là "11" hoặc "12".')
    if (state.classes.value.some(c => c.name === newClass.name))
      return alert('Lớp đã tồn tại!')
    state.classes.value.push(newClass)
  }
  // Delete class by item, edit class by item and update class function after edit
  function deleteClass(item) {
    if (!confirm('Bạn có chắc chắn muốn xóa lớp này?')) return
    const idx = state.classes.value.findIndex(c =>
      c.name === item.name && c.grade === item.grade
    )
    if (idx !== -1) {
      state.classes.value.splice(idx, 1)
      state.currentPage.value = 1
    }
  }

  function editClass(item) {
    const idx = state.classes.value.findIndex(c =>
      c.name.trim().toLowerCase() === item.name.trim().toLowerCase() &&
      c.grade.trim().toLowerCase() === item.grade.trim().toLowerCase()
    )
    if (idx !== -1) {
      state.editingIndex.value = idx
      state.editingClass.value = { ...state.classes.value[idx] }
      state.showEditForm.value = true
    }
  }

  function updateClass(updated) {
    if (state.editingIndex.value !== -1) {
      state.classes.value.splice(state.editingIndex.value, 1, updated)
      state.showEditForm.value = false
    }
  }

  return { goToPage, addClass, deleteClass, editClass, updateClass }
}
