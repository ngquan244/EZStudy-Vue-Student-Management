<script setup>
// Imports
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Storage key and refs
const STORAGE_KEY = 'ezstudy-classes'
const GRADE_KEY = 'ezstudy-grades'

const className = ref('')
const selectedGrade = ref('Lớp 11')
const gradeList = ref([])
const isCustomGrade = ref(false)
const customGrade = ref('')

const route = useRoute()
const router = useRouter()

// LifeCycle Hook load class info and grade list
onMounted(() => {
  const nameToEdit = route.params.name
  const stored = localStorage.getItem(STORAGE_KEY)
  try {
    const classes = stored ? JSON.parse(stored) : []
    const found = classes.find(c => c.name === nameToEdit)
    if (found) {
      className.value = found.name

      const storedGrades = localStorage.getItem(GRADE_KEY)
      try {
        gradeList.value = storedGrades ? JSON.parse(storedGrades) : ['Lớp 11', 'Lớp 12']
      } catch {
        gradeList.value = ['Lớp 11', 'Lớp 12']
      }

      if (!gradeList.value.includes(found.grade)) {
        gradeList.value.push(found.grade)
      }

      selectedGrade.value = found.grade
    } else {
      alert('Không tìm thấy lớp cần sửa')
      router.push('/classes')
    }
  } catch {
    alert('Dữ liệu lớp bị lỗi')
    router.push('/classes')
  }
})

// Save function + add
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
  if (handleConflict(trimmed)) return

  const stored = localStorage.getItem(STORAGE_KEY)
  const classes = stored ? JSON.parse(stored) : []

  const index = classes.findIndex(c => c.name === route.params.name)
  if (index !== -1) {
    const oldName = route.params.name
    const newName = trimmed

    classes[index] = {
      name: newName,
      grade: selectedGrade.value
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(classes))

    updateStudentClass(oldName, newName)

    router.push('/classes')
  } else {
    alert('Không tìm thấy lớp để cập nhật.')
  }
}

// Handle new grade
function handleCustomGrade() {
  if (!isCustomGrade.value) return true

  const custom = customGrade.value.trim()
  if (!custom) {
    alert('Vui lòng nhập tên khối mới!')
    return false
  }

  selectedGrade.value = custom

  const storedGrades = localStorage.getItem(GRADE_KEY)
  let grades = []
  try {
    grades = storedGrades ? JSON.parse(storedGrades) : []
  } catch {
    grades = []
  }

  if (!grades.includes(custom)) {
    grades.push(custom)
    localStorage.setItem(GRADE_KEY, JSON.stringify(grades))
  }

  return true
}

// Handle name conflict
function handleConflict(trimmed) {
  const stored = localStorage.getItem(STORAGE_KEY)
  const classes = stored ? JSON.parse(stored) : []

  const conflict = classes.some(
    c => c.name.toLowerCase() !== route.params.name.toLowerCase() &&
         c.name.toLowerCase() === trimmed.toLowerCase()
  )

  if (conflict) {
    alert('Tên lớp đã tồn tại!')
    return true
  }

  return false
}


// Update student class and grade after edit
function updateStudentClass(oldName, newName) {
  if (oldName === newName) return

  const storedStudents = localStorage.getItem('ezstudy-students')
  const students = storedStudents ? JSON.parse(storedStudents) : []

  students.forEach(s => {
    if (s.class === oldName) {
      s.class = newName
      s.grade = selectedGrade.value
    }
  })

  localStorage.setItem('ezstudy-students', JSON.stringify(students))
}

function onGradeChange() {
  isCustomGrade.value = selectedGrade.value === 'new-grade'
}


</script>


<template>
  <!-- Edit Class Form Interface include Input Class Name and Grade Selectors -->
  <div class="form-container">
    <h2>Sửa Lớp</h2>

    <div class="form-row">
      <label>Tên lớp:</label>
      <input v-model="className" type="text" />
    </div>

    <div class="form-row">
      <label>Thuộc:</label>
      <select v-model="selectedGrade" @change="onGradeChange">
        <option v-for="grade in gradeList" :key="grade" :value="grade">{{ grade }}</option>
        <option value="unassigned">-- Chưa phân khối --</option>
        <option value="new-grade">-- Thêm khối mới --</option>
      </select>

    </div>

    <div v-if="isCustomGrade" class="form-row new-grade">
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

.form-row input,
.form-row select {
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