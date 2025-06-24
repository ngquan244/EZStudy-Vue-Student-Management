import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const STORAGE_KEY = 'ezstudy-classes'
const STUDENT_KEY = 'ezstudy-students'

export default function useAddStudent() {
  const router = useRouter()

  const name = ref('')
  const birthDate = ref('')
  const selectedClass = ref('')
  const classList = ref([])

  const today = new Date().toISOString().split('T')[0]

  onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    try {
      classList.value = stored ? JSON.parse(stored) : []
      selectedClass.value = 'Chưa phân lớp'
    } catch {
      classList.value = []
      selectedClass.value = 'Chưa phân lớp'
    }
  })

  function calculateAge(birthDateStr) {
    const birthYear = new Date(birthDateStr).getFullYear()
    const currentYear = new Date().getFullYear()
    return currentYear - birthYear
  }

  function isValidStudentInput(name, birth, className) {
    if (!name || !birth || !className) {
      alert('Vui lòng điền đầy đủ thông tin!')
      return false
    }

    if (name.length > 30) {
      alert('Tên không được vượt quá 30 ký tự!')
      return false
    }

    if (birth > today) {
      alert('Ngày sinh không thể lớn hơn hôm nay. Vui lòng nhập lại.')
      birthDate.value = ''
      return false
    }

    return true
  }

  function buildNewStudent(name, birth, className) {
    return {
      id: Date.now(),
      name,
      birthDate: birth,
      age: calculateAge(birth).toString(),
      class: className
    }
  }

  function storeNewStudent(student) {
    try {
      const stored = localStorage.getItem(STUDENT_KEY)
      const students = stored ? JSON.parse(stored) : []
      students.push(student)
      localStorage.setItem(STUDENT_KEY, JSON.stringify(students))
      return true
    } catch {
      return false
    }
  }

  function saveStudent() {
    const trimmedName = name.value.trim()
    if (!isValidStudentInput(trimmedName, birthDate.value, selectedClass.value)) return

    const newStudent = buildNewStudent(trimmedName, birthDate.value, selectedClass.value)

    if (!storeNewStudent(newStudent)) {
      alert('Lỗi lưu học sinh!')
      return
    }

    router.push('/students')
  }

  return {
    name,
    birthDate,
    selectedClass,
    classList,
    today,
    saveStudent
  }
}
