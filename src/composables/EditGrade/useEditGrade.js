import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { loadGrades } from './logicLoadGrades'
import { isValidGradeName } from './logicValidateGrade'
import { isConflictGrade } from './logicCheckGradeConflict'
import { updateClassGrade } from './logicUpdateClassGrade'
import { updateStudentGrade } from './logicUpdateStudentGrade'

export default function useEditGrade() {
  const GRADE_KEY = 'ezstudy-grades'
  const route = useRoute()
  const router = useRouter()

  const originalGrade = ref('')
  const newGradeName = ref('')

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
    if (isConflictGrade(grades, trimmed, originalGrade.value)) {
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

  function cancel() {
    router.push('/classes')
  }

  return {
    newGradeName,
    save,
    cancel
  }
}
