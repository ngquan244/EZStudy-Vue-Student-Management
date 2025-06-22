import { ref, watch } from 'vue'

// Edit Student functions
export default function useEditStudent(props, emit) {
  // reactive states
  const name = ref('')
  const birthDate = ref('')
  const selectedClass = ref('11A')
  // Today to calculate age 
  const today = new Date().toISOString().split('T')[0]

  // watcher watch for students change + auto fill
  watch(() => props.student, (newVal) => {
    if (newVal) {
      name.value = newVal.name
      selectedClass.value = newVal.class
      birthDate.value = newVal.birthDate || ''
    }
  }, { immediate: true })
 
  // calculate age by today and birthdate
  function calculateAge(birthDateStr) {
    const birthYear = new Date(birthDateStr).getFullYear()
    const currentYear = new Date().getFullYear()
    return currentYear - birthYear
  }
  
  // Save edited student, same requirements as AddStudent
  function saveEdits() {
    const trimmed = name.value.trim()

    if (!name.value || !birthDate.value || !selectedClass.value) {
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

    const age = calculateAge(birthDate.value)

    emit('edit-student', {
      ...props.student,
      name: name.value,
      age: age.toString(),
      birthDate: birthDate.value,
      class: selectedClass.value
    })

    emit('close')
  }

  return {
    name, birthDate,
    selectedClass,
    today,
    saveEdits
  }
}

// không tính comments chỉ khoảng hơn 50 dòng