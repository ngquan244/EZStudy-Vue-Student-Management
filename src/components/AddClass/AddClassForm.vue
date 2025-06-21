<script setup>
defineProps(['className', 'selectedGrade'])
const emit = defineEmits(['update:className', 'update:selectedGrade', 'save', 'close'])

// Import CSS Modules
import styles from './AddClassForm.module.css'
</script>

<template>
  <div :class="styles.formContainer">
    <h2>Thêm Lớp Mới</h2>
    <!-- Add Class Form interface -->
    <div :class="styles.formRow">
      <label>Tên lớp:</label>
      <input
        :value="className"
        @input="$emit('update:className', $event.target.value)"
        type="text"
        placeholder="Nhập tên lớp"
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
