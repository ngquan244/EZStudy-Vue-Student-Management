import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { student, name, birthDate, selectedClass, classList } from './states'
import { TODAY } from './constants'

import { loadClassList } from './logicLoadClasses'
import { loadStudentById } from './logicLoadStudent'
import { isValidStudentInput } from './logicValidateStudent'
import { calculateAge } from './logicCalculateAge'
import { updateStudent } from './logicSaveStudent'

export default function useEditStudent() {
  const route = useRoute()
  const router = useRouter()
  const studentId = Number(route.params.id)

  onMounted(() => {
    loadClassList(classList)

    const found = loadStudentById(studentId)
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
    if (!isValidStudentInput(trimmedName, birthDate.value, selectedClass.value, TODAY, birthDate)) return

    const updated = {
      ...student.value,
      name: trimmedName,
      birthDate: birthDate.value,
      age: calculateAge(birthDate.value).toString(),
      class: selectedClass.value
    }

    updateStudent(studentId, updated)
    router.push('/students')
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
    today: TODAY,
    save,
    cancel
  }
}
