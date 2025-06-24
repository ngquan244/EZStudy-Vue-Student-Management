import { onMounted } from 'vue'
import { gradeList, selectedGrade } from './state'
import { GRADE_KEY } from './constants'

export function useInitGrades() {
  onMounted(() => {
    const storedGrades = localStorage.getItem(GRADE_KEY)
    try {
      gradeList.value = storedGrades ? JSON.parse(storedGrades) : ['Lớp 11', 'Lớp 12']
    } catch {
      gradeList.value = ['Lớp 11', 'Lớp 12']
    }

    if (gradeList.value.length === 0) {
      gradeList.value = ['Lớp 11', 'Lớp 12']
    }

    selectedGrade.value = gradeList.value[0]
  })
}
