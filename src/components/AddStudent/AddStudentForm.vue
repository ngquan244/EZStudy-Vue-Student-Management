<script setup>
// Import child components and CSS modules
import styles from './AddStudentForm.module.css'
import StudentTextInput from './StudentTextInput.vue'
import StudentDateInput from './StudentDateInput.vue'
import StudentClassSelect from './StudentClassSelect.vue'

// Props from parent
defineProps([
  'name',
  'birthDate',
  'selectedClass',
  'classList',
  'today'
])
</script>

<template>
  <!-- Add Student Form interface include Name input, Birthdate input and class selection -->
  <div :class="styles.formContainer">
    <h2>Thêm Học Sinh</h2>
    <p>(Tạo lớp mới nếu chưa có lớp)</p>

    <StudentTextInput
      :model-value="name"
      @update:model-value="$emit('update:name', $event)"
    />

    <StudentDateInput
      :model-value="birthDate"
      :max="today"
      @update:model-value="$emit('update:birthDate', $event)"
    />

    <StudentClassSelect
      :model-value="selectedClass"
      :class-list="classList"
      @update:model-value="$emit('update:selectedClass', $event)"
    />

    <div :class="styles['buttons']">
      <button @click="$emit('save')">Lưu</button>
      <button @click="$emit('close')">Hủy</button>
    </div>
  </div>
</template>
