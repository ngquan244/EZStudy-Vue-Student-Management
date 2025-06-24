<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Storage key
const GRADE_KEY = 'ezstudy-grades'

const route = useRoute()
const router = useRouter()

const originalGrade = ref('')
const newGradeName = ref('')

// Lifecycle Hook auto fill grade info
onMounted(() => {
  const name = route.params.name
  originalGrade.value = name
  newGradeName.value = name

  const stored = localStorage.getItem(GRADE_KEY)
  if (!stored) {
    localStorage.setItem(GRADE_KEY, JSON.stringify(['Lớp 11', 'Lớp 12']))
  }
})

// Save function after edit
function save() {
  const trimmed = newGradeName.value.trim()

  if (!isValidGradeName(trimmed)) return

  const grades = loadGrades()

  if (isConflictGrade(grades, trimmed)) {
    alert('Tên khối đã tồn tại!')
    return
  }

  const index = grades.indexOf(originalGrade.value)
  if (index === -1) {
    alert('Không tìm thấy khối để cập nhật.')
    return
  }

  grades[index] = trimmed
  localStorage.setItem(GRADE_KEY, JSON.stringify(grades))

  updateClassGrade(originalGrade.value, trimmed)
  updateStudentGrade(originalGrade.value, trimmed)

  router.push('/classes')
}

// Check valid name
function isValidGradeName(name) {
  if (!name) {
    alert('Vui lòng nhập tên khối!')
    return false
  }

  if (name.length > 20) {
    alert('Tên khối không được vượt quá 20 ký tự!')
    return false
  }

  if (name === 'unassigned') {
    alert('Không thể sử dụng tên khối này!')
    return false
  }

  return true
}

// Load Grade 
function loadGrades() {
  const stored = localStorage.getItem(GRADE_KEY)
  try {
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

// check conflict
function isConflictGrade(grades, newName) {
  return grades.some(g => g !== originalGrade.value && g === newName)
}

// Update to class after edit
function updateClassGrade(oldGrade, newGrade) {
  const stored = localStorage.getItem('ezstudy-classes')
  const classes = stored ? JSON.parse(stored) : []

  classes.forEach(cls => {
    if (cls.grade === oldGrade) {
      cls.grade = newGrade
    }
  })

  localStorage.setItem('ezstudy-classes', JSON.stringify(classes))
}

// Update to student after edit
function updateStudentGrade(oldGrade, newGrade) {
  const stored = localStorage.getItem('ezstudy-students')
  const students = stored ? JSON.parse(stored) : []

  students.forEach(s => {
    if (s.grade === oldGrade) {
      s.grade = newGrade
    }
  })

  localStorage.setItem('ezstudy-students', JSON.stringify(students))
}


</script>

<template>
  <!-- Edit Grade interface include name input -->
  <div class="form-container">
    <h2>Sửa Khối</h2>

    <div class="form-row">
      <label>Tên khối:</label>
      <input v-model="newGradeName" type="text" />
    </div>

    <div class="buttons">
      <button @click="save">Lưu</button>
      <button @click="router.push('/classes')">Hủy</button>
    </div>
  </div>
</template>

<style scoped>
/* Style for both light and dark mode */
.form-container {
  max-width: 400px;
  width: 350px;
  margin: 0 auto;
  padding: 20px;
  background: var(--form-bg);
  border: 1px solid var(--form-border);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-row label {
  width: 80px;
  font-weight: bold;
  color: var(--label-color);
}

.form-row input {
  flex: 1;
  padding: 8px;
  border: 1px solid var(--input-border);
  border-radius: 6px;
  background-color: var(--form-bg);
  color: var(--label-color);
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
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
