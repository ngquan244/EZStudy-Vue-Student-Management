// src/composables/useEditClass.js
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default function useEditClass() {
  const STORAGE_KEY = 'ezstudy-classes'
  const GRADE_KEY = 'ezstudy-grades'

  const className = ref('')
  const selectedGrade = ref('Lớp 11')
  const gradeList = ref([])
  const isCustomGrade = ref(false)
  const customGrade = ref('')
  const isEditingUnassigned = ref(false)

  const route = useRoute()
  const router = useRouter()

  onMounted(() => {
    const nameToEdit = route.params.name
    const stored = localStorage.getItem(STORAGE_KEY)
    try {
      const classes = stored ? JSON.parse(stored) : []
      const found = classes.find(c => c.name === nameToEdit)
      if (found) {
        className.value = found.name
        selectedGrade.value = found.grade

        const storedGrades = localStorage.getItem(GRADE_KEY)
        try {
          gradeList.value = storedGrades ? JSON.parse(storedGrades) : ['Lớp 11', 'Lớp 12']
        } catch {
          gradeList.value = ['Lớp 11', 'Lớp 12']
        }

        if (found.grade === 'unassigned') {
          isEditingUnassigned.value = true
          selectedGrade.value = 'Chưa phân khối'
        } else if (!gradeList.value.includes(found.grade)) {
          gradeList.value.push(found.grade)
        }
      } else {
        alert('Không tìm thấy lớp cần sửa')
        router.push('/classes')
      }
    } catch {
      alert('Dữ liệu lớp bị lỗi')
      router.push('/classes')
    }
  })

  function save() {
    const trimmed = className.value.trim()
    if (!trimmed) {
      alert('Vui lòng nhập tên lớp!')
      return
    }

    if (trimmed.length > 20) {
      alert('Tên lớp không được vượt quá 20 ký tự!')
      return
    }

    if (!handleCustomGrade()) return
    if (handleConflict(trimmed)) return

    const gradeToSave = selectedGrade.value === 'Chưa phân khối' ? 'unassigned' : selectedGrade.value

    const stored = localStorage.getItem(STORAGE_KEY)
    const classes = stored ? JSON.parse(stored) : []

    const index = classes.findIndex(c => c.name === route.params.name)
    if (index !== -1) {
      const oldName = route.params.name
      const newName = trimmed

      classes[index] = {
        name: newName,
        grade: gradeToSave
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(classes))
      updateStudentClass(oldName, newName, gradeToSave)

      router.push('/classes')
    } else {
      alert('Không tìm thấy lớp để cập nhật.')
    }
  }

  function handleCustomGrade() {
    if (!isCustomGrade.value) return true

    const custom = customGrade.value.trim()
    if (!custom) {
      alert('Vui lòng nhập tên khối mới!')
      return false
    }

    selectedGrade.value = custom

    const storedGrades = localStorage.getItem(GRADE_KEY)
    let grades = []
    try {
      grades = storedGrades ? JSON.parse(storedGrades) : []
    } catch {
      grades = []
    }

    if (!grades.includes(custom)) {
      grades.push(custom)
      localStorage.setItem(GRADE_KEY, JSON.stringify(grades))
    }

    return true
  }

  function handleConflict(trimmed) {
    const stored = localStorage.getItem(STORAGE_KEY)
    const classes = stored ? JSON.parse(stored) : []

    const conflict = classes.some(
      c => c.name.toLowerCase() !== route.params.name.toLowerCase() &&
           c.name.toLowerCase() === trimmed.toLowerCase()
    )

    if (conflict) {
      alert('Tên lớp đã tồn tại!')
      return true
    }

    return false
  }

  function updateStudentClass(oldName, newName, gradeToSave) {
    if (oldName === newName) return

    const storedStudents = localStorage.getItem('ezstudy-students')
    const students = storedStudents ? JSON.parse(storedStudents) : []

    students.forEach(s => {
      if (s.class === oldName) {
        s.class = newName
        s.grade = gradeToSave
      }
    })

    localStorage.setItem('ezstudy-students', JSON.stringify(students))
  }

  function onGradeChange() {
    isCustomGrade.value = selectedGrade.value === 'new-grade'
  }

  return {
    className,
    selectedGrade,
    gradeList,
    isCustomGrade,
    customGrade,
    isEditingUnassigned,
    save,
    onGradeChange,
    router
  }
}
