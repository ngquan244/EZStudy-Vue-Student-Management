<script setup>
// Imports
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Route for student id
const studentId = Number(route.params.id)
const student = ref(null)

// Reactive refs
const name = ref('')
const birthDate = ref('')
const selectedClass = ref('')

// Today for calculate age 
const today = new Date().toISOString().split('T')[0]

// Age calculator function use today and birthdate
function calculateAge(birthDateStr) {
  const birthYear = new Date(birthDateStr).getFullYear()
  const currentYear = new Date().getFullYear()
  return currentYear - birthYear
}

const classList = ref([])

// LifeCycle Hook load classes from storage - auto fill
onMounted(() => {
  const classData = localStorage.getItem('ezstudy-classes')
  try {
    classList.value = classData ? JSON.parse(classData) : []
  } catch {
    classList.value = []
  }

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

// Save function after edit student make sure that trimmedName <= 30 digits 
function save() {
  const trimmedName = name.value.trim()

  if (!isValidStudent(trimmedName, birthDate.value, selectedClass.value)) return

  const updatedStudent = buildUpdatedStudent(trimmedName, birthDate.value, selectedClass.value)

  const students = loadStudents()
  const index = students.findIndex(s => s.id === studentId)

  if (index !== -1) {
    students[index] = updatedStudent
    localStorage.setItem('ezstudy-students', JSON.stringify(students))
  }

  router.push('/students')
}

// Check valid name, birdthdate
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

// Return edited student
function buildUpdatedStudent(name, birth, className) {
  return {
    ...student.value,
    name,
    birthDate: birth,
    age: calculateAge(birth).toString(),
    class: className
  }
}

// Load student
function loadStudents() {
  const data = localStorage.getItem('ezstudy-students')
  try {
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}


</script>

<template>
  <!-- Edit Student form includes  name input date input and class selector-->
  <div class="form-container" v-if="student">
    <h2>Sửa Thông Tin Học Sinh</h2>

    <div class="form-row">
      <label>Họ và tên:</label>
      <input v-model="name" type="text" />
    </div>

    <div class="form-row">
      <label>Ngày sinh:</label>
      <input v-model="birthDate" type="date" :max="today" />
    </div>

    <div class="form-row">
      <label>Chọn lớp:</label>
      <select v-model="selectedClass">
        <option value="Chưa phân lớp">Chưa phân lớp</option>
        <option v-for="cls in classList" :key="cls.name" :value="cls.name">
          {{ cls.name }}
        </option>
      </select>
    </div>

    <div class="buttons">
      <button @click="save">Lưu</button>
      <button @click="router.push('/students')">Hủy</button>
    </div>
  </div>
</template>

<style scoped>
/* style for both light and dark mode */
.form-container {
  max-width: 400px;
  width: 350px;
  margin: 0 auto;
  padding: 20px;
  background: var(--form-bg);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid var(--form-border);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-row label {
  width: 90px;
  font-weight: bold;
  color: var(--label-color);
}

.form-row input,
.form-row select {
  flex: 1;
  padding: 8px;
  border: 1px solid var(--input-border);
  border-radius: 6px;
  box-sizing: border-box;
  background-color: var(--form-bg);
  color: var(--label-color);
}

.buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 12px;
}

button:first-of-type {
  background-color: var(--button-bg);
  color: var(--button-text);
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

button:first-of-type:hover {
  filter: brightness(1.1);
}
</style>