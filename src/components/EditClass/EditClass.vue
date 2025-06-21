<script setup>
// Imports
import { ref } from 'vue'

// Import Child Components
import useEditClass from './UseEditClass'
import EditClassForm from './EditClassForm.vue'

// Props from parents and events to parent
const props = defineProps({ classItem: Object })
const emit = defineEmits(['close', 'update-class'])

// Destructure state and methods from useEditClass
const {
  className,
  selectedGrade,
  today,
  initialize,
  save
} = useEditClass(props, emit)

initialize()
</script>

<template>
  <!-- Edit Class Form -->
  <EditClassForm
    :className="className"
    :selectedGrade="selectedGrade"
    :today="today"
    @update:className="className = $event"
    @update:selectedGrade="selectedGrade = $event"
    @save="save"
    @close="$emit('close')"
  />
</template>
