<script setup>
// Props from parent and Events to parent
defineProps({
  selectedClass: String,
  classList: Array
})
const emit = defineEmits(['update:selectedClass'])

// Import Css Modules
import styles from './EditStudentForm.module.css'
</script>

<template>
  <!-- class selection static dropdown -->
  <div :class="styles.formRow">
    <label>Chọn lớp:</label>
    <select
      :value="selectedClass"
      @change="e => emit('update:selectedClass', e.target.value)"
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
