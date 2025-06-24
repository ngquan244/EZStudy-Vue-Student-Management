<script setup>
// Imports
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive refs
const className = ref('')
const selectedGrade = ref('Lớp 11')
const gradeList = ref([])
const isCustomGrade = ref(false)
const customGrade = ref('')

// Storage key for grades
const GRADE_KEY = 'ezstudy-grades'

// LifeCycle Hook load data from Storage
onMounted(() => {
  const storedGrades = localStorage.getItem(GRADE_KEY)
  try {
    gradeList.value = storedGrades ? JSON.parse(storedGrades) : ['Lớp 11', 'Lớp 12']
  } catch {
    gradeList.value = ['Lớp 11', 'Lớp 12']
  }

  // Default Grade 11 and 12 
  if (gradeList.value.length === 0) {
    gradeList.value = ['Lớp 11', 'Lớp 12']
  }

  selectedGrade.value = gradeList.value[0]
})

// Save function, make sure that trimmed name != '' and < 20 digits, handle custom grade
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
  if (checkClassConflict(trimmed)) return

  const stored = localStorage.getItem('ezstudy-classes')
  let classes = []
  try {
    classes = stored ? JSON.parse(stored) : []
  } catch {
    classes = []
  }

  const newClass = {
    name: trimmed,
    grade: selectedGrade.value
  }

  classes.push(newClass)
  localStorage.setItem('ezstudy-classes', JSON.stringify(classes))
  router.push('/classes')
}

// Handle New Grade 
function handleCustomGrade() {
  if (selectedGrade.value !== 'new-grade') return true

  const trimmedGrade = customGrade.value.trim()
  if (!trimmedGrade) {
    alert('Vui lòng nhập tên khối!')
    return false
  }

  // Advoid conflict
  const conflict = gradeList.value.some(
    g => g.toLowerCase() === trimmedGrade.toLowerCase()
  )
  if (conflict) {
    alert('Tên khối đã tồn tại!')
    return false
  }

  selectedGrade.value = trimmedGrade
  gradeList.value.push(trimmedGrade)
  localStorage.setItem(GRADE_KEY, JSON.stringify(gradeList.value))
  return true
}

// Check class name conflict
function checkClassConflict(trimmedName) {
  const stored = localStorage.getItem('ezstudy-classes')
  let classes = []
  try {
    classes = stored ? JSON.parse(stored) : []
  } catch {
    classes = []
  }

  const conflict = classes.some(
    c => c.name.toLowerCase() === trimmedName.toLowerCase()
  )

  if (conflict) {
    alert('Tên lớp đã tồn tại!')
    return true
  }

  return false
}

// Handle dropdown 
function onGradeChange() {
  if (selectedGrade.value === 'new-grade') {
    isCustomGrade.value = true
  } else {
    isCustomGrade.value = false
  }
}
</script>

<template>
  <!-- Add Class Form Interface include name input, date input Class selector and New Grade -->
  <div class="form-container">
    <h2>Thêm Lớp Mới</h2>

    <div class="form-row">
      <label>Tên lớp:</label>
      <input v-model="className" type="text" placeholder="Nhập tên lớp" />
    </div>

    <div class="form-row">
      <label>Thuộc:</label>
      <select v-model="selectedGrade" @change="isCustomGrade = (selectedGrade === 'new-grade')">
        <option v-for="grade in gradeList" :key="grade" :value="grade">
          {{ grade }}
        </option>
        <option value="unassigned">-- Chưa phân khối --</option>
        <option value="new-grade">-- Thêm khối mới --</option>
      </select>
    </div>

    <div v-if="isCustomGrade" class="form-row">
      <label>Khối mới:</label>
      <input v-model="customGrade" type="text" placeholder="Nhập tên khối" />
    </div>

    <div class="buttons">
      <button @click="save">Lưu</button>
      <button @click="router.push('/classes')">Hủy</button>
    </div>
  </div>
</template>

<style scoped>
/* Style for both dark and light mode */
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

.form-row input,
.form-row select {
  flex: 1;
  padding: 8px;
  border: 1px solid var(--input-border);
  border-radius: 6px;
  background-color: var(--form-bg);
  color: var(--label-color);
}

.new-grade-input {
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}

.new-grade-input label {
  width: auto;
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