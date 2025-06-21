<script setup>
// Imports
import { ref, watch } from 'vue'
// Import child components
import useEditStudent from './UseEditStudent'
import EditStudentForm from './EditStudentForm.vue'

// Props from parent and events to parent
const props = defineProps({
  student: Object,
  classList: Array
})

const emit = defineEmits(['close', 'edit-student'])

// Destructure states and methods from EditStudent hook
const {
  name,
  birthDate,
  selectedClass,
  today,
  saveEdits
} = useEditStudent(props, emit)
</script>

<template>
  <!-- Edit student form -->
  <EditStudentForm
    :name="name"
    :birthDate="birthDate"
    :selectedClass="selectedClass"
    :classList="props.classList"
    :today="today"
    @update:name="name = $event"
    @update:birthDate="birthDate = $event"
    @update:selectedClass="selectedClass = $event"
    @save="saveEdits"
    @close="$emit('close')"
  />
</template>
