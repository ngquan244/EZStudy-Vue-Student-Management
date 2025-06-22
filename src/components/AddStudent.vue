<script setup>
// Imports
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Reactive refs
const name = ref('')
const birthDate = ref('')
const selectedClass = ref('')
const classList = ref([])

// Today for compute age by today and birthdate
const today = new Date().toISOString().split('T')[0]

// Storage key for classes and students
const STORAGE_KEY = 'ezstudy-classes'
const STUDENT_KEY = 'ezstudy-students'

const router = useRouter()

// LifeCycle hook load data from storage
onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  try {
    classList.value = stored ? JSON.parse(stored) : []
    if (classList.value.length > 0) {
      selectedClass.value = classList.value[0].name
    }
  } catch {
    classList.value = []
  }
})

// Age calculator function use current year depends on today const and birthdate
function calculateAge(birthDateStr) {
  const birthYear = new Date(birthDateStr).getFullYear()
  const currentYear = new Date().getFullYear()
  return currentYear - birthYear
}

// Save new student function make sure that trimmed name < 30 digits
function saveStudent() {
  const trimmedName = name.value.trim()
  if (!trimmedName || !birthDate.value || !selectedClass.value) {
    alert('Vui lòng điền đầy đủ thông tin!')
    return
  }
  
  if (trimmedName.length > 30) {
      alert('Tên không được vượt quá 30 ký tự!')
      return
  }

  if (birthDate.value > today) {
    alert('Ngày sinh không thể lớn hơn hôm nay. Vui lòng nhập lại.')
    birthDate.value = ''
    return
  }
 
  const age = calculateAge(birthDate.value)

  const newStudent = {
    id: Date.now(),
    name: trimmedName,
    age: age.toString(),
    birthDate: birthDate.value,
    class: selectedClass.value
  }

  try {
    const stored = localStorage.getItem(STUDENT_KEY)
    const students = stored ? JSON.parse(stored) : []
    students.push(newStudent)
    localStorage.setItem(STUDENT_KEY, JSON.stringify(students))
  } catch {
    alert('Lỗi lưu học sinh!')
  }

  router.push('/students')
}
</script>

<template>
  <!-- Add Student Form includes name input date input and class selector-->
  <div class="form-container">
    <h2>Thêm Học Sinh</h2>
    <p>(Tạo lớp mới nếu chưa có lớp)</p>

    <div class="form-row">
      <label>Họ và tên:</label>
      <input v-model="name" type="text" placeholder="Nhập họ tên" />
    </div>

    <div class="form-row">
      <label>Ngày sinh:</label>
      <input v-model="birthDate" type="date" :max="today" />
    </div>

    <div class="form-row">
      <label>Chọn lớp:</label>
      <select v-model="selectedClass">
        <option
          v-for="cls in classList"
          :key="cls.name"
          :value="cls.name"
        >
          {{ cls.name }}
        </option>
      </select>
    </div>

    <div class="buttons">
      <button @click="saveStudent">Lưu</button>
      <button @click="router.push('/students')">Hủy</button>
    </div>
  </div>
</template>

<style scoped>
/* Styles for both light and dark mode */
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