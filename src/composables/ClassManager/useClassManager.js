// src/composables/useClassManager.js
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default function useClassManager() {
  const router = useRouter()

  const CLASS_KEY = 'ezstudy-classes'
  const STUDENT_KEY = 'ezstudy-students'
  const GRADE_KEY = 'ezstudy-grades'

  const classes = ref([])
  const grades = ref([])
  const currentPage = ref(1)
  const rowsPerPage = 5

  onMounted(() => {
    try {
      const stored = localStorage.getItem(CLASS_KEY)
      classes.value = stored ? JSON.parse(stored) : []
    } catch {
      classes.value = []
    }

    let parsedGrades = []
    try {
      const storedGrades = localStorage.getItem(GRADE_KEY)
      parsedGrades = storedGrades ? JSON.parse(storedGrades) : []
    } catch {
      parsedGrades = []
    }

    if (parsedGrades.length === 0) {
      parsedGrades = ['Lớp 11', 'Lớp 12']
      localStorage.setItem(GRADE_KEY, JSON.stringify(parsedGrades))
    }

    grades.value = parsedGrades
  })

  const groupedAllRows = computed(() => {
    const rows = []

    grades.value.forEach(grade => {
      rows.push({ type: 'grade', name: grade })
      const inGrade = classes.value
        .filter(c => c.grade === grade)
        .sort((a, b) => a.name.localeCompare(b.name))
      inGrade.forEach(cls => rows.push({ type: 'class', name: cls.name, grade }))
    })

    const ungrouped = classes.value
      .filter(cls => !grades.value.includes(cls.grade || '') || !cls.grade)
      .sort((a, b) => a.name.localeCompare(b.name))

    if (ungrouped.length > 0) {
      rows.push({ type: 'grade', name: 'Chưa phân khối' })
      ungrouped.forEach(cls => rows.push({ type: 'class', name: cls.name, grade: '' }))
    }

    return rows
  })

  const totalPages = computed(() =>
    Math.ceil(groupedAllRows.value.length / rowsPerPage)
  )

  const paginatedRows = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage
    const sliced = groupedAllRows.value.slice(start, start + rowsPerPage)
    return sliced.map((item, i) => ({
      ...item,
      index: start + i + 1,
    }))
  })

  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  function edit(item) {
    if (item.type === 'grade' && item.name === 'Chưa phân khối') {
      alert('Không thể sửa "Chưa phân khối"')
      return
    }

    if (item.type === 'grade') {
      router.push(`/grades/edit/${encodeURIComponent(item.name)}`)
    } else {
      router.push(`/classes/edit/${encodeURIComponent(item.name)}`)
    }
  }

  function remove(item) {
    if (item.type === 'grade' && item.name === 'Chưa phân khối') {
      alert('Không thể xóa "Chưa phân khối"')
      return
    }

    if (!confirm('Bạn có chắc chắn muốn xóa?')) return

    if (item.type === 'grade') {
      const name = item.name
      classes.value = classes.value.map(c =>
        c.grade === name ? { ...c, grade: 'unassigned' } : c
      )
      grades.value = grades.value.filter(g => g !== name)
      localStorage.setItem(CLASS_KEY, JSON.stringify(classes.value))
      localStorage.setItem(GRADE_KEY, JSON.stringify(grades.value))
    } else {
      classes.value = classes.value.filter(
        c => c.name !== item.name || c.grade !== item.grade
      )

      const stored = localStorage.getItem(STUDENT_KEY)
      const students = stored ? JSON.parse(stored) : []
      students.forEach(s => {
        if (s.class === item.name) {
          s.class = 'Chưa phân lớp'
          s.grade = ''
        }
      })

      localStorage.setItem(CLASS_KEY, JSON.stringify(classes.value))
      localStorage.setItem(STUDENT_KEY, JSON.stringify(students))
    }

    currentPage.value = 1
  }

  return {
    paginatedRows,
    totalPages,
    currentPage,
    goToPage,
    edit,
    remove
  }
}
