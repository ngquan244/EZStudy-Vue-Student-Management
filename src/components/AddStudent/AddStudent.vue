<script setup>
// Imports
import { ref } from 'vue'

// Import child components
import useAddStudent from './UseAddStudent'
import AddStudentForm from './AddStudentForm.vue'

// Props from parent
const props = defineProps({
  classList: Array
})

// Events to parent
const emit = defineEmits(['close', 'add-student'])

// New student attributes
const {
  name,
  birthDate,
  selectedClass,
  today,
  saveStudent
} = useAddStudent(emit)
</script>

<template>
  <AddStudentForm
    :name="name"
    :birthDate="birthDate"
    :selectedClass="selectedClass"
    :classList="classList"
    :today="today"
    @update:name="name = $event"
    @update:birthDate="birthDate = $event"
    @update:selectedClass="selectedClass = $event"
    @save="saveStudent"
    @close="$emit('close')"
  />
</template>
