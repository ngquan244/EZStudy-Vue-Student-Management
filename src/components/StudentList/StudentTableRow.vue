<script setup>
// Import CSS Modules
import styles from './StudentTable.module.css'

// Props from parent and Events to parent
const props = defineProps({
  student: Object,
  index: Number,
  currentPage: Number
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <!-- Table Row interface -->
  <tr>
    <td :class="styles.td">{{ (currentPage - 1) * 5 + index + 1 }}</td>
    <td :class="styles.td">{{ student.name }}</td>
    <td :class="styles.td">{{ student.age }}</td>
    <td :class="styles.td">{{ student.class }}</td>
    <td :class="styles.td">
      <button @click="$emit('edit', student)">Sửa</button>
      <button @click="$emit('delete', student.id)">Xóa</button>
    </td>
  </tr>
</template>
