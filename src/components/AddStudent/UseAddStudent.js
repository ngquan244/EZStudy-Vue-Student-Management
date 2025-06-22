import { ref } from 'vue'

export default function useAddStudent(emit) {
  const name = ref('')
  const birthDate = ref('')
  const selectedClass = ref('11A')
  const today = new Date().toISOString().split('T')[0]

  // Caculate Age by current year and birth date
  function calculateAge(birthDateStr) {
    const birthYear = new Date(birthDateStr).getFullYear()
    const currentYear = new Date().getFullYear()
    return currentYear - birthYear
  }

  // Remove first and last space, make sure that birthdate < today, name < 30 digits
  function saveStudent() {
    const trimmed = name.value.trim()
  
    if (!trimmed || !birthDate.value || !selectedClass.value) {
      alert('Vui lòng điền đầy đủ thông tin!')
      return
    }

    if (trimmed.length > 30) {
      alert('Tên không được vượt quá 30 ký tự!')
      return
    }

    if (birthDate.value > today) {
      alert('Ngày sinh không thể lớn hơn hôm nay. Vui lòng nhập lại.')
      birthDate.value = ''
      return
    }

    const newStudent = {
      id: Date.now(),
      name: trimmed,
      age: calculateAge(birthDate.value).toString(),
      birthDate: birthDate.value,
      class: selectedClass.value
    }

  emit('add-student', newStudent)
  emit('close')
}

  return {
    name,
    birthDate,
    selectedClass,
    today,
    saveStudent
  }
}
