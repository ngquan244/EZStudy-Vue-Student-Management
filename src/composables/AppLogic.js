// Imports
import {
  STORAGE_KEY, studentsPerPage, activeTab, showAddForm, showEditForm,
  editingStudent, selectedClass, students, currentPage, classList
} from './states'

import {
  filteredStudents, paginatedStudents, totalPages
} from './computedValues'

import {
  addStudent, editStudent, closeForms
} from './formHandlers'

import {
  handleAddStudent, handleEditStudent, deleteStudent
} from './studentHandlers'

import {
  goToPage
} from './pagination'

import {
  loadOnMount, reloadClassList
} from './lifecycle'

import {
  setupWatchers
} from './watchers'

import { onMounted } from 'vue'

export function useAppLogic() {
  function switchTab(tab) {
    activeTab.value = tab
    closeForms()
  }

  loadOnMount()
  setupWatchers()

  return {
    activeTab,
    showAddForm,
    showEditForm,
    editingStudent,
    selectedClass,
    students,
    currentPage,
    classList,
    filteredStudents,
    paginatedStudents,
    totalPages,
    goToPage,
    switchTab,
    addStudent,
    handleAddStudent,
    handleEditStudent,
    editStudent,
    deleteStudent,
    closeForms,
    reloadClassList
  }
}

// không thể viết dưới 50 dòng do cần liệt kê đủ các logics