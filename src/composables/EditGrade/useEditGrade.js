// src/composables/useEditGrade.js
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default function useEditGrade() {
  const route = useRoute()
  const router = useRouter()

  const GRADE_KEY = 'ezstudy-grades'
  const originalGrade = ref('')
  const newGradeName = ref('')

  // Load khối cần sửa
  onMounted(() => {
    const name = route.params.name
    originalGrade.value = name
    newGradeName.value = name

    const stored = localStorage.getItem(GRADE_KEY)
    if (!stored) {
      localStorage.setItem(GRADE_KEY, JSON.stringify(['Lớp 11', 'Lớp 12']))
    }
  })

  function save() {
    const trimmed = newGradeName.value.trim()

    if (!isValidGradeName(trimmed)) return

    const grades = loadGrades()

    if (isConflictGrade(grades, trimmed)) {
      alert('Tên khối đã tồn tại!')
      return
    }

    const index = grades.indexOf(originalGrade.value)
    if (index === -1) {
      alert('Không tìm thấy khối để cập nhật.')
      return
    }

    grades[index] = trimmed
    localStorage.setItem(GRADE_KEY, JSON.stringify(grades))

    updateClassGrade(originalGrade.value, trimmed)
    updateStudentGrade(originalGrade.value, trimmed)

    router.push('/classes')
  }

  function isValidGradeName(name) {
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

  function loadGrades() {
    const stored = localStorage.getItem(GRADE_KEY)
    try {
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  function isConflictGrade(grades, newName) {
    return grades.some(g => g !== originalGrade.value && g === newName)
  }

  function updateClassGrade(oldGrade, newGrade) {
    const stored = localStorage.getItem('ezstudy-classes')
    const classes = stored ? JSON.parse(stored) : []

    classes.forEach(cls => {
      if (cls.grade === oldGrade) {
        cls.grade = newGrade
      }
    })

    localStorage.setItem('ezstudy-classes', JSON.stringify(classes))
  }

  function updateStudentGrade(oldGrade, newGrade) {
    const stored = localStorage.getItem('ezstudy-students')
    const students = stored ? JSON.parse(stored) : []

    students.forEach(s => {
      if (s.grade === oldGrade) {
        s.grade = newGrade
      }
    })

    localStorage.setItem('ezstudy-students', JSON.stringify(students))
  }

  function cancel() {
    router.push('/classes')
  }

  return {
    newGradeName,
    save,
    cancel
  }
}
