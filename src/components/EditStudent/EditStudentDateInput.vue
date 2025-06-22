<script setup>
// Props from parent and Events to parent
defineProps({
  label: String,
  modelValue: String,
  max: String
})
const emit = defineEmits(['update:modelValue'])

// Import Css Modules
import styles from './EditStudentForm.module.css'
</script>

<template>
  <!-- Date Input  -->
  <div :class= "styles.formRow" >
    <label>{{ label }}</label>
    <input
      type="date"
      :value="modelValue"
      :max="max"
      @input="e => emit('update:modelValue', e.target.value)"
    />
  </div>
</template>
