// src/composables/useEditStudent.js
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default function useEditStudent() {
  const route = useRoute()
  const router = useRouter()

  const studentId = Number(route.params.id)
  const student = ref(null)

  const name = ref('')
  const birthDate = ref('')
  const selectedClass = ref('')
  const classList = ref([])

  const today = new Date().toISOString().split('T')[0]

  onMounted(() => {
    // Load class list
    const classData = localStorage.getItem('ezstudy-classes')
    try {
      classList.value = classData ? JSON.parse(classData) : []
    } catch {
      classList.value = []
    }

    // Load student
    const studentData = localStorage.getItem('ezstudy-students')
    let students = []
    try {
      students = studentData ? JSON.parse(studentData) : []
    } catch {
      students = []
    }

    const found = students.find(s => s.id === studentId)
    if (!found) {
      alert('Không tìm thấy học sinh!')
      router.push('/students')
      return
    }

    student.value = found
    name.value = found.name
    birthDate.value = found.birthDate || ''
    selectedClass.value = found.class
  })

  function save() {
    const trimmedName = name.value.trim()

    if (!isValidStudent(trimmedName, birthDate.value, selectedClass.value)) return

    const updatedStudent = {
      ...student.value,
      name: trimmedName,
      birthDate: birthDate.value,
      age: calculateAge(birthDate.value).toString(),
      class: selectedClass.value
    }

    const students = loadStudents()
    const index = students.findIndex(s => s.id === studentId)

    if (index !== -1) {
      students[index] = updatedStudent
      localStorage.setItem('ezstudy-students', JSON.stringify(students))
    }

    router.push('/students')
  }

  function isValidStudent(name, birth, className) {
    if (!name || !birth || !className) {
      alert('Vui lòng điền đầy đủ thông tin!')
      return false
    }

    if (name.length > 30) {
      alert('Tên không được vượt quá 30 ký tự!')
      return false
    }

    if (birth > today) {
      alert('Ngày sinh không thể lớn hơn hôm nay.')
      birthDate.value = ''
      return false
    }

    return true
  }

  function calculateAge(birthDateStr) {
    const birthYear = new Date(birthDateStr).getFullYear()
    const currentYear = new Date().getFullYear()
    return currentYear - birthYear
  }

  function loadStudents() {
    const data = localStorage.getItem('ezstudy-students')
    try {
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  }

  function cancel() {
    router.push('/students')
  }

  return {
    student,
    name,
    birthDate,
    selectedClass,
    classList,
    today,
    save,
    cancel
  }
}
