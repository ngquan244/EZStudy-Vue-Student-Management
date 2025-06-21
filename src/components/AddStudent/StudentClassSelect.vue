
<script setup>
// Props from parent and events to parent
defineProps({
  modelValue: String,
  classList: Array
})
defineEmits(['update:modelValue'])
import styles from './AddStudentForm.module.css'
</script>

<template>
  <!-- Class Selection drop down -->
  <div :class="styles['form-row']">
    <label>Chọn lớp:</label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option
        v-for="cls in classList"
        :key="cls.name"
        :value="cls.name"
      >
        {{ cls.name }}
      </option>
    </select>
  </div>
</template>
