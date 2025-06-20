<script setup>
import { ref, watch } from 'vue'

// Props from parent
const props = defineProps({
  classItem: Object
})

// Events to parent
const emit = defineEmits(['close', 'update-class'])

// Reactive forms
const className = ref('')
const selectedGrade = ref('Lớp 11')

// Watcher
// Watch for changes in classItem prop
watch(() => props.classItem, (val) => {
  if (val) {
    className.value = val.name
    selectedGrade.value = val.grade
  }
}, { immediate: true })

// Save the edited class function
// Validate that name is not empty before emit
function save() {
  const trimmed = className.value.trim()
  if (!trimmed) {
    alert('Vui lòng nhập tên lớp!')
    return
  }

  emit('update-class', {
    ...props.classItem,
    name: trimmed,
    grade: selectedGrade.value
  })

  emit('close')
}
</script>

<template>
  <!-- Form with input row for class name and select box for grades -->
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
      <button @click="$emit('close')">Hủy</button>
    </div>
  </div>
</template>

<style scoped>
/* Unique styles different from common style in src/style.css */
.form-container {
  max-width: 400px;
  width: 350px;
  margin: 0 auto;
  padding: 20px;
  background: #f2f2f2;
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
}
.form-row input,
.form-row select {
  flex: 1;
  padding: 8px;
  border: 1px solid #000;
  border-radius: 6px;
}
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

button:first-of-type {
  background-color: #04AA6D;
  color: white;
}
</style>
