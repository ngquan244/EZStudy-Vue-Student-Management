<script setup>
// Imports
import { ref } from 'vue'

// Import child Components
import AddClassForm from './AddClassForm.vue'
import useAddClass from './useAddClass.js'

// Events to parent
const emit = defineEmits(['close', 'add-class'])

// Reactive refs
const className = ref('')
const selectedGrade = ref('Lớp 11')

// Handle Save function
function handleSave() {
  const newClass = useAddClass(className.value, selectedGrade.value)
  if (newClass) {
    emit('add-class', newClass)
    emit('close')
  }
}
</script>

<template>
  <AddClassForm
    :class-name="className"
    :selected-grade="selectedGrade"
    @update:className="val => className = val"
    @update:selectedGrade="val => selectedGrade = val"
    @save="handleSave"
    @close="emit('close')"
  />
</template>
