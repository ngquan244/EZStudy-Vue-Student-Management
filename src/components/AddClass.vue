<script setup>
// Imports
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive refs
const className = ref('')
const selectedGrade = ref('Lớp 11')

// Save function, make sure that trimmed name != '' and < 20 digits
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

  const newClass = {
    name: trimmed,
    grade: selectedGrade.value
  }

  const stored = localStorage.getItem('ezstudy-classes')
  let classes = []

  try {
    classes = stored ? JSON.parse(stored) : []
  } catch {
    classes = []
  }

  const forbiddenNames = ['11', '12']
  if (forbiddenNames.includes(newClass.name)) {
    alert('Tên lớp không nên đặt là "11" hoặc "12".')
    return
  }

  if (classes.some(c => c.name === newClass.name)) {
    alert('Lớp đã tồn tại!')
    return
  }

  classes.push(newClass)
  localStorage.setItem('ezstudy-classes', JSON.stringify(classes))

  router.push('/classes')
}

function cancel() {
  router.push('/classes')
}
</script>

<template>
  <!-- Add Class Form Interface include name input, date input and Class selector -->
  <div class="form-container">
    <h2>Thêm Lớp Mới</h2>

    <div class="form-row">
      <label>Tên lớp:</label>
      <input v-model="className" type="text" placeholder="Nhập tên lớp" />
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
      <button @click="cancel">Hủy</button>
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