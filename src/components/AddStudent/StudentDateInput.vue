<script setup>
// Props from parent and Events to parent
defineProps({
  modelValue: String,
  max: String
})
defineEmits(['update:modelValue'])
import styles from './AddStudentForm.module.css'
</script>

<template>
  <!-- Birthdate input -->
  <div :class="styles.formRow">
    <label>Ngày sinh:</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="date"
      :max="max"
    />
  </div>
</template>
