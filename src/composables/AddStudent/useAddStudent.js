import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Import Child Logics
import { loadClassList } from './logicLoadClasses'
import { isValidStudentInput } from './logicValidateStudent'
import { buildNewStudent } from './logicBuildStudent'
import { storeNewStudent } from './logicStoreStudent'

export default function useAddStudent() {
  const STORAGE_KEY = 'ezstudy-classes'
  const STUDENT_KEY = 'ezstudy-students'

  const router = useRouter()

  const name = ref('')
  const birthDate = ref('')
  const selectedClass = ref('')
  const classList = ref([])

  const today = new Date().toISOString().split('T')[0]
  
  // Lifecycle Hook
  onMounted(() => {
    loadClassList(STORAGE_KEY, classList, selectedClass)
  })

  function saveStudent() {
    const trimmedName = name.value.trim()
    if (!isValidStudentInput(trimmedName, birthDate.value, selectedClass.value, today, birthDate)) return

    const newStudent = buildNewStudent(trimmedName, birthDate.value, selectedClass.value)
    if (!storeNewStudent(newStudent, STUDENT_KEY)) {
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
