<script setup>
// Props from parent and Events to parent
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
import styles from './AddStudentForm.module.css'
</script>

<template>
  <!-- Name input text box -->
  <div :class="styles['form-row']">
    <label>Họ và tên:</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      placeholder="Nhập họ tên"
    />
  </div>
</template>
