import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

export function useStudentList() {
  const router = useRouter()

  const students = ref([])
  const classList = ref([])
  const selectedClass = ref('all')
  const currentPage = ref(1)
  const showSearch = ref(false)
  const searchName = ref('')
  const searchAge = ref('')
  const filteredStudents = ref([])
  const gradeList = ref([])

  const studentsPerPage = 5
  const STORAGE_STUDENTS = 'ezstudy-students'
  const STORAGE_CLASSES = 'ezstudy-classes'
  const GRADE_KEY = 'ezstudy-grades'

  onMounted(() => {
    const storedStudents = localStorage.getItem(STORAGE_STUDENTS)
    students.value = storedStudents ? JSON.parse(storedStudents) : []

    const storedClasses = localStorage.getItem(STORAGE_CLASSES)
    classList.value = storedClasses ? JSON.parse(storedClasses) : []

    const storedGrades = localStorage.getItem(GRADE_KEY)
    let parsedGrades = []

    try {
      parsedGrades = storedGrades ? JSON.parse(storedGrades) : []
    } catch {
      parsedGrades = []
    }

    if (parsedGrades.length === 0) {
      parsedGrades = ['Lớp 11', 'Lớp 12']
      localStorage.setItem(GRADE_KEY, JSON.stringify(parsedGrades))
    }

    const hasUnassignedGrade = classList.value.some(c => c.grade === 'unassigned')
    gradeList.value = [...parsedGrades]

    if (hasUnassignedGrade && !gradeList.value.includes('Chưa phân khối')) {
      gradeList.value.push('Chưa phân khối')
    }
  })

  const filteredByClass = computed(() => {
    const value = selectedClass.value

    if (value === 'all') return students.value
    if (value === 'unassigned') {
      return students.value.filter(s => s.class === 'Chưa phân lớp')
    }

    const [type, name] = value.split(':')

    if (type === 'class') {
      return students.value.filter(s => s.class === name)
    }

    if (type === 'grade') {
      let classNamesInGrade

      if (name === 'Chưa phân khối') {
        classNamesInGrade = classList.value
          .filter(c => c.grade === 'unassigned')
          .map(c => c.name)
      } else {
        classNamesInGrade = classList.value
          .filter(c => c.grade === name)
          .map(c => c.name)
      }

      return students.value.filter(s => classNamesInGrade.includes(s.class))
    }

    return []
  })

  function applyLooseFilter() {
    let result = filteredByClass.value
    const nameTrimmed = searchName.value.trim().toLowerCase()
    const ageTrimmed = searchAge.value.trim()

    if (nameTrimmed) {
      result = result.filter(s => s.name.toLowerCase().startsWith(nameTrimmed))
    }

    if (ageTrimmed) {
      result = result.filter(s => String(s.age).startsWith(ageTrimmed))
    }

    filteredStudents.value = result
  }

  function applyExactSearch() {
    const nameTrimmed = searchName.value.trim().toLowerCase()
    const ageTrimmed = searchAge.value.trim()

    filteredStudents.value = filteredByClass.value.filter(s => {
      const nameMatch = nameTrimmed ? s.name.toLowerCase() === nameTrimmed : true
      const ageMatch = ageTrimmed ? s.age === ageTrimmed : true
      return nameMatch && ageMatch
    })

    currentPage.value = 1
  }

  watch(filteredByClass, applyLooseFilter, { immediate: true })

  const paginatedStudents = computed(() => {
    const start = (currentPage.value - 1) * studentsPerPage
    return filteredStudents.value.slice(start, start + studentsPerPage)
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredStudents.value.length / studentsPerPage)
  })

  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  function deleteStudent(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa học sinh này không?')) return

    students.value = students.value.filter(s => s.id !== id)
    localStorage.setItem(STORAGE_STUDENTS, JSON.stringify(students.value))
    currentPage.value = 1
  }

  function toggleSearch() {
    showSearch.value = !showSearch.value
    if (!showSearch.value) {
      searchName.value = ''
      searchAge.value = ''
      currentPage.value = 1
      applyLooseFilter()
    }
  }

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
    studentsPerPage,
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
