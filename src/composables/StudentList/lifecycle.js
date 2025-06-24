import { onMounted } from 'vue'
import { students, classList, gradeList } from './state'
import { STORAGE_STUDENTS, STORAGE_CLASSES, GRADE_KEY } from './constants'

// Handle Student, Class
export function useStudentListInit() {
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
}
