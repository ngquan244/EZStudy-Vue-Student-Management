import { useRouter } from 'vue-router'
import { watch } from 'vue'

import { students, classList, gradeList, selectedClass, currentPage,
         showSearch, searchName, searchAge, filteredStudents } from './state'

import { STUDENTS_PER_PAGE } from './constants'
import { useStudentListInit } from './lifecycle'
import { filteredByClass } from './computedFilter'
import { applyLooseFilter, applyExactSearch } from './logicFilter'
import { paginatedStudents, totalPages, goToPage } from './logicPagination'
import { deleteStudent } from './logicDelete'
import { toggleSearch } from './logicSearchToggle'

export function useStudentList() {
  const router = useRouter()

  useStudentListInit()
  watch(filteredByClass, applyLooseFilter, { immediate: true })

  return {
    router,
    students,
    classList,
    gradeList,
    selectedClass,
    currentPage,
    showSearch,
    searchName,
    searchAge,
    studentsPerPage: STUDENTS_PER_PAGE,
    filteredStudents,
    paginatedStudents,
    totalPages,
    applyLooseFilter,
    applyExactSearch,
    goToPage,
    deleteStudent,
    toggleSearch
  }
}
