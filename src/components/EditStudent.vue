<script setup>
import { ref, watch } from 'vue'

// Props from parent
const props = defineProps({
  student: Object
})

// Events to parent
const emit = defineEmits(['close', 'edit-student'])

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

// Watcher
// Watch for changes in props and set the new value
watch(() => props.student, (newVal) => {
  if (newVal) {
    name.value = newVal.name
    selectedClass.value = newVal.class
    birthDate.value = newVal.birthDate || '' 
  }
}, { immediate: true })

// The same as saveStudent in AddStudent but edit the existing student instead
// Required full filled data
// Make sure Birth Date < Today
function saveEdits() {
  if (!name.value || !birthDate.value || !selectedClass.value) {
    alert('Vui lòng điền đầy đủ thông tin!')
    return
  }

  if (birthDate.value > today) {
    alert('Ngày sinh không thể lớn hơn hôm nay. Vui lòng nhập lại.')
    birthDate.value = ''
    return
  }

  const age = calculateAge(birthDate.value)

  emit('edit-student', {
    ...props.student,
    name: name.value,
    age: age.toString(),
    birthDate: birthDate.value,
    class: selectedClass.value
  })
  emit('close')
}
</script>

<template>
  <!-- A copy of AddStudent Form interface -->
  <div class="form-container">
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
        <option value="11A">Lớp 11A</option>
        <option value="11B">Lớp 11B</option>
        <option value="12A">Lớp 12A</option>
        <option value="12B">Lớp 12B</option>
      </select>
    </div>

    <div class="buttons">
      <button @click="saveEdits">Lưu</button>
      <button @click="$emit('close')">Hủy</button>
    </div>
  </div>
</template>

<style scoped>
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