<script setup>
import { ref } from 'vue'

// Props from parent
const props = defineProps({
  classList: Array
})

// Events to parent
const emit = defineEmits(['close', 'add-student'])

// Reactive form - input and select box
const name = ref('')
const birthDate = ref('')
const selectedClass = ref('11A')

// Current date to compute age by birth date by the calculateAge below
const today = new Date().toISOString().split('T')[0]

function calculateAge(birthDateStr) {
  const birthYear = new Date(birthDateStr).getFullYear()
  const currentYear = new Date().getFullYear()
  return currentYear - birthYear
}

// Save Student from add-student form
// Required full filled data
// Make sure Birth Date < Today
function saveStudent() {
  const trimmedName = name.value.trim()
  if (!trimmedName || !birthDate.value || !selectedClass.value) {
    alert('Vui lòng điền đầy đủ thông tin!')
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
    name: name.value,
    age: age.toString(),
    birthDate: birthDate.value,
    class: selectedClass.value
  }

  emit('add-student', newStudent)
  emit('close')
}
</script>

<template>
  <!-- Add-Student Form with Name input, Birthdate Input and Class Selection -->
  <div class="form-container">
    <h2>Thêm Học Sinh</h2>
    <p>(Tạo lớp mới và REFRESH nếu chưa có lớp)</p>
    <div class="form-row">
      <label>Họ và tên:</label>
      <input v-model="name" type="text" placeholder="Nhập họ tên" />
    </div>

    <div class="form-row">
      <label>Ngày sinh:</label>
      <input v-model="birthDate" type="date" :max="today" />
    </div>

     <!-- new static dropdown instead of hardcore -->
    <div class="form-row">
      <label>Chọn lớp:</label>
      <select v-model="selectedClass">
        <option
          v-for="cls in classList"
          :key="cls.name"
          :value="cls.name"
        >{{ cls.name }}</option>
        </select>
    </div>

    <div class="buttons">
      <button @click="saveStudent">Lưu</button>
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
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-row label {
  width: 90px;
  font-weight: bold;
}

.form-row input,
.form-row select {
  flex: 1;
  padding: 8px;
  border: 1px solid #000;
  border-radius: 6px;
  box-sizing: border-box;
}

.buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 12px;
}

button:first-of-type {
  background-color: #04AA6D;
  color: white;
}
</style>
