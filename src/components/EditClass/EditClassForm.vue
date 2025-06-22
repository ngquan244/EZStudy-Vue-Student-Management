<script setup>
// Props from parent and Events to parent
defineProps(['className', 'selectedGrade', 'today'])
const emit = defineEmits(['update:className', 'update:selectedGrade', 'save', 'close'])

// Import CSS modules
import styles from './EditClassForm.module.css'
</script>

<template>
  <!-- Edit class form interface, a copy of add class form but edit existing class instead -->
  <div :class="styles.formContainer">
    <h2>Sửa Lớp</h2>

    <div :class="styles.formRow">
      <label>Tên lớp:</label>
      <input
        :value="className"
        @input="$emit('update:className', $event.target.value)"
        type="text"
      />
    </div>

    <div :class="styles.formRow">
      <label>Thuộc:</label>
      <select
        :value="selectedGrade"
        @change="$emit('update:selectedGrade', $event.target.value)"
      >
        <option value="Lớp 11">Lớp 11</option>
        <option value="Lớp 12">Lớp 12</option>
      </select>
    </div>

    <div :class="styles.buttons">
      <button @click="$emit('save')">Lưu</button>
      <button @click="$emit('close')">Hủy</button>
    </div>
  </div>
</template>

