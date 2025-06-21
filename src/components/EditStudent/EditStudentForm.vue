<script setup>
// Import CSS modules and child components
import styles from './EditStudentForm.module.css'
import TextInput from './EditStudentTextInput.vue'
import DateInput from './EditStudentDateInput.vue'
import ClassSelect from './EditStudentClassSelect.vue'

// Props from parent and events to parents
defineProps([
  'name',
  'birthDate',
  'selectedClass',
  'classList',
  'today'
])

const emit = defineEmits([
  'update:name',
  'update:birthDate',
  'update:selectedClass',
  'save',
  'close'
])
</script>

<template>
  <!-- Edit Student Form interface include name input, birthdate input and class selection -->
  <div :class="styles['form-container']">
    <h2>Sửa Thông Tin Học Sinh</h2>

    <TextInput
      label="Họ và tên:"
      :model-value="name"
      @update:model-value="val => emit('update:name', val)"
      :class="styles['form-row']"
    />

    <DateInput
      label="Ngày sinh:"
      :model-value="birthDate"
      :max="today"
      @update:model-value="val => emit('update:birthDate', val)"
      :class="styles['form-row']"
    />

    <ClassSelect
      :selected-class="selectedClass"
      :class-list="classList"
      @update:selected-class="val => emit('update:selectedClass', val)"
      :class="styles['form-row']"
    />

    <div :class="styles['buttons']">
      <button @click="$emit('save')">Lưu</button>
      <button @click="$emit('close')">Hủy</button>
    </div>
  </div>
</template>

// Không thể viết dưới 50 dòng do cần liệt kê đủ thành phần trong edit student