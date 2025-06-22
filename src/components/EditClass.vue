<script setup>
// Imports
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Storage key and refs
const STORAGE_KEY = 'ezstudy-classes'
const className = ref('')
const selectedGrade = ref('Lớp 11')

const route = useRoute()
const router = useRouter()

// LifeCycle Hook, load data from storage and auto fill
onMounted(() => {
  const nameToEdit = route.params.name
  const stored = localStorage.getItem(STORAGE_KEY)
  try {
    const classes = stored ? JSON.parse(stored) : []
    const found = classes.find(c => c.name === nameToEdit)
    if (found) {
      className.value = found.name
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

// Save function after edit class make sure that trimmed class name <= 20 digits
function save() {
  const trimmed = className.value.trim()
  if (!trimmed) {
    alert('Vui lòng nhập tên lớp!')
    return
  }

  if (trimmed.length > 20) {
    alert('Tên lớp không được vượt quá 20 ký tự!')
    return null
  }

  const stored = localStorage.getItem(STORAGE_KEY)
  const classes = stored ? JSON.parse(stored) : []

  const index = classes.findIndex(c => c.name === route.params.name)
  if (index !== -1) {
    classes[index] = {
      name: trimmed,
      grade: selectedGrade.value
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(classes))
    router.push('/classes')
  } else {
    alert('Không tìm thấy lớp để cập nhật.')
  }
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
      <select v-model="selectedGrade">
        <option value="Lớp 11">Lớp 11</option>
        <option value="Lớp 12">Lớp 12</option>
      </select>
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